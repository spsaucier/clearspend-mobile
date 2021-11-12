import React, { useEffect, useState, FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import AuthNavigator from '@/Navigators/AuthNavigator';
import { navigationRef } from '@/Navigators/Root';
import { StartupState } from '@/Store/Startup';
import StartupScreen from '@/Containers/Startup/StartupScreen';

const Stack = createStackNavigator();

let MainNavigator: FunctionComponent | null;

// Apollo
const restLink = new RestLink({
  uri: 'http://localhost:8000',
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: restLink,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

// @refresh reset
const ApplicationNavigator = () => {
  // TODO Apollo cache stuff:
  // const [loadingCache, setLoadingCache] = useState(true);
  // useEffect(() => {
  //   persistCache({
  //     cache,
  //     storage: AsyncStorage,
  //   }).then(() => setLoadingCache(false))
  // }, [])
  //
  // if (loadingCache) {
  //   return <StartupScreen />
  // }

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

  const userIsLoggedIn = true;

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Startup" component={StartupScreen} />
            {isApplicationLoaded && userIsLoggedIn && MainNavigator != null ? (
              <Stack.Screen
                name="Main"
                component={MainNavigator}
                options={{
                  animationEnabled: false,
                }}
              />
            ) : (
              <Stack.Screen
                name="Main"
                component={AuthNavigator}
                options={{
                  animationEnabled: false,
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default ApplicationNavigator;
