import React from 'react';
import { View } from 'react-native';
import { Polyline, Rect, Svg } from 'react-native-svg';

import { IconBaseProps } from '@/Components/Icons/types';
import tw from '@/Styles/tailwind';

export const CheckBoxCheckedIcon = ({
  style,
  testID,
  size = 24,
  color = tw.color('primary'),
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Rect
        x={1}
        height={20}
        y={1}
        width={20}
        stroke={color}
        strokeOpacity={0.2}
        fill="none"
        rx={3}
        strokeWidth={1}
      />
      <Polyline
        points="6,12 11,16 18,7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
