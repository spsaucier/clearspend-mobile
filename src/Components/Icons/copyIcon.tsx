import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
};

export const CopyIcon = ({ color = tw.color('white'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 6.75C4 5.23122 5.23122 4 6.75 4H13.5C14.8807 4 16 5.11929 16 6.5C16 6.91421 15.6642 7.25 15.25 7.25C14.8358 7.25 14.5 6.91421 14.5 6.5C14.5 5.94772 14.0523 5.5 13.5 5.5H6.75C6.05964 5.5 5.5 6.05964 5.5 6.75V13.5C5.5 14.0523 5.94772 14.5 6.5 14.5C6.91421 14.5 7.25 14.8358 7.25 15.25C7.25 15.6642 6.91421 16 6.5 16C5.11929 16 4 14.8807 4 13.5V6.75ZM8 10.75C8 9.23122 9.23122 8 10.75 8H17.25C18.7688 8 20 9.23122 20 10.75V17.25C20 18.7688 18.7688 20 17.25 20H10.75C9.23122 20 8 18.7688 8 17.25V10.75ZM10.75 9.5C10.0596 9.5 9.5 10.0596 9.5 10.75V17.25C9.5 17.9404 10.0596 18.5 10.75 18.5H17.25C17.9404 18.5 18.5 17.9404 18.5 17.25V10.75C18.5 10.0596 17.9404 9.5 17.25 9.5H10.75Z"
        fill={color}
      />
    </Svg>
  </View>
);
