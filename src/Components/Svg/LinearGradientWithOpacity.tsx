import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Svg, Rect, Defs, Stop, LinearGradient } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

const LinearGradientWithOpacity = ({ color = tw.color('white'), testID, style }: Props) => (
  <View style={[tw`w-full`, style]} testID={testID}>
    <Svg width="100%" height="100%" fill="none">
      <Rect width="100%" height="100%" fill="url(#paint0_linear_2559_15124)" />
      <Defs>
        <LinearGradient
          id="paint0_linear_2559_15124"
          x1={187.5}
          y1={0}
          x2={187.5}
          y2={81}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color} stopOpacity={0} />
          <Stop offset={0.854167} stopColor={color} />
        </LinearGradient>
      </Defs>
    </Svg>
  </View>
);

export default LinearGradientWithOpacity;
