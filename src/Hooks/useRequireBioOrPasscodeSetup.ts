import { useEffect, useState } from 'react';
import { useMMKVString } from 'react-native-mmkv';

import { useAuthentication } from './useAuthentication';
import { AVAILABLE_BIO_KEY } from '@/Store/keys';

const useRequireBioOrPasscodeSetup = () => {
  const [shouldAct, setShouldAct] = useState(false);
  const { biometricsEnabled, passcodeEnabled, loading } = useAuthentication();
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);
  useEffect(() => {
    if (!loading) {
      setShouldAct(!biometricsEnabled && !passcodeEnabled);
    }
  }, [biometricsEnabled, loading, passcodeEnabled, availableBio]);

  return { loading, shouldAct };
};

export default useRequireBioOrPasscodeSetup;
