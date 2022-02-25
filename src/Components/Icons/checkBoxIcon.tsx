import React from 'react';
import { View } from 'react-native';
import { Rect, Svg } from 'react-native-svg';

import { IconBaseProps } from '@/Components/Icons/types';

export const CheckBoxIcon = ({ style, testID, size = 24 }: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Rect
        x={1}
        height={20}
        y={1}
        width={20}
        stroke="white"
        strokeOpacity={0.2}
        fill="none"
        rx={3}
        strokeWidth={1}
      />
    </Svg>
  </View>
);
