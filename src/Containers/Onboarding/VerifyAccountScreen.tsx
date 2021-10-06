import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';
import { PhoneIcon } from '@/Components/Icons';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';

type BoxProps = {
  value: string;
};
const Box = ({ value }: BoxProps) => (
  <View
    style={tw`items-center justify-center h-14 w-14 rounded-2xl border-2 border-primaryLight bg-primaryDark m-1`}
  >
    <Text style={tw`text-base text-white font-bold`}>{value || ''}</Text>
  </View>
);

const VerifyAccountScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const handleSubmit = () => {
    navigation.navigate('Set Password');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-primary`}>
      <View style={tw`flex-1 p-6 justify-between`}>
        <View>
          <OnboardingHeader
            title={t('verifyAccount.title')}
            subTitle={t('verifyAccount.subTitle')}
            icon={<PhoneIcon />}
          />

          <View style={tw`flex-row justify-center`}>
            <Box value="1" />
            <Box value="1" />
            <Box value="1" />
            <Box value="1" />
            <Box value="1" />
          </View>

          <View style={tw`items-center my-6`}>
            <Text style={tw`text-sm text-copyLight mb-6`}>{t('verifyAccount.resendCta')}</Text>
          </View>
        </View>
        <Button
          containerStyle={tw`flex w-full h-16`}
          textStyle={tw`text-primaryLight`}
          onPress={handleSubmit}
        >
          {t('verifyAccount.buttonCta')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default VerifyAccountScreen;
