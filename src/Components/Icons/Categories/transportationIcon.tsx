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

export const TransportationIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M18 18L21 15L18 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.2929 2.20711L2.20711 15.2929C1.81658 15.6834 1.81658 16.3166 2.20711 16.7071L15.2929 29.7929C15.6834 30.1834 16.3166 30.1834 16.7071 29.7929L29.7929 16.7071C30.1834 16.3166 30.1834 15.6834 29.7929 15.2929L16.7071 2.20711C16.3166 1.81658 15.6834 1.81658 15.2929 2.20711Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 19V18C11 17.2044 11.3161 16.4413 11.8787 15.8787C12.4413 15.3161 13.2044 15 14 15H21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
