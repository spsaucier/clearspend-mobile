import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const CameraIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.5 19.5H4.5C4.10218 19.5 3.72064 19.342 3.43934 19.0607C3.15804 18.7794 3 18.3978 3 18V7.5C3 7.10218 3.15804 6.72064 3.43934 6.43934C3.72064 6.15804 4.10218 6 4.5 6H7.49945L8.99945 3.75H14.9995L16.4995 6H19.5C19.8978 6 20.2794 6.15804 20.5607 6.43934C20.842 6.72064 21 7.10218 21 7.5V18C21 18.3978 20.842 18.7794 20.5607 19.0607C20.2794 19.342 19.8978 19.5 19.5 19.5Z"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15.75C13.864 15.75 15.375 14.239 15.375 12.375C15.375 10.511 13.864 9 12 9C10.136 9 8.625 10.511 8.625 12.375C8.625 14.239 10.136 15.75 12 15.75Z"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
