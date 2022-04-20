import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
  DefaultTheme,
  NavigationContainer,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { useMMKVBoolean } from 'react-native-mmkv';
import { checkNotifications } from 'react-native-permissions';

import AuthNavigator from '@/Navigators/AuthNavigator';
import MainNavigator from '@/Navigators/MainNavigator';
import { navigateAndReset, navigationRef } from '@/Navigators/Root';
import { StartupState } from '@/Store/Startup';
import StartupScreen from '@/Containers/Startup/StartupScreen';
import { Session } from '@/Store/Session';
import { mixpanel } from '@/Services/utils/analytics';
import { MainScreens, TopParams, TopScreens } from './NavigatorTypes';
import AuthProvider from '@/Services/Auth/AuthProvider';
import { GlobalToast } from '@/Components/GlobalToast';
import tw from '@/Styles/tailwind';
import { FocusAwareStatusBar } from '@/Components';

import { Constants } from '@/consts';
import { useAuthentication } from '@/Hooks/useAuthentication';
import useRequire2FA from '@/Hooks/useRequire2FA';
import useRequireBioOrPasscodeSetup from '@/Hooks/useRequireBioOrPasscodeSetup';

const Stack = createStackNavigator<TopParams>();

const queryClient = new QueryClient();

const MainContainer = () => {
  const { loading, authed, passcodeEnabled, biometricsEnabled } = useAuthentication();
  const { loading: loading2FA, shouldAct: needs2FA } = useRequire2FA();
  const { loading: loadingBioPasscode, shouldAct: needsBioPasscode } =
    useRequireBioOrPasscodeSetup();

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (loading || loading2FA || loadingBioPasscode) return;

    if ((passcodeEnabled || biometricsEnabled) && !authed) {
      navigation.replace(MainScreens.ConfirmAuth);
    } else if (needs2FA || needsBioPasscode) {
      navigation.replace(MainScreens.SetBiometricsOrPasscode);
    }
    // passcodeEnabled and biometricsEnabled preferred to not trigger this hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loading2FA, loadingBioPasscode, authed, needs2FA, needsBioPasscode]);

  return <MainNavigator />;
};

const ApplicationNavigator = () => {
  const routeNameRef = useRef('');
  const applicationIsLoading = useSelector(
    (state: { startup: StartupState }) => state.startup.loading,
  );

  const [permissionAllNotifications] = useMMKVBoolean(Constants.PERMISSION_ALL_NOTIFICATIONS);
  const [notificationsBlockedByOS, setNotificationsBlockedByOS] = useState<boolean>(false);

  const session = useSelector((state: { session: Session }) => state.session);

  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current || '';
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name || '';
    if (previousRouteName !== currentRouteName) {
      mixpanel.track('Navigation', { previousRouteName, currentRouteName });
    }
    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName || '';
  };

  useEffect(() => {
    if (!applicationIsLoading && navigationRef.current) {
      if (!session.accessToken) {
        navigateAndReset('Auth');
      } else {
        const currentRoute = navigationRef.current.getCurrentRoute();
        if (currentRoute?.name === 'Startup') {
          navigateAndReset('Main');
        }
      }
    }
  }, [applicationIsLoading, session]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkNotifications().then(({ status }) => {
          setNotificationsBlockedByOS(status === 'blocked');
        });
      }
    });
    return () => subscription.remove();
  }, [setNotificationsBlockedByOS, notificationsBlockedByOS]);

  // Register foreground FCM listener
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Received foreground FCM message', JSON.stringify(remoteMessage, null, 2));
      }

      Toast.show({
        text1: remoteMessage.notification?.body,
      });
    });

    if (!permissionAllNotifications || notificationsBlockedByOS) {
      unsubscribe();
    }

    return unsubscribe;
  }, [permissionAllNotifications, notificationsBlockedByOS]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name || '';
          }}
          onStateChange={onStateChange}
          theme={{
            ...DefaultTheme,
            colors: { ...DefaultTheme.colors, background: tw.color('bg-secondary')! },
          }}
        >
          <AuthProvider>
            <FocusAwareStatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
            />

            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name={TopScreens.Startup} component={StartupScreen} />
              <Stack.Screen
                name={TopScreens.Auth}
                component={AuthNavigator}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name={TopScreens.Main}
                component={MainContainer}
                options={{
                  animationEnabled: false,
                }}
              />
            </Stack.Navigator>
          </AuthProvider>
        </NavigationContainer>
        <GlobalToast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default ApplicationNavigator;
