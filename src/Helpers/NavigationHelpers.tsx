import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack/lib/typescript/src/types';
import { TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { ChevronIconLeft } from '@/Components/Icons';
import { CSText } from '@/Components';

export const sharedStackHeaderConfig = (
  headerTitle: string,
  backButtonTitle: string,
  goBackPress: () => void,
): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerLeft: () => (
    <TouchableOpacity style={tw`flex-row items-center bg-tan ml-4`} onPress={goBackPress}>
      <ChevronIconLeft style={tw`m-2`} size={6} />
      <CSText style={tw`text-2xs tracking-widest mr-2`}>{backButtonTitle}</CSText>
    </TouchableOpacity>
  ),
  headerTitle,
  headerTitleAlign: 'left',
  headerStyle: tw`bg-white border-0`,
  headerTitleStyle: tw`font-montreal text-lg font-normal`,
});
