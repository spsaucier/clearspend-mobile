import React, { useEffect, useState, FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, ApolloProvider, from, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RestLink } from 'apollo-link-rest';

import AuthNavigator from '@/Navigators/AuthNavigator';
import { navigationRef } from '@/Navigators/Root';
import { StartupState } from '@/Store/Startup';
import StartupScreen from '@/Containers/Startup/StartupScreen';

const Stack = createStackNavigator();

let MainNavigator: FunctionComponent | null;

// TODO: Simulate login to simulate set-cookie (token).
// Will be removed to the onboarding section
const simulateLogin = () => {
  fetch('https://api.capital.dev.tranwall.net/authentication/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'marianne.auer@yahoo.com',
      password: 'Da7c2"xb3u',
    }),
  });
};

simulateLogin();

// TODO: Simulate logout to remove reset set-cookie (tokens).
// Will be removed to the onboarding section
// const simulateLogout = () => {
//   fetch('https://api.capital.dev.tranwall.net/authentication/logout', {
//     method: 'POST',
//   }).then((res) => console.log(res.status));
// };

// simulateLogout();

// Apollo
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // graphQLErrors.forEach(({ message, locations, path }) => {
    //   console.log(`[GraphQL error]: ${message} ${locations} ${path} `);
    // });
  }

  if (networkError) {
    // console.log(`[Network error]: ${networkError}`)
  }
});

const restLink = new RestLink({
  endpoints: {
    dev: 'https://api.capital.dev.tranwall.net',
  },
  uri: 'http://localhost:8000',
});

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  link: from([errorLink, restLink]),
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

  const userIsLoggedIn = false; // Set to false before merge

  return (
    <ApolloProvider client={apolloClient}>
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
