import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
};

export const UserIcon = ({ style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 17C20.4183 17 24 13.4183 24 9C24 4.58172 20.4183 1 16 1C11.5817 1 8 4.58172 8 9C8 13.4183 11.5817 17 16 17Z"
        fill="#43FA76"
      />
      <Path
        d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z"
        stroke="black"
        strokeWidth="1.3"
        strokeMiterlimit="10"
      />
      <Path
        d="M3.87354 26.9988C5.10299 24.8708 6.8708 23.1037 8.99939 21.8752C11.128 20.6467 13.5424 20 16.0001 20C18.4577 20 20.8721 20.6468 23.0007 21.8754C25.1292 23.1039 26.897 24.871 28.1264 26.9991"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
