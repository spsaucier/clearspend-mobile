import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

const aspectRatio = 18 / 12;

export const CheckMarkIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 18,
}: IconBaseProps) => (
  <View
    style={[{ aspectRatio, height: Number(size) * aspectRatio, width: size }, style]}
    testID={testID}
  >
    <Svg width="100%" height="100%" viewBox="0 0 18 12" fill="none">
      <Path
        d="M17.25 0.750488L6.75 11.25L1.5 6.00049"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);
