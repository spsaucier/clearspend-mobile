import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

const aspectRatio = 18 / 14;

export const ReceiptIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 14,
}: IconBaseProps) => (
  <View
    style={[{ aspectRatio, height: Number(size) * aspectRatio, width: size }, style]}
    testID={testID}
  >
    <Svg width="14" height="18" viewBox="0 0 14 18" fill="none">
      <Path
        d="M13 1H1V17L3 14.9355L5 17L7 14.9355L9 17L11 14.9355L13 17V1Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <Path
        d="M4 6L10 6"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 9L8 9"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
