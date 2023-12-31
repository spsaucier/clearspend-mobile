import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import startup from './Startup';
import theme from './Theme';
import session from './Session';

const reducers = combineReducers({
  startup,
  theme,
  session,
});

const storage = createSensitiveStorage({
  keychainService: 'ClearSpendKeychain',
  sharedPreferencesName: 'ClearSpendSharedPrefs',
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'session'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    // eslint-disable-next-line no-undef
    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      // eslint-disable-next-line global-require
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

export { store, persistor };
