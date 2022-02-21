import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import tw from '@/Styles/tailwind';
import { ChevronIcon } from '@/Components/Icons';
import { CSText } from '@/Components';

type Props = {
  label?: string;
  title?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const ProfileMenuRow = ({ label, title, onPress, style }: Props) => (
  <TouchableOpacity
    style={[tw`flex-row items-center justify-between py-2`, style]}
    onPress={onPress}
  >
    <View>
      {title ? <CSText style={tw`text-lg ${label ? 'mb-2' : ''}`}>{title}</CSText> : null}
      {label ? <CSText style={tw`text-sm ${title ? 'opacity-70' : ''}`}>{label}</CSText> : null}
    </View>
    <ChevronIcon style={tw`w-7`} />
  </TouchableOpacity>
);
