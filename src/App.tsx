import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useDeviceContext } from 'twrnc';
import { setLogger } from 'react-query';
import { store, persistor } from '@/Store';
import { ApplicationNavigator } from '@/Navigators';
import { mixpanel } from '@/Services/utils/analytics';
import './Translations';

import tw from '@/Styles/tailwind';
import { useAvailableBioMethod } from './Hooks/useAvailableBioMethod';

const App = () => {
  useAvailableBioMethod();
  useEffect(() => {
    mixpanel.init();
    setLogger({
      log: (message) => mixpanel.track('API Log', {message}),
      warn: (message) => mixpanel.track('API Warn', {message}),
      error: (error) => mixpanel.track('API Error', {error}),
    })
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
