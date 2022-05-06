import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Config from 'react-native-config';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useDeviceContext } from 'twrnc';
import { setLogger } from 'react-query';
import { AxiosError } from 'axios';
import FullStory from '@fullstory/react-native';
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
    FullStory.onReady().then((result) => {
      const { replayStartUrl, replayNowUrl, sessionId } = result;
      // eslint-disable-next-line no-console
      console.log({ replayStartUrl, replayNowUrl, sessionId });
    });
    setLogger({
      log: (message) => {
        mixpanel.track('API Log', { message });
        FullStory.log(FullStory.LogLevel.Info, message);
      },
      warn: (message) => {
        mixpanel.track('API Warn', { message });
        FullStory.log(FullStory.LogLevel.Warn, message);
      },
      error: (error: AxiosError) => {
        mixpanel.track('API Error', {
          url: error?.config?.url,
          status: error?.response?.status,
          errorMessage: error?.message,
        });
        FullStory.log(
          FullStory.LogLevel.Error,
          `${error?.message} | ${error?.response?.status} | ${error?.config?.url}`,
        );
      },
    });
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
        <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY}>
          <ApplicationNavigator />
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
