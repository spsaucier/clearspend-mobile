import React from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const CardIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.2692 5.66681H2.73077C2.32718 5.66681 2 5.98187 2 6.37051V17.6298C2 18.0184 2.32718 18.3335 2.73077 18.3335H20.2692C20.6728 18.3335 21 18.0184 21 17.6298V6.37051C21 5.98187 20.6728 5.66681 20.2692 5.66681Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 14.9998H19"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 14.9998H14"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 8.83368H21"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
