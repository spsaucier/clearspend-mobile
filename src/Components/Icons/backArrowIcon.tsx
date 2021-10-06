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

export const BackArrowIcon = ({ color = tw.color('black'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7925 6.23214C11.0785 6.53177 11.0675 7.00651 10.7679 7.29252L6.62192 11.25H19.25C19.6642 11.25 20 11.5858 20 12C20 12.4142 19.6642 12.75 19.25 12.75H6.62192L10.7679 16.7075C11.0675 16.9935 11.0785 17.4682 10.7925 17.7679C10.5065 18.0675 10.0318 18.0785 9.73214 17.7925L4.23214 12.5425C4.08388 12.401 4 12.205 4 12C4 11.795 4.08388 11.599 4.23214 11.4575L9.73214 6.20748C10.0318 5.92148 10.5065 5.93252 10.7925 6.23214Z"
        fill={color}
      />
    </Svg>
  </View>
);
