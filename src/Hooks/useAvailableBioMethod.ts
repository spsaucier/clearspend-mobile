import { useCallback, useEffect } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import ReactNativeBiometrics from 'react-native-biometrics';
import { AVAILABLE_BIO_KEY } from '@/Store/keys';

export enum AuthenticationMethods {
  FINGERPRINT = 'TouchID',
  FINGERPRINT_ANDROID = 'Biometrics',
  FACE = 'FaceID',
}

export const useAvailableBioMethod = (): void => {
  const [, setAvailableBio] = useMMKVString(AVAILABLE_BIO_KEY);

  const handleMethodAvailable = useCallback(async () => {
    const sensor = await ReactNativeBiometrics.isSensorAvailable();

    if (sensor.available) {
      setAvailableBio(sensor.biometryType);
    } else {
      setAvailableBio('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleMethodAvailable();
  }, [handleMethodAvailable]);
};
