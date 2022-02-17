import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMMKVBoolean } from 'react-native-mmkv';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';
import { OTPView } from './OTPView';
import { sendEnrollment2FA, submitEnrollment2FACode } from '../../Services/Auth/index';
import { useUser, useUpdateUser } from '@/Queries';
import { JUST_SET_2FA_KEY, RECOVERY_CODE_KEY } from '@/Store/keys';
import { navigationRef } from '@/Navigators/Root';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { UpdateUserRequest } from '../../generated/capital';
import { useSensitiveInfo } from '@/Hooks/useSensitiveInfo';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { formatPhone } from '@/Helpers/StringHelpers';
import { store } from '@/Store';
import { remove2FA } from '@/Store/Session';

const EnterOTPScreen = () => {
  const { t } = useTranslation();
  const { data: user } = useUser();
  const { params } = useRoute<any>();
  const { popToTop } = useNavigation<StackNavigationProp<ParamListBase>>();
  const [hasError, setHasError] = useState(false);
  const { setItem: setRecoveryCode } = useSensitiveInfo(RECOVERY_CODE_KEY);
  const [, setJustSet2FA] = useMMKVBoolean(JUST_SET_2FA_KEY);

  const { mutate } = useUpdateUser();

  const resendCode = async () => {
    try {
      await sendEnrollment2FA(params?.phone, user?.userId || '', 'sms');
      Toast.show({
        type: 'success',
        text1: t('toasts.verificationResent', { number: formatPhone(params.phone) }),
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: t('toasts.resendFailed'),
      });
    }
  };

  const handleSubmit = async (code: string) => {
    try {
      const { recoveryCodes } = await submitEnrollment2FACode(
        code,
        user?.userId || '',
        params.phone,
      );
      await setRecoveryCode(`${recoveryCodes[0]}|${user?.userId}`);
      setJustSet2FA(true);
      await mutate({ ...user, phone: params.phone } as UpdateUserRequest);
      // Remove old 2FA method info from storage of session
      store.dispatch(remove2FA());
      Toast.show({
        type: 'success',
        text1: `${formatPhone(params.phone)} saved as authentication method`,
      });
      navigationRef.current?.navigate(params.nextScreen || MainScreens.Profile);
      popToTop();
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <KeyboardAvoidingView style={tw`flex-1 p-6`} behavior="padding">
        <BackButtonNavigator />
        <OnboardingScreenTitle
          titlePart1={t('otp.titlePart1')}
          titlePart2={t('otp.titlePart2')}
          titlePart3={t('otp.titlePart3')}
        />
        <OTPView
          error={hasError}
          errorTitle={t('otp.incorrect')}
          onPasscodeChanged={() => setHasError(false)}
          onSuccessFinished={handleSubmit}
        />

        <View style={tw`flex-row justify-center px-3`} />

        <TouchableOpacity style={tw`mt-auto mt-10`} onPress={resendCode}>
          <View style={tw`items-center my-6`}>
            <CSText style={tw`text-sm text-white mb-6`}>{t('otp.resendCode')}</CSText>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterOTPScreen;
