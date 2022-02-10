import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import jwtDecode from 'jwt-decode';
import { Session } from '@/Store/Session';

const parseLoginResponse = (res: AxiosResponse) => {
  let decoded = {
    exp: new Date().valueOf() / 1000,
    userId: res.data.user?.id,
  };
  const accessToken = res.data.token;
  try {
    decoded = jwtDecode(accessToken);
  } catch {
    // Ignore
  }
  const session: Session = {
    userId: decoded.userId || res.data.user?.id,
    accessToken,
    refreshToken: res.data.refreshToken,
    expiresAt: new Date(decoded.exp * 1000).toISOString(),
  };
  return session;
};

export const sendEnrollment2FA = async (formattedMobile: string, userId: string, method = 'sms') =>
  axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/two-factor/send`,
    data: {
      mobilePhone: parseInt(formattedMobile, 10),
      userId,
      method,
    },
    headers: { 'content-type': 'application/json' },
  }).catch((ex) => Promise.reject(ex.response));

export const submitEnrollment2FACode = async (
  code: string,
  userId: string,
  formattedMobile: string,
  method = 'sms',
) =>
  axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/user/two-factor/${userId}`,
    data: {
      code,
      userId,
      method,
      mobilePhone: parseInt(formattedMobile, 10),
    },
    headers: { 'content-type': 'application/json' },
  }).catch((ex) => Promise.reject(ex.response));

const send2FA = async (twoFactorId: string, methodId: string) =>
  axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/two-factor/send/${twoFactorId}`,
    data: {
      methodId,
    },
    headers: { 'content-type': 'application/json' },
  }).catch((ex) => Promise.reject(ex.response));

export const login = async (username: string, password: string) => {
  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/login`,
    data: {
      loginId: username,
      password,
      applicationId: Config.FA_CLIENT_ID,
    },
    headers: { 'content-type': 'application/json' },
  }).catch((ex) => Promise.reject(ex.response));

  switch (response.status) {
    case 203:
      return {
        changePasswordId: response.data?.changePasswordId,
      };
      break;
    case 242:
      if (response.data?.methods?.length) {
        try {
          const { twoFactorId } = response.data;
          const twoFactorMethodId = response.data.methods?.[0]?.id;
          const twoFactorMethod = response.data.methods?.[0]?.method;
          if (['sms', 'email'].includes(twoFactorMethod)) {
            send2FA(twoFactorId, twoFactorMethodId);
          }
          return {
            twoFactorId,
            twoFactorMethod, // 'sms' | 'email'
          };
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(new Error('MFA requested, but no MFA method found'));
      break;
    case 200:
    case 202:
      return parseLoginResponse(response);
      break;
    default:
      // eslint-disable-next-line no-console
      console.error('Unhandled response:', response.status, response.data);
      return response.data;
      break;
  }
};

export const login2FA = async (twoFactorId: string, code: string) => {
  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/two-factor/login`,
    data: {
      code,
      twoFactorId,
      applicationId: Config.FA_CLIENT_ID,
    },
    headers: { 'content-type': 'application/json' },
  }).catch((ex) => Promise.reject(ex.response));
  return parseLoginResponse(response);
};

export const changePassword = async (
  changePasswordId: string,
  password: string,
  currentPassword: string,
) => {
  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/user/change-password/${changePasswordId}`,
    headers: { 'content-type': 'application/json' },
    data: { password, currentPassword },
  }).catch((ex) => Promise.reject(ex.response.data));
  return response;
};

export const loginUsingOneTimePass = async (loginId: string, oneTimePassword: string) => {
  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/login/`,
    headers: { 'content-type': 'application/json' },
    data: {
      loginId,
      oneTimePassword,
      applicationId: Config.FA_CLIENT_ID,
    },
  }).catch((ex) => ex.response);
  return parseLoginResponse(response);
};

export const getNewAccessToken = async (refreshToken: string) => {
  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/jwt/refresh`,
    data: { refreshToken },
    headers: { 'content-type': 'application/json' },
  }).catch((ex) => Promise.reject(ex.response));

  return parseLoginResponse(response);
};
