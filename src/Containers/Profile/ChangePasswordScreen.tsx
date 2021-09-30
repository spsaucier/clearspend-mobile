import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';

const ChangePasswordScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex p-5`}>
        <Text style={tw`text-base text-primary`}>{t('profile.changePassword.changePassword')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
