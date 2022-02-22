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

export const InfoIcon = ({ color = tw.color('white'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.0002 21C16.9708 21 21.0002 16.9706 21.0002 12C21.0002 7.02944 16.9708 3 12.0002 3C7.02968 3 3.00024 7.02944 3.00024 12C3.00024 16.9706 7.02968 21 12.0002 21Z"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.25 11.25H12.0001L12 16.5H12.75"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.8125 8.8125C12.3303 8.8125 12.75 8.39277 12.75 7.875C12.75 7.35723 12.3303 6.9375 11.8125 6.9375C11.2947 6.9375 10.875 7.35723 10.875 7.875C10.875 8.39277 11.2947 8.8125 11.8125 8.8125Z"
        fill={color}
      />
    </Svg>
  </View>
);
