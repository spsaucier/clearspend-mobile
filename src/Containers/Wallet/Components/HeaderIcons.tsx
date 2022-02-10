import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CSText, NotificationBell } from '@/Components';
import { ProfileIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';

export const HeaderIcons = () => {
  const { navigate } = useNavigation();
  return (
    <View style={tw`w-full flex-row items-center justify-end my-3 pr-6`}>
      {__DEV__ ? (
        <TouchableOpacity style={tw`mr-auto ml-5`} onPress={() => navigate(MainScreens.DevMenu)}>
          <CSText style={tw`text-white`}>DEV</CSText>
        </TouchableOpacity>
      ) : null}
      <View style={tw`flex-row`}>
        <NotificationBell onPress={() => navigate(MainScreens.Notifications)} />
        <TouchableOpacity onPress={() => navigate(MainScreens.Profile)}>
          <ProfileIcon color={tw.color('white')} style={tw`ml-3`} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
