import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { Button, CSText } from '@/Components';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';
import { AuthScreens } from '../../Navigators/NavigatorTypes';

type BoxProps = {
  value: string;
};
const Box = ({ value }: BoxProps) => (
  <View style={tw`items-center justify-center h-12 w-12 rounded-2xl bg-secondary-light m-1`}>
    <CSText style={tw`text-base text-white font-bold`}>{value || ''}</CSText>
  </View>
);

const VerifyAccountScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const handleSubmit = () => {
    // @ts-expect-error todo fix screen param types
    navigate(AuthScreens.SetPassword);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <KeyboardAvoidingView style={tw`flex-1 p-6`} behavior="padding">
        <OnboardingHeader title={t('verifyAccount.title')} subTitle={t('verifyAccount.subTitle')} />

        <View style={tw`flex-row justify-center px-3`}>
          <Box value="1" />
          <Box value="1" />
          <Box value="1" />
          <Box value="1" />
          <Box value="1" />
          <Box value="1" />
        </View>

        <View style={tw`items-center my-6`}>
          <CSText style={tw`text-sm text-white mb-6`}>{t('verifyAccount.resendCta')}</CSText>
        </View>
        <Button containerStyle={tw`mt-auto mb-4`} onPress={handleSubmit}>
          {t('verifyAccount.buttonCta')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyAccountScreen;
