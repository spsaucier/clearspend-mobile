import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const SuspensionPointsIcon = ({
  color = tw.color('primary'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.4444 12.4482C16.4444 13.43 17.2404 14.226 18.2222 14.226C19.2041 14.226 20 13.43 20 12.4482C20 11.4663 19.2041 10.6704 18.2222 10.6704C17.2404 10.6704 16.4444 11.4663 16.4444 12.4482Z"
        fill={color}
      />
      <Path
        d="M10.2222 12.4482C10.2222 13.43 11.0182 14.226 12 14.226C12.9818 14.226 13.7778 13.43 13.7778 12.4482C13.7778 11.4663 12.9818 10.6704 12 10.6704C11.0182 10.6704 10.2222 11.4663 10.2222 12.4482Z"
        fill={color}
      />
      <Path
        d="M5.77778 14.226C4.79594 14.226 4 13.43 4 12.4482C4 11.4663 4.79594 10.6704 5.77778 10.6704C6.75962 10.6704 7.55556 11.4663 7.55556 12.4482C7.55556 13.43 6.75962 14.226 5.77778 14.226Z"
        fill={color}
      />
    </Svg>
  </View>
);
