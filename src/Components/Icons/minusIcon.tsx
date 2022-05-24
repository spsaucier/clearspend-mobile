import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const MinusIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 16,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.82764 12H18.3449"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
