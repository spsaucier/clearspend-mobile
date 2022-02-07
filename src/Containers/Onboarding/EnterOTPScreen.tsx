import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ParamListBase, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';
import { mixpanel } from '@/Services/utils/analytics';
import { useAuthentication } from '../../Hooks/useAuthentication';
import { OTPView } from './OTPView';
import { sendEnrollment2FA, submitEnrollment2FACode } from '../../Services/Auth/index';
import { useUser } from '@/Queries';
import { MainScreens } from '../../Navigators/NavigatorTypes';
import { updateUser } from '@/Queries/user';

const EnterOTPScreen = () => {
  const { t } = useTranslation();
  const { data: user } = useUser();
  const { params } = useRoute<any>();
  const { setLoggedIn } = useAuthentication();
  const [hasError, setHasError] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const resendCode = async () => {
    try {
      await sendEnrollment2FA(params?.phone, user?.userId || '', 'sms');
      // TODO: show toast for success
    } catch (e) {
      // eslint-disable-next-line no-console
      console.info(e);
      // TODO: show toast for failure
    }
  };

  const handleSubmit = async (code: string) => {
    try {
      await submitEnrollment2FACode(code, user?.userId || '', params.phone);
      await updateUser({ ...user, phone: params.phone });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      setHasError(true);
    }
    mixpanel.track('Login');
    setLoggedIn(true);
    navigation.replace(MainScreens.Wallet);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <KeyboardAvoidingView style={tw`flex-1 p-6`} behavior="padding">
        <OnboardingScreenTitle
          titlePart1={t('otp.titlePart1')}
          titlePart2={t('otp.titlePart2')}
          titlePart3={t('otp.titlePart3')}
        />
        <OTPView
          title={(
            <CSText style={tw`font-telegraf text-2xl text-white mb-3 mt-6`}>
              {t('loginOptions.passcode.confirmYour')}
              <CSText style={tw`font-telegraf text-2xl mb-3 mt-6 text-primary`}>
                {t('loginOptions.passcode.fourDigitPasscode')}
              </CSText>
            </CSText>
          )}
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
