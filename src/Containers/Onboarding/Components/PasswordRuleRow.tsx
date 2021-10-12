import React from 'react';
import { View, Text } from 'react-native';
import tw from '@/Styles/tailwind';

interface Props {
  label: string;
  isSelected?: boolean;
}

export const PasswordRuleRow = ({ isSelected, label }: Props) => (
  <View style={tw`flex-row items-center mb-4`}>
    <View
      style={tw.style(
        'rounded-full h-4 w-4 border-2 border-primary-light-light mr-3',
        isSelected ? 'bg-white' : 'bg-primary',
      )}
    />
    <Text style={tw`text-sm text-copyLight`}>{label}</Text>
  </View>
);
