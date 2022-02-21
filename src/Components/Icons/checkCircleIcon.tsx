import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const CheckCircleIcon = ({
  color = tw.color('white'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5ZM10 3.75C6.54822 3.75 3.75 6.54822 3.75 10C3.75 13.4518 6.54822 16.25 10 16.25C13.4518 16.25 16.25 13.4518 16.25 10C16.25 6.54822 13.4518 3.75 10 3.75ZM9.06191 11.303L12.6503 7.70498C12.8941 7.46057 13.2898 7.46004 13.5342 7.70379C13.7515 7.92046 13.776 8.25721 13.6076 8.50102L13.5354 8.58768L9.50503 12.6288C9.28816 12.8463 8.95103 12.8707 8.7072 12.7018L8.62056 12.6294L6.43306 10.4419C6.18898 10.1979 6.18898 9.80214 6.43306 9.55806C6.65002 9.3411 6.9868 9.31699 7.23038 9.48574L7.31694 9.55806L9.06191 11.303Z"
        fill={color}
      />
    </Svg>
  </View>
);
