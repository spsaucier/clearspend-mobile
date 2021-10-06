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

export const SnowflakeIcon = ({ color = tw.color('primary'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 11.2H16.664L19.256 8.608L18.128 7.472L14.4 11.2H12.8V9.6L16.528 5.872L15.392 4.744L12.8 7.336V4H11.2V7.336L8.608 4.744L7.472 5.872L11.2 9.6V11.2H9.6L5.872 7.472L4.744 8.608L7.336 11.2H4V12.8H7.336L4.744 15.392L5.872 16.528L9.6 12.8H11.2V14.4L7.472 18.128L8.608 19.256L11.2 16.664V20H12.8V16.664L15.392 19.256L16.528 18.128L12.8 14.4V12.8H14.4L18.128 16.528L19.256 15.392L16.664 12.8H20V11.2Z"
        fill={color}
      />
    </Svg>
  </View>
);
