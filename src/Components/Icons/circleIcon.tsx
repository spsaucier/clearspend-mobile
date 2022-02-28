import React from 'react';
import { View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import { IconBaseProps } from '@/Components/Icons/types';

export const CircleIcon = ({ style, testID, size = 24 }: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Circle cx="8.5" cy="8.5" r="8.5" stroke="white" x={3.5} y={3.5} strokeWidth={1} />
    </Svg>
  </View>
);
