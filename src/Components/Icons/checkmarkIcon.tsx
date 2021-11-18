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

export const CheckMarkIcon = ({
  color = tw.color('ios-link'),
  style,
  testID,
  size = 24,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 26 26" fill="none">
      {/* TODO Replace with new one */}
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.1948 7.96498C20.7665 8.56459 20.7438 9.51407 20.1442 10.0857L10.7568 19.0349L6.35731 14.6355C5.77152 14.0497 5.77152 13.0999 6.35731 12.5142C6.94309 11.9284 7.89284 11.9284 8.47863 12.5142L10.8069 14.8424L18.0741 7.91431C18.6737 7.34268 19.6232 7.36537 20.1948 7.96498Z"
        fill={color}
      />
    </Svg>
  </View>
);
