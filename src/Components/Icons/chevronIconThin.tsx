import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const ChevronIconThin = ({
  color = tw.color('black'),
  style,
  testID,
  size = 10,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 10 / 18, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 10 18" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.57576 0.575638C0.810075 0.341324 1.18997 0.341324 1.42429 0.575638L9.42429 8.57564C9.6586 8.80995 9.6586 9.18985 9.42429 9.42417L1.42429 17.4242C1.18997 17.6585 0.810075 17.6585 0.57576 17.4242C0.341446 17.1899 0.341446 16.81 0.57576 16.5756L8.1515 8.9999L0.57576 1.42417C0.341446 1.18985 0.341446 0.809953 0.57576 0.575638Z"
        fill={color}
      />
    </Svg>
  </View>
);
