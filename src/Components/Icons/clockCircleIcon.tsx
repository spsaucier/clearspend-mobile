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

export const ClockCircleIcon = ({ color = tw.color('white'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5002 4.62357C7.53089 4.62357 5.12382 7.03065 5.12382 9.99992C5.12382 12.9692 7.53089 15.3763 10.5002 15.3763C13.4694 15.3763 15.8765 12.9692 15.8765 9.99992C15.8765 7.03065 13.4694 4.62357 10.5002 4.62357ZM3.8335 9.99992C3.8335 6.31802 6.81826 3.33325 10.5002 3.33325C14.1821 3.33325 17.1668 6.31802 17.1668 9.99992C17.1668 13.6818 14.1821 16.6666 10.5002 16.6666C6.81826 16.6666 3.8335 13.6818 3.8335 9.99992ZM10.5002 6.67853C10.8565 6.67853 11.1453 6.96738 11.1453 7.32369V9.73268L12.9635 11.5509C13.2155 11.8028 13.2155 12.2113 12.9635 12.4633C12.7116 12.7152 12.3031 12.7152 12.0511 12.4633L10.044 10.4561C9.92297 10.3351 9.855 10.171 9.855 9.99992V7.32369C9.855 6.96738 10.1438 6.67853 10.5002 6.67853Z"
        fill={color}
      />
    </Svg>
  </View>
);
