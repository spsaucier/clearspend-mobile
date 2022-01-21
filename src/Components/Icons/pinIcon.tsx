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

export const PinIcon = ({ color = tw.color('primary'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M7.5 8.75C8.19036 8.75 8.75 8.19036 8.75 7.5C8.75 6.80964 8.19036 6.25 7.5 6.25C6.80964 6.25 6.25 6.80964 6.25 7.5C6.25 8.19036 6.80964 8.75 7.5 8.75Z"
        fill={color}
      />
      <Path
        d="M16 8.75C16.6904 8.75 17.25 8.19036 17.25 7.5C17.25 6.80964 16.6904 6.25 16 6.25C15.3096 6.25 14.75 6.80964 14.75 7.5C14.75 8.19036 15.3096 8.75 16 8.75Z"
        fill={color}
      />
      <Path
        d="M24.5 8.75C25.1904 8.75 25.75 8.19036 25.75 7.5C25.75 6.80964 25.1904 6.25 24.5 6.25C23.8096 6.25 23.25 6.80964 23.25 7.5C23.25 8.19036 23.8096 8.75 24.5 8.75Z"
        fill={color}
      />
      <Path
        d="M7.5 17.25C8.19036 17.25 8.75 16.6904 8.75 16C8.75 15.3096 8.19036 14.75 7.5 14.75C6.80964 14.75 6.25 15.3096 6.25 16C6.25 16.6904 6.80964 17.25 7.5 17.25Z"
        fill={color}
      />
      <Path
        d="M16 17.25C16.6904 17.25 17.25 16.6904 17.25 16C17.25 15.3096 16.6904 14.75 16 14.75C15.3096 14.75 14.75 15.3096 14.75 16C14.75 16.6904 15.3096 17.25 16 17.25Z"
        fill={color}
      />
      <Path
        d="M24.5 17.25C25.1904 17.25 25.75 16.6904 25.75 16C25.75 15.3096 25.1904 14.75 24.5 14.75C23.8096 14.75 23.25 15.3096 23.25 16C23.25 16.6904 23.8096 17.25 24.5 17.25Z"
        fill={color}
      />
      <Path
        d="M7.5 25.75C8.19036 25.75 8.75 25.1904 8.75 24.5C8.75 23.8096 8.19036 23.25 7.5 23.25C6.80964 23.25 6.25 23.8096 6.25 24.5C6.25 25.1904 6.80964 25.75 7.5 25.75Z"
        fill={color}
      />
      <Path
        d="M16 25.75C16.6904 25.75 17.25 25.1904 17.25 24.5C17.25 23.8096 16.6904 23.25 16 23.25C15.3096 23.25 14.75 23.8096 14.75 24.5C14.75 25.1904 15.3096 25.75 16 25.75Z"
        fill={color}
      />
      <Path
        d="M24.5 25.75C25.1904 25.75 25.75 25.1904 25.75 24.5C25.75 23.8096 25.1904 23.25 24.5 23.25C23.8096 23.25 23.25 23.8096 23.25 24.5C23.25 25.1904 23.8096 25.75 24.5 25.75Z"
        fill={color}
      />
    </Svg>
  </View>
);
