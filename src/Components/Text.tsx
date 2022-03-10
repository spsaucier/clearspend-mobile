import { Text, TextProps } from 'react-native';
import React from 'react';
import tw from '@/Styles/tailwind';

export const CSText = ({ children, style, ...props }: TextProps) => (
  <Text style={[tw`font-montreal text-black text-base`, style]} {...props}>
    {children}
  </Text>
);
