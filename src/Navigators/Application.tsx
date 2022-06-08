import React, { useCallback, useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import FullStory from '@fullstory/react-native';
import { Session } from '@/Store/Session';
import { mixpanel } from '@/Services/utils/analytics';
import { TopParams, TopScreens } from './NavigatorTypes';
import AuthProvider from '@/Services/Auth/AuthProvider';
import { ToastDisplay } from '@/Components/ToastDisplay';
import tw from '@/Styles/tailwind';
import { FocusAwareStatusBar } from '@/Components';

import AuthNavigator from '@/Navigators/AuthNavigator';
import MainNavigator from '@/Navigators/MainNavigator';
import { useAuthentication } from '@/Hooks/useAuthentication';
import InitStartup from '@/Store/Startup/Init';
import { FeatureFlagsProvider } from '@/Services/FeatureFlags/FeatureFlagsProvider';

import { Constants } from '@/consts';
import { storage } from '@/Services/Storage/mmkv';
import { tooLongSinceLastActive } from '@/Hooks/useRequireAuth';
import { linkingConfig } from '@/Services/Linking/deepLinkNavigationConfig';

const Stack = createNativeStackNavigator<TopParams>();

const queryClient = new QueryClient();

const ApplicationNavigator = () => (
  <QueryClientProvider client={queryClient}>
    <FeatureFlagsProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <NavContainer />
        </AuthProvider>
        <ToastDisplay />
      </SafeAreaProvider>
    </FeatureFlagsProvider>
  </QueryClientProvider>
);

const NavContainer = () => {
  const routeNameRef = useRef('');
  const navigationRef = useNavigationContainerRef();
  const { authed } = useAuthentication();

  const openOrSaveDeeplink = useCallback(
    (url: string | null | undefined) => {
      if (!url) {
        // no link found - open home page
        return null;
      }

      // don't process the link if we aren't authed
      const willPromptAuth = tooLongSinceLastActive();
      if (!authed || willPromptAuth) {
        // save the link to be fired after auth confirmation success - ConfirmAuthScreen
        storage.set(Constants.INITIAL_DEEPLINK_URL, url);
        return null;
      }

      return url;
    },
    [authed],
  );

  const getInitialURL = useCallback(async () => {
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
  }, [openOrSaveDeeplink]);

  const subscribeToDeeplinks = useCallback(
    (listener: (url: string) => void) => {
      const open = (url?: string) => {
        const link = openOrSaveDeeplink(url);
        if (link) {
          listener(link);
        }
      };

      // Listen to incoming links from native deep linking
      const nativeLinkingListener = Linking.addListener('url', ({ url }: { url: string }) =>
        open(url),
      );

      // Listen for when the app is returned from the background by a firebase message and open the link
      const unsubscribeFirebaseBackground = messaging().onNotificationOpenedApp((message) => {
        const url = message?.data?.link;
        open(url);
      });

      // Listen to firebase messages while the app is open and display a toast
      const unsubscribeFirebaseForeground = messaging().onMessage((message) => {
        const url = message?.data?.link;
        const messageText = message.notification?.body;
        if (__DEV__) {
          console.log('FCM Foreground message', message);
        }

        if (messageText) {
          const permissionAllNotifications = storage.getBoolean(
            Constants.PERMISSION_ALL_NOTIFICATIONS,
          );
          // Any custom logic to check whether the URL needs to be handled
          if (permissionAllNotifications) {
            Toast.show({
              text1: messageText,
              props: {
                // Call the listener to let React Navigation handle the URL
                onPress: () => {
                  open(url);
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
    },
    [openOrSaveDeeplink],
  );

  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current || '';
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name || '';
    if (previousRouteName !== currentRouteName) {
      mixpanel.track('Navigation', { previousRouteName, currentRouteName });
      FullStory.event('Navigation', { previousRouteName, currentRouteName });
    }
    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName || '';
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name || '';
      }}
      onStateChange={onStateChange}
      linking={linkingConfig({ subscribe: subscribeToDeeplinks, getInitialURL })}
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: tw.color('bg-secondary')! },
      }}
    >
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <TopNavigator />
    </NavigationContainer>
  );
};

const TopNavigator = () => {
  const { loading } = useAuthentication();
  const dispatch = useDispatch();

  const accessToken = useSelector((state: { session: Session }) => state.session.accessToken);

  useEffect(() => {
    if (loading) return;

    dispatch(InitStartup.action());
  }, [loading, dispatch]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken ? (
        <Stack.Screen
          name={TopScreens.Main}
          component={MainNavigator}
          options={{ animationTypeForReplace: 'push' }}
        />
      ) : (
        <Stack.Screen name={TopScreens.Auth} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
