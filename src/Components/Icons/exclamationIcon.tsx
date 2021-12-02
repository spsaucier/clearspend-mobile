import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
};

export const ExclamationIcon = ({
  color = tw.color('white'),
  bgColor = tw.color('black'),
  style,
  testID,
  size = 24,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        fill={bgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.9375C12.3107 6.9375 12.5625 7.18934 12.5625 7.5V12.75C12.5625 13.0607 12.3107 13.3125 12 13.3125C11.6893 13.3125 11.4375 13.0607 11.4375 12.75V7.5C11.4375 7.18934 11.6893 6.9375 12 6.9375Z"
        fill={color}
      />
      <Path
        d="M12 17.0625C12.5178 17.0625 12.9375 16.6428 12.9375 16.125C12.9375 15.6072 12.5178 15.1875 12 15.1875C11.4822 15.1875 11.0625 15.6072 11.0625 16.125C11.0625 16.6428 11.4822 17.0625 12 17.0625Z"
        fill={color}
      />
    </Svg>
  </View>
);
