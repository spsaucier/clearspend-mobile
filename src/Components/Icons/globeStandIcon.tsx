import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const GlobeStandIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 18 14" fill="none">
      <Path
        d="M9 11.812C11.7959 11.812 14.0625 9.54545 14.0625 6.74951C14.0625 3.95357 11.7959 1.68701 9 1.68701C6.20406 1.68701 3.9375 3.95357 3.9375 6.74951C3.9375 9.54545 6.20406 11.812 9 11.812Z"
        stroke={color}
        strokeWidth={0.84375}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.1707 11.9202C12.7994 13.2915 10.9394 14.062 9 14.062C7.0606 14.062 5.20064 13.2915 3.82928 11.9202C2.45792 10.5488 1.6875 8.68885 1.6875 6.74945C1.6875 4.81006 2.45792 2.9501 3.82928 1.57874"
        stroke={color}
        strokeWidth={0.84375}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.75 16.312H11.25"
        stroke={color}
        strokeWidth={0.84375}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 14.062V16.312"
        stroke={color}
        strokeWidth={0.84375}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
