import React, { useEffect, useState, FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from '@/Navigators/Root';
import { StartupState } from '@/Store/Startup';
import StartupScreen from '@/Containers/Startup/StartupScreen';

const Stack = createStackNavigator();

let MainNavigator: FunctionComponent | null;

// @refresh reset
const ApplicationNavigator = () => {
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false);
  const applicationIsLoading = useSelector(
    (state: { startup: StartupState }) => state.startup.loading,
  );

  useEffect(() => {
    if (MainNavigator == null && !applicationIsLoading) {
      // eslint-disable-next-line global-require
      MainNavigator = require('@/Navigators/MainNavigator').default;
      setIsApplicationLoaded(true);
    }
  }, [applicationIsLoading]);

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false);
      MainNavigator = null;
    },
    [],
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupScreen} />

          {/* TODO Add Auth Stack check */}

          {isApplicationLoaded && MainNavigator != null && (
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
