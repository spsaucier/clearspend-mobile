import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useDeviceContext } from 'twrnc';
import { store, persistor } from '@/Store';
import { ApplicationNavigator } from '@/Navigators';
import { mixpanel } from '@/Services/utils/analytics';
import './Translations';

import tw from '@/Styles/tailwind';

const App = () => {
  useEffect(() => {
    mixpanel.init();
  }, []);

  useDeviceContext(tw);
  return (
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI
       * until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to
       * show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
