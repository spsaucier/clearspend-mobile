import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import InitStartup from '@/Store/Startup/Init';
import tw from '@/Styles/tailwind';
import { Logo } from '@/Components/Svg/Logo';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitStartup.action());
  }, [dispatch]);

  return (
    <View style={tw`flex-1 flex-col justify-center items-center bg-forest-green`}>
      <View style={tw`flex flex-row p-6`}>
        <Logo style={tw`w-8/12`} />
      </View>
    </View>
  );
};

export default StartupScreen;
