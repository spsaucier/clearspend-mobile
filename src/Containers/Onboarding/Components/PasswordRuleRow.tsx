import React from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { CheckCircleIconFilled, CircleIcon } from '@/Components/Icons';

type PasswordRuleRowProps = {
  label: string;
  matchingRule: boolean;
  testID?: string;
};

export const PasswordRuleRow = ({ label, matchingRule, testID }: PasswordRuleRowProps) => (
  <View style={tw`flex-row items-center mb-4`}>
    {matchingRule ? <CheckCircleIconFilled testID={testID} /> : <CircleIcon />}
    <CSText style={tw`text-sm text-white ml-2`}>{label}</CSText>
  </View>
);
