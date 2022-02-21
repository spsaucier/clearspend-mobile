import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const ErrorIcon = ({
  color = tw.color('error'),
  style,
  testID,
  size = 64,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 62 62" fill="none">
      <Path
        d="M31 61C47.5685 61 61 47.5685 61 31C61 14.4315 47.5685 1 31 1C14.4315 1 1 14.4315 1 31C1 47.5685 14.4315 61 31 61Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M31 16V33.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M31 46C32.1046 46 33 45.1046 33 44C33 42.8954 32.1046 42 31 42C29.8954 42 29 42.8954 29 44C29 45.1046 29.8954 46 31 46Z"
        fill={color}
      />
    </Svg>
  </View>
);
