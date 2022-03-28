import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const GovernmentIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M5 27.0006V6.00056"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.99994 21.0006C12.9999 15.0006 18.9999 27.0006 26.9999 21.0006V6.00057C18.9999 12.0006 12.9999 0.000567317 4.99994 6.00057"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
