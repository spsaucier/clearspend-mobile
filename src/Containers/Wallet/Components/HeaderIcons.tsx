import React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import tw from '@/Styles/tailwind';
import { BackButtonNavigator, CSText, LetterAvatar } from '@/Components';
import { User } from '@/generated/capital';
import { formatUserName, getUserInitials } from '@/Helpers/UserNameHelper';

export const HeaderIcons = ({
  onLayout,
  employee,
}: {
  onLayout: (event: LayoutChangeEvent) => void;
  employee: User;
}) => (
  <View style={tw`w-full flex-row items-center justify-end py-3 pr-6`} onLayout={onLayout}>
    <BackButtonNavigator theme="dark" containerStyle={tw`mr-auto ml-5`} />
    <View style={tw`flex-row items-center`}>
      <LetterAvatar initials={getUserInitials(employee)} />
      <CSText style={tw`text-white ml-2`}>{formatUserName(employee).combinedName}</CSText>
    </View>
  </View>
);
