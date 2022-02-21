import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const EntertainmentIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M19 13.5H23"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 13.5H13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 11.5V15.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.5023 6.96747L10.5005 6.99999C8.97233 7.00011 7.49298 7.53852 6.3222 8.52073C5.15141 9.50293 4.36402 10.8662 4.09823 12.3711L4.0993 12.3713L2.05375 22.8916C1.92454 23.6247 2.03239 24.3798 2.36163 25.0474C2.69086 25.715 3.22434 26.2602 3.88458 26.6039C4.54482 26.9476 5.29744 27.0719 6.03313 26.9587C6.76882 26.8455 7.44927 26.5008 7.97566 25.9745L7.97545 25.9743L13.3799 20L21.5023 19.9675C23.2262 19.9675 24.8795 19.2826 26.0985 18.0637C27.3175 16.8447 28.0023 15.1914 28.0023 13.4675C28.0023 11.7436 27.3175 10.0903 26.0985 8.87127C24.8795 7.65229 23.2262 6.96747 21.5023 6.96747V6.96747Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.9035 12.3387L29.9474 22.8916C30.0766 23.6247 29.9688 24.3798 29.6395 25.0474C29.3103 25.715 28.7768 26.2602 28.1166 26.6039C27.4563 26.9476 26.7037 27.0719 25.968 26.9587C25.2323 26.8455 24.5519 26.5008 24.0255 25.9745L24.0257 25.9743L18.625 19.979"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
