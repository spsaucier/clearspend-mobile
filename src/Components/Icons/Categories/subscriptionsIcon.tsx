import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const SubscriptionsIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M10 19.9991H26C26.2652 19.9991 26.5196 19.8938 26.7071 19.7063C26.8946 19.5187 27 19.2644 27 18.9991V5.99915C27 5.73393 26.8946 5.47958 26.7071 5.29204C26.5196 5.1045 26.2652 4.99915 26 4.99915H12C11.7348 4.99915 11.4804 5.1045 11.2929 5.29204C11.1054 5.47958 11 5.73393 11 5.99915V6.99915"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 17L10 20L13 23"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V26C5 26.2652 5.10536 26.5196 5.29289 26.7071C5.48043 26.8946 5.73478 27 6 27H20C20.2652 27 20.5196 26.8946 20.7071 26.7071C20.8946 26.5196 21 26.2652 21 26V25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 14.9991L22 11.9991L19 8.99915"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
