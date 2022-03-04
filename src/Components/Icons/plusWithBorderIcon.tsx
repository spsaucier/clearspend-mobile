import React from 'react';
import { View } from 'react-native';
import { Mask, Path, Rect, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const PlusWithBorderIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 16,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 11 12" fill="none">
      <Mask id="path-1-outside-1_2773_14216" x={0} y={0.5} width={11} height={11} fill="black">
        <Rect fill="white" y={0.5} width={11} height={11} />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 2C6 1.72386 5.77614 1.5 5.5 1.5C5.22386 1.5 5 1.72386 5 2V5.5H1.5C1.22386 5.5 1 5.72386 1 6C1 6.27614 1.22386 6.5 1.5 6.5H5V10C5 10.2761 5.22386 10.5 5.5 10.5C5.77614 10.5 6 10.2761 6 10V6.5H9.5C9.77614 6.5 10 6.27614 10 6C10 5.72386 9.77614 5.5 9.5 5.5H6V2Z"
        />
      </Mask>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C6 1.72386 5.77614 1.5 5.5 1.5C5.22386 1.5 5 1.72386 5 2V5.5H1.5C1.22386 5.5 1 5.72386 1 6C1 6.27614 1.22386 6.5 1.5 6.5H5V10C5 10.2761 5.22386 10.5 5.5 10.5C5.77614 10.5 6 10.2761 6 10V6.5H9.5C9.77614 6.5 10 6.27614 10 6C10 5.72386 9.77614 5.5 9.5 5.5H6V2Z"
        fill={color}
      />
      <Path
        d="M5 5.5V6.5C5.55228 6.5 6 6.05228 6 5.5H5ZM5 6.5H6C6 5.94772 5.55228 5.5 5 5.5V6.5ZM6 6.5V5.5C5.44772 5.5 5 5.94772 5 6.5H6ZM6 5.5H5C5 6.05228 5.44772 6.5 6 6.5V5.5ZM5.5 2.5C5.22386 2.5 5 2.27614 5 2H7C7 1.17157 6.32843 0.5 5.5 0.5V2.5ZM6 2C6 2.27614 5.77614 2.5 5.5 2.5V0.5C4.67157 0.5 4 1.17157 4 2H6ZM6 5.5V2H4V5.5H6ZM1.5 6.5H5V4.5H1.5V6.5ZM2 6C2 6.27614 1.77614 6.5 1.5 6.5V4.5C0.671573 4.5 0 5.17157 0 6H2ZM1.5 5.5C1.77614 5.5 2 5.72386 2 6H0C0 6.82843 0.671573 7.5 1.5 7.5V5.5ZM5 5.5H1.5V7.5H5V5.5ZM6 10V6.5H4V10H6ZM5.5 9.5C5.77614 9.5 6 9.72386 6 10H4C4 10.8284 4.67157 11.5 5.5 11.5V9.5ZM5 10C5 9.72386 5.22386 9.5 5.5 9.5V11.5C6.32843 11.5 7 10.8284 7 10H5ZM5 6.5V10H7V6.5H5ZM9.5 5.5H6V7.5H9.5V5.5ZM9 6C9 5.72386 9.22386 5.5 9.5 5.5V7.5C10.3284 7.5 11 6.82843 11 6H9ZM9.5 6.5C9.22386 6.5 9 6.27614 9 6H11C11 5.17157 10.3284 4.5 9.5 4.5V6.5ZM6 6.5H9.5V4.5H6V6.5ZM5 2V5.5H7V2H5Z"
        fill="white"
        mask="url(#path-1-outside-1_2773_14216)"
      />
    </Svg>
  </View>
);
