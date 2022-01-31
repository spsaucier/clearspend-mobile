import axios, { AxiosResponse } from 'axios';
import { addSeconds } from 'date-fns';
import Config from 'react-native-config';

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
    client_id: Config.CS_FA_CLIENT_ID,
    client_secret: Config.CS_FA_CLIENT_SECRET,
    scope: 'offline_access',
  });

  const response = await axios({
    method: 'POST',
    url: `${Config.CS_FA_URL}/oauth2/token`,
    data: params,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }).catch((ex) => Promise.reject(ex.response));
  return parseTokenResponse(response);
};

const changePassword = async (change_password_id: string, password: string) => {
  const response = await axios({
    method: 'POST',
    url: `${Config.CS_FA_URL}/api/user/change-password/${change_password_id}`,
    headers: { 'content-type': 'application/json' },
    data: { password },
  }).catch((ex) => ex.response);
  return response;
};

const loginUsingOneTimePass = async (oneTimePassword: string) => {
  const params = qs.stringify({
    grant_type: 'password',
    oneTimePassword,
    client_id: Config.CS_FA_CLIENT_ID,
    client_secret: Config.CS_FA_CLIENT_SECRET,
    scope: 'offline_access',
  });
  const response = await axios({
    method: 'POST',
    url: `${Config.CS_FA_URL}/api/login/`,
    headers: { 'content-type': 'application/json' },
    data: params,
  }).catch((ex) => ex.response);
  return response;
};

const getNewAccessToken = async (refreshToken: string) => {
  const params = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: Config.CS_FA_CLIENT_ID,
    client_secret: Config.CS_FA_CLIENT_SECRET,
    scope: 'offline_access',
  });

  const response = await axios({
    method: 'POST',
    url: `${Config.CS_FA_URL}/oauth2/token`,
    data: params,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }).catch((ex) => Promise.reject(ex.response));

  return parseTokenResponse(response);
};

export { login, getNewAccessToken, changePassword, loginUsingOneTimePass };
