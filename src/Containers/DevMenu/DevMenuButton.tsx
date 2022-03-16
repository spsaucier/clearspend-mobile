import React from 'react';
import { TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';

export const DevMenuButton = () => {
  const { navigate } = useNavigation();
  if (__DEV__ || Config.ENV_NAME === 'DEV' || Config.ENV_NAME === 'UAT') {
    return (
      <TouchableOpacity
        style={[tw`mr-auto ml-5 py-2 px-3 bg-white-5 rounded-full`]}
        onPress={() => navigate(MainScreens.DevMenu)}
      >
        <CSText style={tw`text-white text-center text-xs`}>{Config.ENV_NAME}</CSText>
      </TouchableOpacity>
    );
  }
  return null;
};
