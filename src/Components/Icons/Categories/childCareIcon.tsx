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

export const ChildCareIcon = ({ color = tw.color('black'), style, testID, size = 32 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5 17.25C12.1904 17.25 12.75 16.6904 12.75 16C12.75 15.3096 12.1904 14.75 11.5 14.75C10.8096 14.75 10.25 15.3096 10.25 16C10.25 16.6904 10.8096 17.25 11.5 17.25Z"
        fill={color}
      />
      <Path
        d="M20.5 17.25C21.1904 17.25 21.75 16.6904 21.75 16C21.75 15.3096 21.1904 14.75 20.5 14.75C19.8096 14.75 19.25 15.3096 19.25 16C19.25 16.6904 19.8096 17.25 20.5 17.25Z"
        fill={color}
      />
      <Path
        d="M19.3173 21.0003C18.3338 21.6523 17.1801 22 16.0001 22C14.8202 22 13.6664 21.6524 12.6829 21.0005"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 4C14 6.5 14 9 14 9C14 9.53043 14.2107 10.0391 14.5858 10.4142C14.9609 10.7893 15.4696 11 16 11C16.5304 11 17.0391 10.7893 17.4142 10.4142C17.7893 10.0391 18 9.53043 18 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
