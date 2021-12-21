import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  fromPromise,
  InMemoryCache,
  ServerError,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RestLink } from 'apollo-link-rest';

import Config from 'react-native-config';
import AuthNavigator from '@/Navigators/AuthNavigator';
import MainNavigator from '@/Navigators/MainNavigator';
import { navigateAndSimpleReset, navigationRef } from '@/Navigators/Root';
import { StartupState } from '@/Store/Startup';
import StartupScreen from '@/Containers/Startup/StartupScreen';
import { killSession, Session, updateSession } from '@/Store/Session';
import { store } from '@/Store';
import { getNewAccessToken } from '@/Services/Auth';
import { mixpanel } from '@/Services/utils/analytics';

const Stack = createStackNavigator();

// Apollo Error handling
/* eslint-disable consistent-return */
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (networkError) {
    if ('response' in networkError) {
      const responseError = (networkError as ServerError).response;

      // Handle UNAUTHORIZED
      // Fetch new token if possible
      if (responseError.status === 401) {
        const { session } = store.getState();
        const { refreshToken } = session;

        // if no refreshToken, kill session
        if (!refreshToken) {
          store.dispatch(killSession());
          return;
        }

        // if token exists, try obtaining a new token using the refreshToken
        return fromPromise(
          getNewAccessToken(refreshToken!)
            .then((newTokens) => {
              // store new tokens, expiration, etc in the session
              store.dispatch(updateSession(newTokens));

              // pass down the accessToken to the operation cycle

              return newTokens.accessToken;
            })
            .catch(() => {
              // if getting a new token using refresh token didnt work somehow,
              //  kill session and redirect the user to the login screen again
              store.dispatch(killSession());
            }),
        ).flatMap((accessToken) => {
          const oldHeaders = operation.getContext().headers;

          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${accessToken}`,
            },
          });

          // forward operation for a new attempt as we got a new token!
          return forward(operation);
        });
      }

      // TODO: handle other possible exceptions
    }
  }

  if (graphQLErrors) {
    // TODO: handle possible graphQL errors here
  }

  // not returning forward(operation) will end cause links termination
  // then the user will finally see an error in the UI component
});

// injects the current token into the operation context
const tokenMiddleware = new ApolloLink((operation, forward) => {
  const session = store.getState().session as Session;
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${session.accessToken}`,
    },
  }));

  return forward(operation);
});

// serializer for uploading files (like upload receipt)
const formDataSerializer = (data: any, headers: Headers) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  });
  headers.set('Content-Type', 'multipart/form-data');
  return { body: formData, headers };
};

const restLink = new RestLink({
  uri: Config.CS_API_URL,
  bodySerializers: {
    formData: formDataSerializer,
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Card: {
      keyFields: ['card', ['cardId']],
    },
  },
});
const apolloClient = new ApolloClient({
  cache,
  link: from([errorLink, tokenMiddleware, restLink]),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

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
  }, [applicationIsLoading, session, navigationRef.current]);

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name || '';
          }}
          onStateChange={onStateChange}
        >
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Startup" component={StartupScreen} />
            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
              options={{
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default ApplicationNavigator;
