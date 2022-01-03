/* eslint-disable no-underscore-dangle */
import axios from 'axios';
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

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken } = store.getState().session;
    if (
      [403, 401].includes(error.response.status) &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      const sessionPayload = await getNewAccessToken(refreshToken);
      store.dispatch(updateSession(sessionPayload));
      axios.defaults.headers.common.Authorization = `Bearer ${sessionPayload.accessToken}`;
      return apiClient(originalRequest);
    }
    store.dispatch(killSession());
    return Promise.reject(error);
  },
);

export default apiClient;
