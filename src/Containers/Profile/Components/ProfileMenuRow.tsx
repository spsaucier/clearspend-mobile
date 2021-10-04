import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { ChevronIcon } from '@/Assets/Icons';

type Props = {
  label: string;
  onPress: () => void;
};

export const ProfileMenuRow = ({ label, onPress }: Props) => (
  <TouchableOpacity
    style={tw`flex-row items-center justify-between py-6 border-b border-gray90`}
    onPress={onPress}
  >
    <Text style={tw`text-base text-copy`}>{label}</Text>
    <ChevronIcon />
  </TouchableOpacity>
);
