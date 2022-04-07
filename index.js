/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from '@/App';
import { name as appName } from './app.json';
import 'intl';
import 'intl/locale-data/jsonp/en';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('FCM background message handled', JSON.stringify(remoteMessage, null, 2));
  }
});

AppRegistry.registerComponent(appName, () => App);
