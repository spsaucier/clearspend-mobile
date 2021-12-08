import React from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';

interface Props {
  label: string;
  isSelected?: boolean;
}

export const PasswordRuleRow = ({ isSelected, label }: Props) => (
  <View style={tw`flex-row items-center mb-4`}>
    <View
      style={tw.style(
        'rounded-full h-4 w-4 border-1 border-white mr-3',
        isSelected ? 'bg-white' : 'bg-forest-green',
      )}
    />
    <CSText style={tw`text-sm text-white`}>{label}</CSText>
  </View>
);
