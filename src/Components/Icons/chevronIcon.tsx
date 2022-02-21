import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const ChevronIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.5 11.9775C15.5 11.7256 15.4004 11.5088 15.207 11.3154L10.707 6.92676C10.5547 6.77441 10.3672 6.69238 10.1445 6.69238C9.6875 6.69238 9.32422 7.05566 9.32422 7.50684C9.32422 7.72949 9.41211 7.94043 9.57617 8.10449L13.5605 11.9717L9.57617 15.8447C9.41797 16.0088 9.32422 16.2139 9.32422 16.4424C9.32422 16.8936 9.6875 17.2568 10.1445 17.2568C10.3672 17.2568 10.5547 17.1748 10.7129 17.0225L15.207 12.6338C15.4063 12.4287 15.5 12.2236 15.5 11.9775Z"
        fill={color}
      />
    </Svg>
  </View>
);
