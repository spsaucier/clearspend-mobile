import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import { MainScreens, TopScreens } from '@/Navigators/NavigatorTypes';
import { Constants } from '@/consts';
import { storage } from '@/Services/Storage/mmkv';
import { tooLongSinceLastActive } from '@/Hooks/useRequireAuth';

const openOrSaveDeeplink = (url: string | null | undefined) => {
  if (!url) {
    // no link found - open home page
    return null;
  }

  // don't process the link if we aren't authed
  const willPromptAuth = tooLongSinceLastActive();

  if (willPromptAuth) {
    // save the link to be fired after auth confirmation success - ConfirmAuthScreen
    storage.set(Constants.INITIAL_DEEPLINK_URL, url);
    return null;
  }

  return url;
};

const getInitialUrl = async () => {
  // Check if the app was opened via a native deeplink
  const nativeDeeplinkUrl = await Linking.getInitialURL();

  // Check if the app was opened via a firebase message
  const initialFirebaseMessage = await messaging().getInitialNotification();
  // Get deep link from firebase data
  const firebaseDeeplinkUrl = initialFirebaseMessage?.data?.link;

  // firebase takes precedence over native link
  const linkToProcess = firebaseDeeplinkUrl ?? nativeDeeplinkUrl;

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('Initial Deeplink: ', linkToProcess);
  }

  return openOrSaveDeeplink(linkToProcess);
};

const subscribeToDeepLinks = (listener: (url: string) => void) => {
  const onReceiveURL = ({ url }: { url: string }) => listener(url);

  // Listen to incoming links from native deep linking
  const nativeLinkingListener = Linking.addListener('url', onReceiveURL);

  // Listen for when the app is returned from the background by a firebase message and open the link
  const unsubscribeFirebaseBackground = messaging().onNotificationOpenedApp((message) => {
    const url = message?.data?.link;

    const link = openOrSaveDeeplink(url);
    if (link) {
      listener(link);
    }
  });

  // Listen to firebase messages while the app is open and display a toast
  const unsubscribeFirebaseForeground = messaging().onMessage((message) => {
    const url = message?.data?.link;

    if (url) {
      const permissionAllNotifications = storage.getBoolean(Constants.PERMISSION_ALL_NOTIFICATIONS);
      // Any custom logic to check whether the URL needs to be handled
      if (permissionAllNotifications) {
        Toast.show({
          text1: message.notification?.body,
          props: {
            // Call the listener to let React Navigation handle the URL
            onPress: () => {
              listener(url);
              Toast.hide();
            },
          },
        });
      }
    }
  });

  return () => {
    // Clean up the event listeners
    nativeLinkingListener.remove();
    unsubscribeFirebaseBackground();
    unsubscribeFirebaseForeground();
  };
};

export const linkingConfig: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [
    'clearspend://',
    //  'https://clearspend.com' // TODO: support web links
  ],

  // Custom function to get the URL which was used to open the app
  getInitialURL: getInitialUrl,
  // Custom function to subscribe to incoming links
  subscribe: subscribeToDeepLinks,

  // Deep link configuration
  config: {
    screens: {
      [TopScreens.Main]: {
        screens: {
          [MainScreens.Home]: {
            initialRouteName: MainScreens.Wallet,
            screens: {
              [MainScreens.TransactionDetails]: {
                path: 'transaction/:transactionId',
                exact: true,
              },
            },
          },
        },
      },
      // NotFound: '*', // TODO implement not found screen
    },
  },
};
