import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

const aspectRatio = 24 / 17;

export const WalletSolidIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 17" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.84874 1.84874H22.1513V4.57143H1.84874V1.84874ZM0 1.14286C0 0.511674 0.511675 0 1.14286 0H22.8571C23.4883 0 24 0.511675 24 1.14286V5.71429V15.4286C24 16.0598 23.4883 16.5714 22.8571 16.5714H1.14286C0.511675 16.5714 0 16.0598 0 15.4286V5.71429V1.14286Z"
        fill={color}
      />
    </Svg>
  </View>
);
