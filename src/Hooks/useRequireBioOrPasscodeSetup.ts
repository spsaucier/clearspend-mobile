import { useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { useMMKVString } from 'react-native-mmkv';

import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthentication } from './useAuthentication';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { AVAILABLE_BIO_KEY } from '@/Store/keys';

const useRequireBioOrPasscodeSetup = (): void => {
  const { biometricsEnabled, passcodeActive, loading } = useAuthentication();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);
  useEffect(() => {
    if (!loading) {
      if (!biometricsEnabled && !passcodeActive) {
        navigation.replace(MainScreens.SetBiometricsOrPasscode);
      }
    }
  }, [
    biometricsEnabled,
    loading,
    passcodeActive,
    availableBio,
    navigation,
  ]);
};

export default useRequireBioOrPasscodeSetup;
