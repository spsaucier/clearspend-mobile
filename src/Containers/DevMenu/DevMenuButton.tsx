import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';

export const DevMenuButton = () => {
  const { navigate } = useNavigation();
  if (__DEV__) {
    return (
      <TouchableOpacity
        style={[tw`mr-auto ml-5 py-2 px-3 bg-white-5 rounded-full`]}
        onPress={() => navigate(MainScreens.DevMenu)}
      >
        <CSText style={tw`text-white text-center text-xs`}>DEV</CSText>
      </TouchableOpacity>
    );
  }
  return null;
};
