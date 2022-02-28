import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const MagnificationIcon = ({
  color = tw.color('black-50'),
  style,
  testID,
  size = 20,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.16666 4.58325C6.63536 4.58325 4.58333 6.63528 4.58333 9.16658C4.58333 11.6979 6.63536 13.7499 9.16666 13.7499C11.698 13.7499 13.75 11.6979 13.75 9.16658C13.75 6.63528 11.698 4.58325 9.16666 4.58325ZM3.33333 9.16658C3.33333 5.94492 5.945 3.33325 9.16666 3.33325C12.3883 3.33325 15 5.94492 15 9.16658C15 10.5523 14.5168 11.8251 13.7098 12.8258L16.4836 15.5996C16.7277 15.8437 16.7277 16.2394 16.4836 16.4835C16.2395 16.7276 15.8438 16.7276 15.5997 16.4835L12.8259 13.7097C11.8252 14.5168 10.5524 14.9999 9.16666 14.9999C5.945 14.9999 3.33333 12.3882 3.33333 9.16658Z"
        fill={color}
      />
    </Svg>
  </View>
);
