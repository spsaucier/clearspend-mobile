import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';
import { TWTextInput } from '@/Components/TextInput';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';
import { PhoneIcon } from '@/Components/Icons/phoneIcon';

const EnterMobileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const handleSubmit = () => {
    navigation.navigate('Verify Account');
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-primary`}>
      <View style={tw`flex-1 p-6 justify-between`}>
        <View>
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
          />
        </View>
        <Button
          containerStyle={tw`flex w-full h-16`}
          textStyle={tw`text-primaryLight`}
          onPress={handleSubmit}
        >
          {t('enterMobile.buttonCta')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EnterMobileScreen;
