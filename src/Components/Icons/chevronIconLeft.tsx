import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
};

export const ChevronIconLeft = ({ color = tw.color('black'), style, testID, size = 8 }: Props) => (
  <View style={[{ aspectRatio: 3 / 5, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 6 10" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.35355 0.646447C5.54882 0.841709 5.54882 1.15829 5.35355 1.35355L1.70711 5L5.35355 8.64645C5.54882 8.84171 5.54882 9.15829 5.35355 9.35355C5.15829 9.54882 4.84171 9.54882 4.64645 9.35355L0.646447 5.35355C0.451184 5.15829 0.451184 4.84171 0.646447 4.64645L4.64645 0.646447C4.84171 0.451184 5.15829 0.451184 5.35355 0.646447Z"
        fill={color}
      />
    </Svg>
  </View>
);
