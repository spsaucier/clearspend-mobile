import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const MembershipsIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M19 14H24"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 18H24"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5126 18C13.1694 18 14.5126 16.6569 14.5126 15C14.5126 13.3431 13.1694 12 11.5126 12C9.85572 12 8.51257 13.3431 8.51257 15C8.51257 16.6569 9.85572 18 11.5126 18Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.63861 20.9999C7.86055 20.1413 8.36147 19.3807 9.06266 18.8377C9.76385 18.2947 10.6256 18 11.5124 18C12.3993 18 13.261 18.2946 13.9623 18.8375C14.6635 19.3805 15.1645 20.141 15.3865 20.9997"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27 6H5C4.44772 6 4 6.44772 4 7V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V7C28 6.44772 27.5523 6 27 6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
