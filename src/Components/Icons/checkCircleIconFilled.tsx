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

export const CheckCircleIconFilled = ({
  color = tw.color('black'),
  bgColor = tw.color('primary-new'),
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
        d="M16.5319 9.36161C16.7464 9.58633 16.7381 9.94239 16.5134 10.1569L11.0134 15.4069C10.796 15.6144 10.4539 15.6144 10.2366 15.4069L7.48661 12.7819C7.26189 12.5674 7.25361 12.2113 7.46812 11.9866C7.68262 11.7619 8.03868 11.7536 8.2634 11.9681L10.625 14.2224L15.7366 9.34311C15.9613 9.12861 16.3174 9.13689 16.5319 9.36161Z"
        fill={color}
      />
    </Svg>
  </View>
);
