import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const OptionsIcon = ({
  color = tw.color('white'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.9375C12.5178 6.9375 12.9375 6.51777 12.9375 6C12.9375 5.48223 12.5178 5.0625 12 5.0625C11.4822 5.0625 11.0625 5.48223 11.0625 6C11.0625 6.51777 11.4822 6.9375 12 6.9375Z"
        fill={color}
      />
      <Path
        d="M12 12.9375C12.5178 12.9375 12.9375 12.5178 12.9375 12C12.9375 11.4822 12.5178 11.0625 12 11.0625C11.4822 11.0625 11.0625 11.4822 11.0625 12C11.0625 12.5178 11.4822 12.9375 12 12.9375Z"
        fill={color}
      />
      <Path
        d="M12 18.9375C12.5178 18.9375 12.9375 18.5178 12.9375 18C12.9375 17.4822 12.5178 17.0625 12 17.0625C11.4822 17.0625 11.0625 17.4822 11.0625 18C11.0625 18.5178 11.4822 18.9375 12 18.9375Z"
        fill={color}
      />
    </Svg>
  </View>
);
