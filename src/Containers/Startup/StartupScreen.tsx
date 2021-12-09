import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import InitStartup from '@/Store/Startup/Init';
import tw from '@/Styles/tailwind';
import { Logo } from '@/Components/Svg/Logo';
import { FocusAwareStatusBar } from '@/Components';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitStartup.action());
  }, [dispatch]);

  return (
    <View style={tw`flex-1 flex-col justify-center items-center bg-secondary`}>
      <FocusAwareStatusBar barStyle="light-content" />
      <View style={tw`flex flex-row p-6`}>
        <Logo style={tw`w-8/12`} />
      </View>
    </View>
  );
};

export default StartupScreen;
