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

export const LightningOffIcon = ({
  color = tw.color('white'),
  style,
  testID,
  size = 24,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 3.74963L19.5 20.2496"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.3541 15.6891L9 22.4971L10.5 14.9971L4.5 12.7471L8.64356 8.30756"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.6974 6.10701L15 1.49713L13.5 8.99713L19.5 11.2471L17.4079 13.4886"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
