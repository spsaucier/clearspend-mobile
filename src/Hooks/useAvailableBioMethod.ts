import SInfo from 'react-native-sensitive-info';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export enum AuthenticationMethods {
  FINGERPRINT = 'Touch ID',
  FINGERPRINT_ANDROID = 'Biometric ID',
  FACE = 'Face ID',
}

type ReturnUseAvailableBioMethod = {
  loading: boolean;
  methodAvailable: AuthenticationMethods | false;
  reload: () => void;
};

export const useAvailableBioMethod = (): ReturnUseAvailableBioMethod => {
  const [loading, setLoading] = useState(true);
  const [methodAvailable, setMethodAvailable] = useState<AuthenticationMethods | false>(false);

  const setMethodAvailableIos = (availability: string) => {
    if (availability === AuthenticationMethods.FACE) {
      setMethodAvailable(AuthenticationMethods.FACE);
    } else if (availability === AuthenticationMethods.FINGERPRINT) {
      setMethodAvailable(AuthenticationMethods.FINGERPRINT);
    } else {
      setMethodAvailable(false);
    }
  };

  const handleMethodAvailable = async () => {
    const availability = await SInfo.isSensorAvailable();
    if (Platform.OS === 'ios') {
      setMethodAvailableIos(availability as string);
    } else if (Platform.OS === 'android' && availability) {
      setMethodAvailable(AuthenticationMethods.FINGERPRINT_ANDROID);
    } else {
      setMethodAvailable(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleMethodAvailable();
  });

  return { loading, methodAvailable, reload: handleMethodAvailable };
};
