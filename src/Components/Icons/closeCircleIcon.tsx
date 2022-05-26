import React from 'react';
import { View } from 'react-native';
import { Path, Svg, Circle } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const CloseCircleIcon = ({
  color = tw.color('black'),
  bgColor = tw.color('tan'),
  style,
  testID,
  size = 24,
}: IconBaseProps & { bgColor?: string }) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="12" fill={bgColor} />
      <Path
        d="M7 7L16.5354 16.5354"
        stroke={color}
        stroke-width="1.1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.4646 16.5354L17 7"
        stroke={color}
        stroke-width="1.1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);
