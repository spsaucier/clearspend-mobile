import React from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { CheckCircleIconFilled } from '@/Components/Icons';

interface Props {
  label: string;
  enteredPassword?: boolean;
}

export const PasswordRuleCheck = ({ label, enteredPassword }: Props) => (
  <View style={tw`flex-row items-center mb-4 h-6`}>
    {enteredPassword ? (
      <View style={tw.style('w-5')}>
        <CheckCircleIconFilled />
      </View>
    ) : (
      <View style={tw.style('w-5')}>
        <View style={tw.style('rounded-full h-4.5 w-4.5 border-1 border-black ml-1')} />
      </View>
    )}
    <CSText style={tw`text-sm text-black ml-2`}>{label}</CSText>
  </View>
);
