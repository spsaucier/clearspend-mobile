import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { DevMenuButton } from '@/Containers/DevMenu/DevMenuButton';

export const HeaderIcons = ({ onLayout }: any) => {
  const { navigate } = useNavigation();
  return (
    <View style={tw`w-full flex-row items-center justify-end py-3 pr-6`} onLayout={onLayout}>
      <DevMenuButton />
      <View style={tw`flex-row`}>
        <TouchableOpacity onPress={() => navigate(MainScreens.Profile)}>
          <ProfileIcon color={tw.color('white')} style={tw`ml-3`} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
