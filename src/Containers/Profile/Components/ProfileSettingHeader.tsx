import React from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';

type Props = {
  title: string;
};

export const ProfileSettingsHeader = ({ title }: Props) => (
  <View style={tw`flex`}>
    <CSText style={tw`text-base text-black pt-4 ml-4`}>{title}</CSText>
  </View>
);
