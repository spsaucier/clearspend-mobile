import { Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { useTranslation } from 'react-i18next';
import { AuthenticationMethods, useAvailableBioMethod } from './useAvailableBioMethod';
import { useSensitiveInfo } from './useSensitiveInfo';
import { mixpanel } from '../Services/utils/analytics';
import { BIO_STORAGE_KEY, IS_BIOMETRIC_ENABLED } from '@/Store/keys';
import useAsyncStorage from './useAsyncStorage';

export interface ReturnUseBiometrics {
  loading: boolean;
  bioLogin: () => Promise<boolean>;
  biometricsEnabled: boolean;
  toggleBiometrics: () => void;
  enableBiometrics: (enable: boolean) => Promise<boolean>;
  verifyBio: () => Promise<boolean>;
  successfulBioLogin: () => void;
  bioMethodAvailable: AuthenticationMethods | false;
}

export const useBiometrics = (setLoggedIn?: (loggedIn: boolean) => void): ReturnUseBiometrics => {
  const { methodAvailable } = useAvailableBioMethod();
  const { setValue: setAsyncIsBiometricEnabled } = useAsyncStorage(IS_BIOMETRIC_ENABLED, false);
  const { t } = useTranslation();

  const {
    data: biometricsEnabled,
    loading,
    setItem: setBiometricsEnabled,
    deleteItem,
  } = useSensitiveInfo(BIO_STORAGE_KEY);

  const verifyBio = async (): Promise<boolean> => {
    if (!methodAvailable) {
      return false;
    }

    try {
      const promptMessage = t(`loginMethod.${methodAvailable}.${Platform.OS}.description`);

      const { success } = await ReactNativeBiometrics.simplePrompt({ promptMessage });
      return success;
    } catch (e: unknown) {
      mixpanel.track('Error', e as Error);
      return false;
    }
  };

  const successfulBioLogin = () => {
    if (setLoggedIn) {
      setLoggedIn(true);
    }
  };

  const bioLogin = async () => {
    const loginSuccessful = await verifyBio();
    if (loginSuccessful) {
      successfulBioLogin();
    }
    return loginSuccessful;
  };

  /**
   * Is the app in a state where we can request the permission for biometrics on iOS?
   */
  const isBiometricPermissionRequestableIos = async () => {
    // Fingerprint does not require permission in iOS
    if (methodAvailable === AuthenticationMethods.FINGERPRINT) {
      return false;
    }

    /*
     * DENIED is a strange word to use from this library, but when they say DENIED, they mean that
     * you are able to request this permission on iOS.
     * More information here: https://github.com/zoontek/react-native-permissions#ios-flow
     */
    return (await check(PERMISSIONS.IOS.FACE_ID)) === RESULTS.DENIED;
  };

  const isBiometricPermissionRequestable = Platform.select({
    ios: isBiometricPermissionRequestableIos,
    android: async () => false,
  });

  /**
   * Checks for biometric permissions and requests them if they are in a "requestable"
   * state.
   *
   * @returns true if permissions are granted, false otherwise
   */
  const requestBiometricPermissionIos = async () => {
    const result = (await request(PERMISSIONS.IOS.FACE_ID)) === RESULTS.GRANTED;

    mixpanel.track('Biometric settings changed', { biometrics_enabled: result });

    return result;
  };

  /**
   * Checks for biometric permissions and requests them if they are in a "requestable"
   * state.
   *
   * @returns true if permissions are granted, false otherwise
   */
  const requestBiometricPermission = Platform.select({
    ios: requestBiometricPermissionIos,
    android: async () => true,
  });

  const enableBiometrics = async (enable: boolean): Promise<boolean> => {
    if (enable && isBiometricPermissionRequestable && requestBiometricPermission) {
      await setBiometricsEnabled(`${enable}`);

      if (await isBiometricPermissionRequestable()) {
        const permissionsEnabled = await requestBiometricPermission();
        if (!permissionsEnabled) {
          await deleteItem();
          mixpanel.track('BiometricDisabled');
        } else {
          mixpanel.track('BiometricEnabled');
        }
        return permissionsEnabled;
      }

      mixpanel.track('BiometricEnabled');
      return true;
    }
    mixpanel.track('BiometricDisabled');
    await deleteItem();
    return false;
  };

  const toggleBiometrics = async () => {
    const isEnabled = await enableBiometrics(!biometricsEnabled);
    setAsyncIsBiometricEnabled(isEnabled);
  };

  return {
    loading,
    bioLogin,
    biometricsEnabled: Boolean(biometricsEnabled),
    bioMethodAvailable: methodAvailable,
    toggleBiometrics,
    enableBiometrics,
    verifyBio,
    successfulBioLogin,
  };
};
