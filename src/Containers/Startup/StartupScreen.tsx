import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import InitStartup from '@/Store/Startup/Init';
import tw from '@/Styles/tailwind';
import { Logo } from '@/Components/Svg/Logo';
import { ActivityIndicator } from '@/Components';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitStartup.action());
  }, [dispatch]);

  return (
    <View style={tw`flex-1 flex-col justify-center items-center bg-primary`}>
      <View style={tw`flex flex-row p-6`}>
        <Logo style={tw`w-8/12`} />
      </View>
      <ActivityIndicator style={tw`my-3 w-5 h-5`} />
    </View>
  );
};

export default StartupScreen;
