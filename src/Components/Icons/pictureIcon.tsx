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

export const PictureIcon = ({ color = tw.color('black'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z"
        stroke={color}
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 15.7501L7.71966 11.0305C7.7893 10.9608 7.87198 10.9056 7.96297 10.8679C8.05397 10.8302 8.15149 10.8108 8.24999 10.8108C8.34848 10.8108 8.44601 10.8302 8.537 10.8679C8.62799 10.9056 8.71067 10.9608 8.78032 11.0305L12.9697 15.2198C13.0393 15.2894 13.122 15.3447 13.213 15.3824C13.304 15.4201 13.4015 15.4395 13.5 15.4395C13.5985 15.4395 13.696 15.4201 13.787 15.3824C13.878 15.3447 13.9607 15.2894 14.0303 15.2198L15.9697 13.2805C16.0393 13.2108 16.122 13.1556 16.213 13.1179C16.304 13.0802 16.4015 13.0608 16.5 13.0608C16.5985 13.0608 16.696 13.0802 16.787 13.1179C16.878 13.1556 16.9607 13.2108 17.0303 13.2805L21 17.2501"
        stroke={color}
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.625 10.3125C15.1428 10.3125 15.5625 9.89277 15.5625 9.375C15.5625 8.85723 15.1428 8.4375 14.625 8.4375C14.1072 8.4375 13.6875 8.85723 13.6875 9.375C13.6875 9.89277 14.1072 10.3125 14.625 10.3125Z"
        fill={color}
      />
    </Svg>
  </View>
);
