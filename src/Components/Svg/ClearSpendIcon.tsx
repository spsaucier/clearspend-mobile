import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const ClearSpendIcon = ({
  color = tw.color('primary-new'),
  bgColor = tw.color('card-dark'),
  style,
  testID,
}: Props) => (
  <View style={[{ aspectRatio: 1, width: 40 }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 39 39" fill="none">
      <Path
        d="M0 4C0 1.79086 1.79086 0 4 0H35C37.2091 0 39 1.79086 39 4V35C39 37.2091 37.2091 39 35 39H4C1.79086 39 0 37.2091 0 35V4Z"
        fill={bgColor}
      />
      <Path
        d="M25.5911 16.266L9.45972 8.08383C8.66423 7.68041 8 7.97416 8 8.7526V13.6545L26.194 20.5298V17.457C26.194 16.9672 25.9269 16.4359 25.5911 16.266Z"
        fill={color}
      />
      <Path
        d="M18.8425 32.0968L29.9611 32.0905C30.21 32.0905 30.4083 31.7496 30.4083 31.3286V28.6796L17.9106 27.0687V30.9723C17.9106 31.5973 18.3334 32.0974 18.8425 32.0968Z"
        fill={color}
      />
      <Path
        d="M8 16.5677V21.469C8 22.2475 8.66423 23.0032 9.45972 23.1543L30.4083 27.1051V24.4561C30.4083 24.0356 30.21 23.6311 29.9612 23.5521L8 16.5677Z"
        fill={color}
      />
    </Svg>
  </View>
);
