import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { linkingConfig } from '@/Services/Linking/deepLinkNavigationConfig';
import { GlobalToast } from '@/Components/GlobalToast';
import tw from '@/Styles/tailwind';
import { FocusAwareStatusBar } from '@/Components';

import AuthNavigator from '@/Navigators/AuthNavigator';
import MainNavigator from '@/Navigators/MainNavigator';
import { useAuthentication } from '@/Hooks/useAuthentication';
import InitStartup from '@/Store/Startup/Init';
import { FeatureFlagsProvider } from '@/Services/FeatureFlags/FeatureFlagsProvider';

const Stack = createNativeStackNavigator<TopParams>();

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
        <Stack.Screen name={TopScreens.Auth} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

const ApplicationNavigator = () => {
  const routeNameRef = useRef('');
  const navigationRef = useNavigationContainerRef();

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
      <FeatureFlagsProvider>
        <SafeAreaProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name || '';
            }}
            onStateChange={onStateChange}
            linking={linkingConfig}
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
      </FeatureFlagsProvider>
    </QueryClientProvider>
  );
};

export default ApplicationNavigator;
