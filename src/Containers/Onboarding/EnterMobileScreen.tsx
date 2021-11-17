import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';
import { PhoneIcon } from '@/Components/Icons/phoneIcon';

const EnterMobileScreen = () => {
  const [mobile, setMobile] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const handleSubmit = () => {
    navigation.navigate('Verify Account');
  };
  useEffect(() => {
    setSubmitButtonDisabled(!mobile);
  }, [mobile]);
  return (
    <SafeAreaView style={tw`flex-1 bg-forest-green`}>
      <KeyboardAvoidingView style={tw`flex-1 p-6`} behavior="padding">
        <OnboardingHeader
          title={t('enterMobile.title')}
          subTitle={t('enterMobile.subTitle')}
          icon={<PhoneIcon />}
        />
        <TWTextInput
          label={t('enterMobile.mobileInputLabel')}
          // errorMessage="There was an error"
          placeholder={t('enterMobile.mobileInputPlaceholder')}
          keyboardType="email-address"
          containerStyle={tw`mb-8`}
          onChangeText={(value) => setMobile(value)}
          value={mobile}
        />
        <Button
          containerStyle={[tw`mt-auto mb-4`]}
          onPress={handleSubmit}
          disabled={submitButtonDisabled}
        >
          {t('enterMobile.buttonCta')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterMobileScreen;
