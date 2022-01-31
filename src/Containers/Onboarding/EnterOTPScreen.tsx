import React from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import tw from '@/Styles/tailwind';
import { Button, CSText, CSTextInput } from '@/Components';
import { OnboardingScreenTitle } from './Components/OnboardingScreenTitle';
import { Session, updateSession } from '@/Store/Session';
import { mixpanel } from '@/Services/utils/analytics';

type BoxProps = {
  value: string;
};

const Box = ({ value }: BoxProps) => (
  <View style={tw`h-13 w-13 m-1`}>
    <CSTextInput
      style={tw`text-base text-white font-bold`}
      onSelectionChange={this}
      selectionColor={tw.color('white')}
      autoFocus
      value={value}
      returnKeyType="next"
      scrollEnabled
    />
  </View>
);

const EnterOTPScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const { params } = route;

  const handleSubmit = () => {
    mixpanel.track('Login');
    const sessionPayload = params.sessionPayload as Session;
    dispatch(updateSession(sessionPayload));
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <KeyboardAvoidingView style={tw`flex-1 p-6`} behavior="padding">
        <OnboardingScreenTitle
          titlePart1={t('otp.titlePart1')}
          titlePart2={t('otp.titlePart2')}
          titlePart3={t('otp.titlePart3')}
        />
        <View style={tw`flex-row`}>
          <Box value="1" />
          <Box value="2" />
          <Box value="3" />
          <Box value="4" />
          <Box value="5" />
          <Box value="6" />
        </View>

        <View style={tw`flex-row justify-center px-3`} />

        <TouchableOpacity style={tw`mt-auto mt-10`} onPress={handleSubmit}>
          <View style={tw`items-center my-6`}>
            <CSText style={tw`text-sm text-white mb-6`}>{t('otp.resendCode')}</CSText>
          </View>
        </TouchableOpacity>

        <Button containerStyle={tw`mt-auto mb-6`} label={t('otp.buttonCta')} onPress={handleSubmit}></Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterOTPScreen;
