import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';
import { PasswordRuleRow } from '@/Containers/Onboarding/Components/PasswordRuleRow';
import { KeyIcon } from '@/Components/Icons';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';

const SetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { t } = useTranslation();
  const handleSubmit = () => {
    // Sign in and go to home screen
  };

  useEffect(() => {
    // TODO Password Checks
    setButtonDisabled(!password);
  }, [password]);

  return (
    <SafeAreaView style={tw`flex-1 bg-primary p-6`}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        enableResetScrollToCoords={false}
        contentContainerStyle={tw`flex-1`}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView style={tw`flex-1`} behavior="padding">
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
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />

          <View>
            <PasswordRuleRow label={t('setPassword.rules.mix')} />
            <PasswordRuleRow label={t('setPassword.rules.length')} isSelected />
            <PasswordRuleRow label={t('setPassword.rules.upperCase')} />
            <PasswordRuleRow label={t('setPassword.rules.lowerCase')} isSelected />
            <PasswordRuleRow label={t('setPassword.rules.special')} />
          </View>

          <Button
            containerStyle={tw`mt-auto mb-4`}
            onPress={handleSubmit}
            disabled={buttonDisabled}
          >
            {t('setPassword.buttonCta')}
          </Button>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SetPasswordScreen;
