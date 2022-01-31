import React from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { CheckCircleIconFilled } from '@/Components/Icons';

interface Props {
  label: string;
  enteredPassword: boolean;
}

export const PasswordRuleRow = ({ label, enteredPassword }: Props) => (
  <View style={tw`flex-row items-center mb-4`}>
    {enteredPassword ? (
      <CheckCircleIconFilled />
    ) : (
      <View style={tw.style('rounded-full h-4.5 w-4.5 border-1 border-white ml-1')} />
    )}
    <CSText style={tw`text-sm text-white ml-2`}>{label}</CSText>
  </View>
);
