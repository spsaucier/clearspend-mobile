import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const ArrowSquareOutIcon = ({
  color = tw.color('primary'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.4062 8.98438L19.4055 3.59447L14.0156 3.59375"
        stroke={color}
        strokeWidth={1.07812}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.9349 10.0649L19.4037 3.59619"
        stroke={color}
        strokeWidth={1.07812}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5312 12.9375V18.6875C16.5312 18.8781 16.4555 19.0609 16.3207 19.1957C16.1859 19.3305 16.0031 19.4062 15.8125 19.4062H4.3125C4.12188 19.4062 3.93906 19.3305 3.80427 19.1957C3.66948 19.0609 3.59375 18.8781 3.59375 18.6875V7.1875C3.59375 6.99688 3.66948 6.81406 3.80427 6.67927C3.93906 6.54448 4.12188 6.46875 4.3125 6.46875H10.0625"
        stroke={color}
        strokeWidth={1.07812}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
