import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { ChevronIcon } from '@/Components/Icons';
import { CSText } from '@/Components';

type Props = {
  label: string;
  onPress: () => void;
};

export const ProfileMenuRow = ({ label, onPress }: Props) => (
  <TouchableOpacity style={tw`flex-row items-center justify-between py-2`} onPress={onPress}>
    <CSText style={tw`text-sm`}>{label}</CSText>
    <ChevronIcon style={tw`w-7`} />
  </TouchableOpacity>
);
