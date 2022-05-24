import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const UserOutlineIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.5863 15C14.7858 15 17.3794 12.3137 17.3794 9C17.3794 5.68629 14.7858 3 11.5863 3C8.38687 3 5.79321 5.68629 5.79321 9C5.79321 12.3137 8.38687 15 11.5863 15Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.80493 20.2491C3.69522 18.6531 4.97537 17.3278 6.51676 16.4064C8.05815 15.485 9.80651 15 11.5862 15C13.3659 15 15.1142 15.4851 16.6556 16.4065C18.197 17.3279 19.4771 18.6533 20.3674 20.2493"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
