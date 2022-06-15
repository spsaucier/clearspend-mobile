import Config from 'react-native-config';

export const Constants = {
  FORGOT_PASSWORD_URL: `${Config.WEB_URL}/forgot-password`,
  TERMS_CONDITIONS_URL: `https://www.clearspend.com/terms`,
  PRIVACY_POLICY_URL: `https://www.clearspend.com/privacy`,

  PERMISSION_ALL_NOTIFICATIONS: 'PERMISSION_ALL_NOTIFICATIONS',
  PERMISSION_NOTIFICATIONS_FIRST_CHECK: 'PERMISSION_NOTIFICATIONS_FIRST_CHECK',
  INITIAL_DEEPLINK_URL: 'INITIAL_DEEPLINK_URL',
};
