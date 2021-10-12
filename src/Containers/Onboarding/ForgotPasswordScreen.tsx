import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';
import { EmailIcon } from '@/Components/Icons';

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    // navigation.navigate('Set Password');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-primary`}>
      <KeyboardAvoidingView style={tw`flex-1 p-6`} behavior="padding">
        <View>
          <OnboardingHeader
            title={t('forgotPassword.enterEmail.title')}
            subTitle={t('forgotPassword.enterEmail.subTitle')}
            icon={<EmailIcon />}
          />
          <TWTextInput
            label={t('forgotPassword.enterEmail.emailInputLabel')}
            // errorMessage="There was an error"
            placeholder={t('forgotPassword.enterEmail.emailInputPlaceholder')}
            keyboardType="default"
            containerStyle={tw`mb-8`}
          />
        </View>
        <Button containerStyle={tw`mt-auto mb-4`} onPress={handleSubmit}>
          {t('forgotPassword.enterEmail.buttonCta')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
