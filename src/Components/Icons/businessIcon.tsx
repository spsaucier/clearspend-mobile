import React from 'react';
import { View } from 'react-native';
import { Path, Svg, Rect } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const BusinessIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.0002 21.75H18.6898V3H4.03467V21.75H8.68982M14.0002 21.75V16.8393H8.68982V21.75M14.0002 21.75H8.68982"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <Rect x="7.48291" y="5.67859" width="1.72414" height="1.78571" fill={color} />
      <Rect x="7.48291" y="9.25" width="1.72414" height="1.78571" fill={color} />
      <Rect x="7.48291" y="12.8214" width="1.72414" height="1.78571" fill={color} />
      <Rect x="13.5171" y="5.67859" width="1.72414" height="1.78571" fill={color} />
      <Rect x="13.5171" y="9.25" width="1.72414" height="1.78571" fill={color} />
      <Rect x="13.5171" y="12.8214" width="1.72414" height="1.78571" fill={color} />
      <Path d="M1.44824 21.75H21.2758" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </Svg>
  </View>
);
