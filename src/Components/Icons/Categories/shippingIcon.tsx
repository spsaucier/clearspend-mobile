import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const ShippingIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M28 22.1651V9.83484C28 9.6574 27.9528 9.48316 27.8632 9.32999C27.7736 9.17683 27.6449 9.05025 27.4903 8.96326L16.4903 2.77576C16.3406 2.69157 16.1717 2.64734 16 2.64734C15.8283 2.64734 15.6594 2.69157 15.5097 2.77576L4.50974 8.96326C4.35509 9.05025 4.22637 9.17683 4.13679 9.32999C4.04721 9.48316 4 9.6574 4 9.83484V22.1651C4 22.3426 4.04721 22.5168 4.13679 22.67C4.22637 22.8232 4.35509 22.9497 4.50974 23.0367L15.5097 29.2242C15.6594 29.3084 15.8283 29.3526 16 29.3526C16.1717 29.3526 16.3406 29.3084 16.4903 29.2242L27.4903 23.0367C27.6449 22.9497 27.7736 22.8232 27.8632 22.67C27.9528 22.5168 28 22.3426 28 22.1651Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.1278 19.0639V12.5639L10 5.875"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.8621 9.3284L16.1186 16L4.13849 9.32715"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.1186 16L16.0013 29.3527"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
