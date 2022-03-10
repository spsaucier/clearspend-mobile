import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import jwtDecode from 'jwt-decode';
import { Session } from '@/Store/Session';
import { mixpanel } from '../utils/analytics';

const handleError = (ex: any, apiRequest: string) => {
  mixpanel.track('API Error', { apiRequest, error: ex?.response?.data });
  return Promise.reject(ex?.response?.data || ex.response || ex);
};

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
    userId: decoded.userId,
    accessToken,
    refreshToken: res.data.refreshToken,
    expiresAt: new Date(decoded.exp * 1000).toISOString(),
    twoFactor: res.data.user?.twoFactor,
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
  }).catch((e) => handleError(e, 'sendEnrollment2FA'));

export const disableEnrollment2FA = async (
  recoveryCode: string,
  userId: string,
  twoFactorMethodId: string,
) =>
  axios({
    method: 'DELETE',
    url: `${Config.FA_URL}/api/user/two-factor/${userId}?code=${recoveryCode}&methodId=${twoFactorMethodId}`,
    headers: {
      'content-type': 'application/json',
      // TODO: Remove or use env var
      'x-fusionauth-tenantid': '933328da-3f46-0236-6ec6-4a04a689f99e',
    },
  }).catch((e) => handleError(e, 'disableEnrollment2FA'));

export const submitEnrollment2FACode = async (
  code: string,
  userId: string,
  formattedMobile: string,
  method = 'sms',
) => {
  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/user/two-factor/${userId}`,
    data: {
      code,
      userId,
      method,
      mobilePhone: parseInt(formattedMobile, 10),
    },
    headers: { 'content-type': 'application/json' },
  }).catch((e) => handleError(e, 'submitEnrollment2FACode'));
  return response.data;
};

const send2FA = async (twoFactorId: string, methodId: string) =>
  axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/two-factor/send/${twoFactorId}`,
    data: {
      methodId,
    },
    headers: { 'content-type': 'application/json' },
  }).catch((e) => handleError(e, 'send2FA'));

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
  }).catch((e) => handleError(e, 'login'));

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
          let method = response.data.methods?.find((m: { lastUsed: boolean }) => m.lastUsed);
          if (!method) {
            method = response.data.methods?.[0];
          }
          const twoFactorMethodId = method.id;
          const twoFactorMethod = method?.method;
          if (['sms', 'email'].includes(twoFactorMethod)) {
            await send2FA(twoFactorId, twoFactorMethodId);
          }
          return {
            twoFactorId,
            twoFactorMethod,
          };
        } catch (e) {
          return handleError(e, 'send2FA');
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
  }).catch((e) => handleError(e, 'login2FA'));
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
  }).catch((e) => handleError(e, 'changePassword'));
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
  }).catch((e) => handleError(e, 'loginUsingOneTimePass'));
  return parseLoginResponse(response);
};

export const getNewAccessToken = async (refreshToken: string) => {
  const response = await axios({
    method: 'POST',
    url: `${Config.FA_URL}/api/jwt/refresh`,
    data: { refreshToken },
    headers: { 'content-type': 'application/json' },
  }).catch((e) => handleError(e, 'getNewAccessToken'));

  return parseLoginResponse(response);
};
