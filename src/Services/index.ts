/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Config from 'react-native-config';
import { getNewAccessToken } from './Auth';
import { store } from '@/Store';
import { killSession, updateSession } from '@/Store/Session';

const apiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

apiClient.interceptors.request.use((config) => {
  const { accessToken } = store.getState().session;

  // tries to use the current Authorization one in case of accessToken is not avaiable (yet)
  // in other words, this is just a way to bypass the interceptor when authorization is set in the request itself.
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = accessToken
    ? `Bearer ${accessToken}`
    : config.headers.Authorization;
  return config;
});

const refreshAuthToken = async () => {
  const { refreshToken } = store.getState().session;
  const sessionPayload = await getNewAccessToken(refreshToken!).catch((e) => {
    // TODO: treat this in the same as useAuthentication's logout
    store.dispatch(killSession());
    return Promise.reject(e);
  });
  store.dispatch(updateSession(sessionPayload));
};

createAuthRefreshInterceptor(apiClient, refreshAuthToken, { statusCodes: [401, 403] });

export default apiClient;
