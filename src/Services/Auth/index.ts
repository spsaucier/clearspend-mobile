import axios, { AxiosResponse } from 'axios';
import { addSeconds } from 'date-fns';
import { Config } from '@/Config';

const qs = require('qs');

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
  const params = qs.stringify({
    grant_type: 'password',
    username,
    password,
    client_id: Config.FA_CLIENT_ID,
    client_secret: Config.FA_CLIENT_SECRET,
    scope: 'offline_access',
  });

  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/oauth2/token`,
    data: params,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }).catch((ex) => Promise.reject(ex.response));

  return parseTokenResponse(response);
};

const getNewAccessToken = async (refreshToken: string) => {
  const params = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: Config.FA_CLIENT_ID,
    client_secret: Config.FA_CLIENT_SECRET,
    scope: 'offline_access',
  });

  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/oauth2/token`,
    data: params,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }).catch((ex) => Promise.reject(ex.response));

  return parseTokenResponse(response);
};

export { login, getNewAccessToken };
