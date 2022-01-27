/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Config from 'react-native-config';
import { getNewAccessToken } from './Auth';
import { store } from '@/Store';
import { killSession, updateSession } from '@/Store/Session';

const apiClient = axios.create({
  baseURL: Config.CS_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

apiClient.interceptors.request.use((config) => {
  const { accessToken } = store.getState().session;
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${accessToken}`;
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
