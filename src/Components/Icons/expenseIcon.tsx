import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { IconBaseProps } from './types';
import tw from '@/Styles/tailwind';

export const ExpenseIcon = ({
  color = tw.color('white'),
  style,
  testID,
  size = 20,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <Circle cx={9} cy={9} r={8.5} fill="#003333" stroke="white" />
      <Path
        d="M7.86 8.08V5.38H12.72V4.42H6.78V13H12.864V12.04H7.86V9.04H12.144V8.08H7.86Z"
        fill={color}
      />
    </Svg>
  </View>
);
