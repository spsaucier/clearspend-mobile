import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import InitStartup from '@/Store/Startup/Init';
import tw from '@/Styles/tailwind';
import { Logo } from '@/Assets/Svg/Logo';
import { ActivityIndicator } from '@/Components';

const StartupContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitStartup.action());
  }, [dispatch]);

  return (
    <View style={tw`flex-1 flex-col justify-center items-center bg-primary`}>
      <View style={tw`flex flex-row p-6`}>
        <Logo style={tw`w-8/12`} />
      </View>
      <ActivityIndicator style={tw`my-3`} />
      <Text style={tw`text-center text-white`}>{t('welcome')}</Text>
    </View>
  );
};

export default StartupContainer;
