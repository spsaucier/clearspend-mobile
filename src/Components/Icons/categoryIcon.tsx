import React from 'react';
import { View } from 'react-native';
import { Path, Svg, Circle } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

const aspectRatio = 18 / 12;

export const CategoryIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 12,
}: IconBaseProps) => (
  <View
    style={[{ aspectRatio, height: Number(size) * aspectRatio, width: size }, style]}
    testID={testID}
  >
    <Svg width="12" height="18" viewBox="0 0 12 18" fill="none">
      <Path
        d="M10 17H2C1.44772 17 1 16.5523 1 16V4.85634C1 4.62588 1.0796 4.40249 1.22534 4.22396L3.55704 1.36762C3.74696 1.13498 4.03138 1 4.3317 1H7.6683C7.96862 1 8.25304 1.13498 8.44296 1.36762L10.7747 4.22396C10.9204 4.40249 11 4.62588 11 4.85634V16C11 16.5523 10.5523 17 10 17Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="6" cy="5" r="0.6" fill={color} stroke={color} strokeWidth="0.8" />
    </Svg>
  </View>
);
