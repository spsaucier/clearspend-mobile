import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const PlusIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 16,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.125 8C2.125 7.79289 2.29289 7.625 2.5 7.625H13.5C13.7071 7.625 13.875 7.79289 13.875 8C13.875 8.20711 13.7071 8.375 13.5 8.375H2.5C2.29289 8.375 2.125 8.20711 2.125 8Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.125C8.20711 2.125 8.375 2.29289 8.375 2.5V13.5C8.375 13.7071 8.20711 13.875 8 13.875C7.79289 13.875 7.625 13.7071 7.625 13.5V2.5C7.625 2.29289 7.79289 2.125 8 2.125Z"
        fill={color}
      />
    </Svg>
  </View>
);
