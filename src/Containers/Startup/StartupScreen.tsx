import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import InitStartup from '@/Store/Startup/Init';
import tw from '@/Styles/tailwind';
import { LogoWithTagline } from '@/Components/Svg/LogoWithTagline';
import { FocusAwareStatusBar } from '@/Components';
import { useAuthentication } from '@/Hooks/useAuthentication';

const StartupScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useAuthentication();
  useEffect(() => {
    if (loading) return;

    dispatch(InitStartup.action());
  }, [loading, dispatch]);

  return (
    <View style={tw`flex-1 flex-col justify-center items-center bg-secondary`}>
      <FocusAwareStatusBar barStyle="light-content" />
      <View style={tw`flex flex-row p-6`}>
        <LogoWithTagline style={tw`w-8/12`} />
      </View>
    </View>
  );
};

export default StartupScreen;
