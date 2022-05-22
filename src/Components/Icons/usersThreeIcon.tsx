import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const UsersThreeIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 22.5C18.7614 22.5 21 20.2614 21 17.5C21 14.7386 18.7614 12.5 16 12.5C13.2386 12.5 11 14.7386 11 17.5C11 20.2614 13.2386 22.5 16 22.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.5 14.5C25.6645 14.499 26.8131 14.7696 27.8547 15.2903C28.8963 15.811 29.8021 16.5674 30.5001 17.4995"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.49963 17.4997C2.19769 16.5676 3.10351 15.8111 4.14513 15.2904C5.18675 14.7697 6.33546 14.499 7.49999 14.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.80426 26.9999C9.46116 25.6506 10.4842 24.5133 11.7565 23.7176C13.0289 22.9219 14.4993 22.5 16 22.5C17.5006 22.5 18.971 22.9219 20.2434 23.7176C21.5157 24.5132 22.5388 25.6506 23.1957 26.9998"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.49999 14.5C6.74103 14.4999 5.99779 14.2838 5.35703 13.8771C4.71627 13.4703 4.20445 12.8897 3.88134 12.2029C3.55823 11.5162 3.43716 10.7517 3.53227 9.99874C3.62737 9.24577 3.93474 8.5354 4.41846 7.95057C4.90218 7.36575 5.5423 6.93061 6.26407 6.69597C6.98584 6.46133 7.75947 6.43687 8.49462 6.62544C9.22978 6.81402 9.89611 7.20786 10.4158 7.76096C10.9355 8.31406 11.2871 9.0036 11.4296 9.74905"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.5704 9.74913C20.7128 9.00355 21.0644 8.31388 21.5841 7.76066C22.1038 7.20744 22.7702 6.8135 23.5054 6.62485C24.2407 6.4362 25.0144 6.46062 25.7363 6.69527C26.4582 6.92991 27.0984 7.3651 27.5822 7.95C28.066 8.5349 28.3734 9.24537 28.4685 9.99844C28.5636 10.7515 28.4425 11.5161 28.1193 12.2029C27.7961 12.8897 27.2842 13.4704 26.6433 13.8772C26.0024 14.2839 25.2591 14.4999 24.5 14.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
