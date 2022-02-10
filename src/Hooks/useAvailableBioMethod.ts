import SInfo from 'react-native-sensitive-info';
import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import { AVAILABLE_BIO_KEY } from '@/Store/keys';

export enum AuthenticationMethods {
  FINGERPRINT = 'Touch ID',
  FINGERPRINT_ANDROID = 'Biometric ID',
  FACE = 'Face ID',
}

export const useAvailableBioMethod = (): void => {
  const [, setAvailableBio] = useMMKVString(AVAILABLE_BIO_KEY);
  const setMethodAvailableIos = (availability: string) => {
    if (availability === AuthenticationMethods.FACE) {
      setAvailableBio(AuthenticationMethods.FACE);
    } else if (availability === AuthenticationMethods.FINGERPRINT) {
      setAvailableBio(AuthenticationMethods.FINGERPRINT);
    } else {
      setAvailableBio('');
    }
  };

  const handleMethodAvailable = useCallback(async () => {
    const availability = await SInfo.isSensorAvailable();
    if (Platform.OS === 'ios') {
      setMethodAvailableIos(availability as string);
    } else if (Platform.OS === 'android' && availability) {
      setAvailableBio(AuthenticationMethods.FINGERPRINT_ANDROID);
    } else {
      setAvailableBio('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleMethodAvailable();
  }, [handleMethodAvailable]);
};
