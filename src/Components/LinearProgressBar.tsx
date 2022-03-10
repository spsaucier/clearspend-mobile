import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import tw from '@/Styles/tailwind';

interface Props {
  progressValue: number;
  maxValue: number;
  style?: StyleProp<ViewStyle>;
}

export const LinearProgressBar = ({ progressValue = 0, maxValue = 0, style }: Props) => {
  const progress = Math.floor((progressValue / maxValue) * 100);
  return (
    <View style={[tw`w-full mt-2`, style]}>
      <View style={tw`h-1 bg-white-20`} />
      <View style={[tw`h-1 bg-primary -mt-1`, { width: `${progress}%` }]} />
    </View>
  );
};
