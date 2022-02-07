import { useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { MainScreens } from '@/Navigators/NavigatorTypes';
import useRequireBioOrPasscodeSetup from './useRequireBioOrPasscodeSetup';
import useRequire2FA from './useRequire2FA';

const useRequireOnboarding = (): void => {
  const { loading: loading2FA, shouldAct: needs2FA } = useRequire2FA();
  const { loading: loadingBioPasscode, shouldAct: needsBioPasscode } =
    useRequireBioOrPasscodeSetup();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    if (!loading2FA && !loadingBioPasscode) {
      if (needs2FA) {
        navigation.navigate(MainScreens.EnterMobile);
      } else if (needsBioPasscode) {
        navigation.replace(MainScreens.SetBiometricsOrPasscode);
      }
    }
  }, [loading2FA, needs2FA, loadingBioPasscode, needsBioPasscode, navigation]);
};

export default useRequireOnboarding;
