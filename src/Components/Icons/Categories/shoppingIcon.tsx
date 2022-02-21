import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const ShoppingIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M10 28.75C10.9665 28.75 11.75 27.9665 11.75 27C11.75 26.0335 10.9665 25.25 10 25.25C9.0335 25.25 8.25 26.0335 8.25 27C8.25 27.9665 9.0335 28.75 10 28.75Z"
        fill="black"
      />
      <Path
        d="M23 28.75C23.9665 28.75 24.75 27.9665 24.75 27C24.75 26.0335 23.9665 25.25 23 25.25C22.0335 25.25 21.25 26.0335 21.25 27C21.25 27.9665 22.0335 28.75 23 28.75Z"
        fill="black"
      />
      <Path
        d="M5.28572 9H27.7143L24.4144 20.5494C24.295 20.9673 24.0428 21.335 23.6958 21.5967C23.3488 21.8584 22.926 22 22.4914 22H10.5086C10.074 22 9.65119 21.8584 9.30421 21.5967C8.95723 21.335 8.70495 20.9673 8.58556 20.5494L4.06436 4.72528C4.00467 4.51633 3.87853 4.33251 3.70504 4.20165C3.53155 4.07079 3.32015 4 3.10284 4H1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
