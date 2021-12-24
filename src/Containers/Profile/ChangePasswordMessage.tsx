import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { Button, CSText } from '@/Components';

const ChangePasswordMessage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={tw`bg-white flex-1 p-5`}>
      <CSText style={tw`text-2xl text-black pt-24`}>{t('profile.message.passwordUpdated')}</CSText>
      <CSText style={tw`text-base text-black mt-12`}>
        {t('profile.message.signInUsingNewPassword')}
      </CSText>
      <Button
        containerStyle={tw`mt-96 mb-10`}
        label={t('profile.message.confirmation')}
        onPress={() => {
          navigation.navigate('Profile Screen');
        }}
      />
    </SafeAreaView>
  );
};

export default ChangePasswordMessage;
