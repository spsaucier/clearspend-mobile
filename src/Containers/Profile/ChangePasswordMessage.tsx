import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { Button, CSText } from '@/Components';
import { MainScreens } from '../../Navigators/NavigatorTypes';

const ChangePasswordMessage = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1 p-5 justify-between`}>
      <View style={tw`pt-20`}>
        <CSText style={tw`text-2xl text-black`}>{t('profile.message.passwordUpdated')}</CSText>
        <CSText style={tw`text-base text-black mt-12`}>
          {t('profile.message.signInUsingNewPassword')}
        </CSText>
      </View>
      <Button
        label={t('profile.message.confirmation')}
        onPress={() => {
          navigate(MainScreens.Profile);
        }}
      />
    </SafeAreaView>
  );
};

export default ChangePasswordMessage;
