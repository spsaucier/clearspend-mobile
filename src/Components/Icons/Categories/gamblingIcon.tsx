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

export const GamblingIcon = ({ color = tw.color('black'), style, testID, size = 32 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M24 5H8C6.34315 5 5 6.34315 5 8V24C5 25.6569 6.34315 27 8 27H24C25.6569 27 27 25.6569 27 24V8C27 6.34315 25.6569 5 24 5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5 12.75C12.1904 12.75 12.75 12.1904 12.75 11.5C12.75 10.8096 12.1904 10.25 11.5 10.25C10.8096 10.25 10.25 10.8096 10.25 11.5C10.25 12.1904 10.8096 12.75 11.5 12.75Z"
        fill="black"
      />
      <Path
        d="M16 17.25C16.6904 17.25 17.25 16.6904 17.25 16C17.25 15.3096 16.6904 14.75 16 14.75C15.3096 14.75 14.75 15.3096 14.75 16C14.75 16.6904 15.3096 17.25 16 17.25Z"
        fill="black"
      />
      <Path
        d="M20.5 21.75C21.1904 21.75 21.75 21.1904 21.75 20.5C21.75 19.8096 21.1904 19.25 20.5 19.25C19.8096 19.25 19.25 19.8096 19.25 20.5C19.25 21.1904 19.8096 21.75 20.5 21.75Z"
        fill="black"
      />
    </Svg>
  </View>
);
