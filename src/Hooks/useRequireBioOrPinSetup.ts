import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useMMKVString } from 'react-native-mmkv';

import { useAuthentication } from './useAuthentication';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { AVAILABLE_BIO_KEY } from '@/Store/keys';

const useRequireBioOrPinSetup = (): void => {
  const { biometricsEnabled, passcodeActive, loading } = useAuthentication();
  const { navigate } = useNavigation();
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);
  useEffect(() => {
    if (!loading) {
      // TODO: when PIN is added, remove availableBio from below
      if (!biometricsEnabled && !passcodeActive && availableBio) {
        navigate(MainScreens.SetBiometricsOrPin);
      }
    }
  }, [
    biometricsEnabled,
    loading,
    passcodeActive,
    availableBio,
    navigate,
  ]);
};

export default useRequireBioOrPinSetup;
