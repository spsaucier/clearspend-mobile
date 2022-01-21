import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import AuthNavigator from '@/Navigators/AuthNavigator';
import MainNavigator from '@/Navigators/MainNavigator';
import { navigateAndSimpleReset, navigationRef } from '@/Navigators/Root';
import { StartupState } from '@/Store/Startup';
import StartupScreen from '@/Containers/Startup/StartupScreen';
import { Session } from '@/Store/Session';
import { mixpanel } from '@/Services/utils/analytics';
import { TopParams, TopScreens } from './NavigatorTypes';
import AuthProvider from '@/Services/Auth/AuthProvider';

const Stack = createStackNavigator<TopParams>();

const queryClient = new QueryClient();

const ApplicationNavigator = () => {
  const routeNameRef = useRef('');
  const applicationIsLoading = useSelector(
    (state: { startup: StartupState }) => state.startup.loading,
  );

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
      if (session.accessToken) {
        navigateAndSimpleReset('Main');
      } else navigateAndSimpleReset('Auth');
    }
  }, [applicationIsLoading, session]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name || '';
          }}
          onStateChange={onStateChange}
        >
          <AuthProvider>
            <StatusBar barStyle="dark-content" />
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
                component={MainNavigator}
                options={{
                  animationEnabled: false,
                }}
              />
            </Stack.Navigator>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default ApplicationNavigator;
