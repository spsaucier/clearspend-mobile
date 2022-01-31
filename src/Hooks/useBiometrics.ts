/* eslint-disable no-console */
import { Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useMMKVString } from 'react-native-mmkv';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { mixpanel } from '../Services/utils/analytics';
import { AuthenticationMethods } from './useAvailableBioMethod';
import { AVAILABLE_BIO_KEY, BIO_STORAGE_KEY } from '../Store/keys';

export interface ReturnUseBiometrics {
  loading: boolean;
  bioLogin: () => Promise<boolean>;
  biometricsEnabled?: string;
  toggleBiometrics: () => void;
  enableBiometrics: () => Promise<boolean>;
  disableBiometrics: () => Promise<boolean>;
  verifyBio: () => Promise<boolean>;
  successfulBioLogin: () => void;
}

export const useBiometrics = (setLoggedIn?: (loggedIn: boolean) => void): ReturnUseBiometrics => {
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);
  const [loading, setLoading] = useState(false);
  const [biometricsPublicKey, setBiometricsPublicKey] = useMMKVString(BIO_STORAGE_KEY);
  const { t } = useTranslation();
  const promptMessage = t(`loginMethod.${availableBio}.${Platform.OS}.description`);

  /**
   * Is the app in a state where we can request the permission for biometrics on iOS?
   */
  const isBiometricPermissionRequestableIos = async () => {
    // Fingerprint does not require permission in iOS
    if (availableBio === AuthenticationMethods.FINGERPRINT) {
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

  const requestBiometricPermissionIos = async () => {
    const result = (await request(PERMISSIONS.IOS.FACE_ID)) === RESULTS.GRANTED;
    mixpanel.track('Biometric settings changed', { biometrics_enabled: result });
    return result;
  };

  const requestBiometricPermission = Platform.select({
    ios: requestBiometricPermissionIos,
    android: async () => true,
  });

  const canEnableBiometrics = async (): Promise<boolean> => {
    if (isBiometricPermissionRequestable && requestBiometricPermission) {
      if (await isBiometricPermissionRequestable()) {
        const permissionsEnabled = await requestBiometricPermission();
        if (!permissionsEnabled) {
          await setBiometricsPublicKey('');
          mixpanel.track('BiometricDisabled');
        }
        return permissionsEnabled;
      }

      mixpanel.track('BiometricEnabled');
      return true;
    }
    return false;
  };

  const enableBiometrics = async () => {
    if (await canEnableBiometrics()) {
      try {
        const { success } = await ReactNativeBiometrics.simplePrompt({ promptMessage });
        setBiometricsPublicKey(success ? 'ClearSpend' : '');
        return success;
      } catch (e) {
        setBiometricsPublicKey('');
        console.warn(e);
      }
    }
    setBiometricsPublicKey('');
    return false;
  };

  const disableBiometrics = async () => {
    mixpanel.track('BiometricDisabled');
    setBiometricsPublicKey('');
    return false;
  };

  const toggleBiometrics = async () => {
    setLoading(true);
    const { keysExist } = await ReactNativeBiometrics.biometricKeysExist();
    if (keysExist) {
      const biometricsEnabled = await disableBiometrics();
      setLoading(false);
      return biometricsEnabled;
    }
    const biometricsEnabled = await enableBiometrics();
    setLoading(false);
    return biometricsEnabled;
  };

  const verifyBio = async (): Promise<boolean> => {
    setLoading(true);
    if (!availableBio) {
      setLoading(false);
      return false;
    }

    try {
      const { success } = await ReactNativeBiometrics.simplePrompt({ promptMessage });
      setLoading(false);
      return success;
    } catch (e: unknown) {
      mixpanel.track('Error', e as Error);
      console.warn(e);
      setLoading(false);
      return false;
    }
  };

  const successfulBioLogin = () => {
    if (setLoggedIn) {
      setLoggedIn(true);
    }
  };

  const bioLogin = async () => {
    setLoading(true);
    const loginSuccessful = await verifyBio();
    if (loginSuccessful) {
      successfulBioLogin();
    }
    setLoading(false);
    return loginSuccessful;
  };

  return {
    loading,
    bioLogin,
    biometricsEnabled: biometricsPublicKey,
    toggleBiometrics,
    enableBiometrics,
    disableBiometrics,
    verifyBio,
    successfulBioLogin,
  };
};
