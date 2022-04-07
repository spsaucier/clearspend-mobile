import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { IconBaseProps } from './types';
import tw from '@/Styles/tailwind';

export const QuestionMarkCircleFilledIcon = ({
  color = tw.color('white'),
  style,
  testID,
  size = 20,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
      <Path
        d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
        fill={color}
      />
      <Path
        d="M19.0115 23.3867H20.4768C20.4768 20.9779 21.3601 20.3958 22.5243 19.4322C23.528 18.6092 24.6923 17.7661 24.6923 15.9795C24.6923 13.8116 23.0061 12.3864 20.4768 12.3864C17.4457 12.3864 15.8398 14.4539 15.8398 17.1438H17.2851C17.2851 14.7149 18.6903 13.6911 20.5371 13.6911C22.2433 13.6911 23.2269 14.6145 23.2269 15.9996C23.2269 17.3646 22.3437 17.9668 21.3801 18.7899C20.0754 19.8738 19.0115 20.7571 19.0115 23.3867ZM18.9713 25.3138V27H20.6575V25.3138H18.9713Z"
        fill="#003333"
      />
    </Svg>
  </View>
);
