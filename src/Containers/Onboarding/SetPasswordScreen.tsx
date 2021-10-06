import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';
import { PasswordRuleRow } from '@/Containers/Onboarding/Components/PasswordRuleRow';
import { KeyIcon } from '@/Components/Icons';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';

const SetPasswordScreen = () => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    // Sign in and go to home screen
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-primary`}>
      <View style={tw`flex-1 p-6 justify-between`}>
        <View>
          <OnboardingHeader
            title={t('setPassword.title')}
            subTitle={t('setPassword.subTitle')}
            icon={<KeyIcon />}
          />
          <TWTextInput
            // errorMessage="There was an error"
            placeholder={t('setPassword.passwordInputPlaceholder')}
            keyboardType="default"
            containerStyle={tw`mb-8`}
          />

          <PasswordRuleRow label={t('setPassword.rules.mix')} />
          <PasswordRuleRow label={t('setPassword.rules.length')} isSelected />
          <PasswordRuleRow label={t('setPassword.rules.upperCase')} />
          <PasswordRuleRow label={t('setPassword.rules.lowerCase')} isSelected />
          <PasswordRuleRow label={t('setPassword.rules.special')} />
        </View>
        <Button
          containerStyle={tw`flex w-full h-16`}
          textStyle={tw`text-primaryLight`}
          onPress={handleSubmit}
        >
          {t('setPassword.buttonCta')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SetPasswordScreen;
