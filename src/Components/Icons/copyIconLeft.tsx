import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
  bgColor?: string;
};

export const CopyIconLeft = ({
  color = tw.color('primary'),
  bgColor = tw.color('secondary'),
  style,
  testID,
  size = 24,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 30 30" fill="none">
      <Path
        d="M0 2C0 0.89543 0.895431 0 2 0H28C29.1046 0 30 0.895431 30 2V28C30 29.1046 29.1046 30 28 30H2C0.89543 30 0 29.1046 0 28V2Z"
        fill={bgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6396 8.81208C10.6396 8.57909 10.8285 8.39021 11.0615 8.39021H21.187C21.42 8.39021 21.6089 8.57909 21.6089 8.81208V18.9372C21.6089 19.1701 21.42 19.359 21.187 19.359C20.954 19.359 20.7651 19.1701 20.7651 18.9372V9.23396H11.0615C10.8285 9.23396 10.6396 9.04508 10.6396 8.81208Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.38965 11.0622C8.38965 10.8292 8.57853 10.6403 8.81152 10.6403H18.9369C19.1699 10.6403 19.3588 10.8292 19.3588 11.0622V21.1872C19.3588 21.4202 19.1699 21.609 18.9369 21.609H8.81152C8.57853 21.609 8.38965 21.4202 8.38965 21.1872V11.0622ZM9.2334 11.484V20.7653H18.5151V11.484H9.2334Z"
        fill={color}
      />
    </Svg>
  </View>
);
