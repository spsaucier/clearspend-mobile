import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import tw from '@/Styles/tailwind';

interface Props {
  progress: number;
  style?: StyleProp<ViewStyle>;
}

export const LinearProgressBar = ({ progress, style }: Props) => (
  <View style={[tw`mt-2 mb-2`, style]}>
    <View style={tw`h-1 bg-white-20`} />
    <View style={[tw`h-1 bg-primary -mt-1`, { width: `${progress}%` }]} />
  </View>
);
