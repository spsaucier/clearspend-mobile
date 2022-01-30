import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
};

export const MinusCircleFilledIcon = ({
  color = tw.color('white'),
  bgColor = tw.color('black'),
  style,
  testID,
  size = 16,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
      <Circle cx="8" cy="8" r="8" fill={bgColor} />
      <Path
        d="M4 8.00003H12"
        stroke={color}
        stroke-width="0.905797"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);
