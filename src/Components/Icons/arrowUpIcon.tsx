import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const ArrowUpIcon = ({
  color = tw.color('white'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fill={color}
        d="M 20.34375 12.785156 L 12.566406 3.820312 C 12.421875 3.65625 12.214844 3.5625 12 3.5625 C 11.78125 3.5625 11.574219 3.65625 11.433594 3.820312 L 3.65625 12.785156 C 3.609375 12.839844 3.597656 12.917969 3.628906 12.984375 C 3.65625 13.050781 3.722656 13.09375 3.796875 13.09375 L 5.695312 13.09375 C 5.804688 13.09375 5.90625 13.046875 5.980469 12.964844 L 11.109375 7.050781 L 11.109375 20.25 C 11.109375 20.351562 11.195312 20.4375 11.296875 20.4375 L 12.703125 20.4375 C 12.804688 20.4375 12.890625 20.351562 12.890625 20.25 L 12.890625 7.050781 L 18.019531 12.964844 C 18.089844 13.046875 18.195312 13.09375 18.304688 13.09375 L 20.203125 13.09375 C 20.363281 13.09375 20.449219 12.90625 20.34375 12.785156 Z M 20.34375 12.785156"
      />
    </Svg>
  </View>
);
