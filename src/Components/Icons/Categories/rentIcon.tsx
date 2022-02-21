import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const RentIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M11.6461 15.3541C10.8752 13.4313 10.7919 11.3013 11.4101 9.32418C12.0284 7.34704 13.3104 5.64401 15.0394 4.50295C16.7683 3.3619 18.8383 2.85281 20.8993 3.06173C22.9603 3.27066 24.8859 4.18479 26.3507 5.6496C27.8155 7.11442 28.7297 9.04007 28.9386 11.1011C29.1475 13.1621 28.6384 15.232 27.4973 16.961C26.3563 18.6899 24.6532 19.9719 22.6761 20.5902C20.699 21.2084 18.569 21.1251 16.6462 20.3542L16.6463 20.354L15.0003 22H12.0003V25H9.00031V28H4.00031V23L11.6463 15.354L11.6461 15.3541Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.5"
        d="M22.5 10C22.7761 10 23 9.77614 23 9.5C23 9.22386 22.7761 9 22.5 9C22.2239 9 22 9.22386 22 9.5C22 9.77614 22.2239 10 22.5 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.5 10.75C23.1904 10.75 23.75 10.1904 23.75 9.5C23.75 8.80964 23.1904 8.25 22.5 8.25C21.8096 8.25 21.25 8.80964 21.25 9.5C21.25 10.1904 21.8096 10.75 22.5 10.75Z"
        fill="black"
      />
    </Svg>
  </View>
);
