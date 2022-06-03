import React from 'react';
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { DevMenuButton } from '@/Containers/DevMenu/DevMenuButton';
import { BackButtonNavigator, CSText, LetterAvatar } from '@/Components';
import { User } from '@/generated/capital';
import { formatUserName, getUserInitials } from '@/Helpers/UserNameHelper';

export const HeaderIcons = ({
  onLayout,
  employee,
}: {
  onLayout: (event: LayoutChangeEvent) => void;
  employee?: User;
}) => {
  const { navigate } = useNavigation();
  return (
    <View style={tw`w-full flex-row items-center justify-end py-3 pr-6`} onLayout={onLayout}>
      {employee ? (
        <>
          <BackButtonNavigator theme="dark" containerStyle={tw`mr-auto ml-5`} />
          <View style={tw`flex-row items-center`}>
            <LetterAvatar initials={getUserInitials(employee)} />
            <CSText style={tw`text-white ml-2`}>{formatUserName(employee).combinedName}</CSText>
          </View>
        </>
      ) : (
        <>
          <DevMenuButton />
          <View style={tw`flex-row`}>
            <TouchableOpacity onPress={() => navigate(MainScreens.Profile)}>
              <ProfileIcon color={tw.color('white')} style={tw`ml-3`} size={26} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
