import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import { GlobalToast } from '@/Components/GlobalToast';
import tw from '@/Styles/tailwind';
import { FocusAwareStatusBar } from '@/Components';

import AuthNavigator from '@/Navigators/AuthNavigator';
import { useNotificationSubscription } from '@/Hooks/useNotificationSubscription';
import MainNavigator from '@/Navigators/MainNavigator';
import { useAuthentication } from '@/Hooks/useAuthentication';
import InitStartup from '@/Store/Startup/Init';

const Stack = createStackNavigator<TopParams>();

const queryClient = new QueryClient();

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
        <Stack.Screen
          name={TopScreens.Auth}
          component={AuthNavigator}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

const ApplicationNavigator = () => {
  const routeNameRef = useRef('');
  const navigationRef = useNavigationContainerRef();
  useNotificationSubscription();

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
            <TopNavigator />
          </AuthProvider>
        </NavigationContainer>
        <GlobalToast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default ApplicationNavigator;
