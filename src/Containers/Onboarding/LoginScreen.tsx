import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';

const LoginScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex p-5`}>
        <Text style={tw`text-base text-primary`}>{t('login.heading')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
