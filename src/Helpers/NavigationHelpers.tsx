import React from 'react';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { ChevronIconLeft } from '@/Components/Icons';
import { CSText } from '@/Components';

export const sharedStackHeaderConfig = (
  headerTitle: string,
  backButtonTitle: string,
): StackHeaderOptions => ({
  headerShadowVisible: false,
  headerLeft: ({ onPress }) => (
    <TouchableOpacity style={tw`flex-row items-center bg-tan ml-4`} onPress={onPress}>
      <ChevronIconLeft style={tw`m-2`} size={6} />
      <CSText style={tw`text-2xs tracking-widest mr-2`}>{backButtonTitle}</CSText>
    </TouchableOpacity>
  ),
  headerTitle,
  headerTitleAlign: 'left',
  headerStyle: tw`bg-white border-0`,
  headerTitleStyle: tw`font-montreal text-lg font-normal`,
});
