import axios, { AxiosResponse } from 'axios';
import { addSeconds } from 'date-fns';
import { Config } from '@/Config';

const parseTokenResponse = (response: AxiosResponse) => {
  if (response.status === 200) {
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken,
      userId,
    } = response.data;

    return {
      userId,
      accessToken,
      expiresAt: addSeconds(Date.now(), expiresIn).toISOString(),
      refreshToken,
    };
  }
  return Promise.reject(new Error(response.statusText));
};

const login = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', username);
  params.append('password', password);
  params.append('client_id', Config.FA_CLIENT_ID);
  params.append('client_secret', Config.FA_CLIENT_SECRET);
  params.append('scope', 'offline_access');

  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/oauth2/token`,
    data: params,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }).catch((ex) => Promise.reject(ex.response));

  return parseTokenResponse(response);
};

const getNewAccessToken = async (refreshToken: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', Config.FA_CLIENT_ID);
  params.append('client_secret', Config.FA_CLIENT_SECRET);
  params.append('scope', 'offline_access');

  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/oauth2/token`,
    data: params,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }).catch((ex) => Promise.reject(ex.response));

  return parseTokenResponse(response);
};

export { login, getNewAccessToken };
