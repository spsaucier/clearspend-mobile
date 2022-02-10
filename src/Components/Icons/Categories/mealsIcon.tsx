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

export const MealsIcon = ({ color = tw.color('black'), style, testID, size = 32 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 22V29"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 29H21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99998 3H22L25.2572 14.0347C25.4613 14.724 25.4108 15.4637 25.115 16.1188C24.3221 17.8718 23.0405 19.359 21.4238 20.4021C19.8072 21.4452 17.924 22 16 22C14.076 22 12.1928 21.4452 10.5762 20.4021C8.95947 19.359 7.67786 17.8719 6.88492 16.1189C6.58916 15.4637 6.53869 14.7241 6.74273 14.0348L9.99998 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.18555 12.5346C8.51036 11.8305 11.5918 10.7959 16 13C20.6944 15.3472 23.8843 14.0215 25.0502 13.3334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
