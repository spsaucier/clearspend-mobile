// import { useEffect } from 'react';
// import { ParamListBase, useNavigation, useRoute } from '@react-navigation/core';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useMMKVNumber } from 'react-native-mmkv';
// import { differenceInHours, subHours } from 'date-fns';

// import { MainScreens } from '@/Navigators/NavigatorTypes';
// import useRequireBioOrPasscodeSetup from './useRequireBioOrPasscodeSetup';
// import useRequire2FA from './useRequire2FA';
// import { useTermsAndConditionsTimestampDetails } from '@/Queries/termsAndConditions';

// const TERMS_AND_CONDITIONS_LAST_CHECK = 'TERMS_AND_CONDITIONS_LAST_CHECK';

/**
 * @deprecated The hook is not necessary and must be removed
 * implement a proper terms and conditions hook and add it to the MainContainer (Application.tsx)
 */
const useRequireUserAction = (): void => {
  // const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  // const route = useRoute();
  // const { name: routeName } = route;
  //
  // const { loading: loading2FA, shouldAct: needs2FA } = useRequire2FA();
  // const { loading: loadingBioPasscode, shouldAct: needsBioPasscode } =
  //   useRequireBioOrPasscodeSetup();
  // const { refetch: checkTermsAndConditions } = useTermsAndConditionsTimestampDetails();
  // const [termsAndConditionsLastCheckDateTime] = useMMKVNumber(TERMS_AND_CONDITIONS_LAST_CHECK);
  // TODO: Re enable terms and conditions check when backend is fixed
  // useEffect(() => {
  //   const lastCheckDt = termsAndConditionsLastCheckDateTime || subHours(new Date(), 2);
  //   if (differenceInHours(new Date(), lastCheckDt) >= 1) {
  //     checkTermsAndConditions().then((response) => {
  //       const { isAcceptedTermsAndConditions } = response.data!;
  //       if (!isAcceptedTermsAndConditions) {
  // TODO: Don't manually navigate when reinstating this, see MainNavigator.tsx
  //         navigation.replace(MainScreens.UpdatedTermsAndConditionsScreen);
  //       }
  //     });
  //   }
  // }, [checkTermsAndConditions, termsAndConditionsLastCheckDateTime, navigation]);
};

export default useRequireUserAction;
