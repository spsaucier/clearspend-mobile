import React from 'react';
import { View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const ReceiptIcon = ({
  color = tw.color('white'),
  style,
  testID,
  size = 20,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <Circle cx={9} cy={9} r={8.5} fill="#003333" stroke="white" />
      <Path
        d="M5.78 13H6.86V9.532H9.32C11.492 9.532 10.676 12.64 11.048 13H12.212V12.928C11.756 12.784 12.464 9.388 10.532 9.016V8.992C11.432 8.776 12.092 7.96 12.092 6.892C12.092 5.308 11.108 4.42 9.224 4.42H5.78V13ZM6.86 5.38H9.008C10.46 5.38 11.012 5.932 11.012 6.916C11.012 7.984 10.28 8.572 8.972 8.572H6.86V5.38Z"
        fill={color}
      />
    </Svg>
  </View>
);
