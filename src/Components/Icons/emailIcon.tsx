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

export const EmailIcon = ({ color = tw.color('white'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 7.75C4 6.23122 5.23122 5 6.75 5H17.25C18.7688 5 20 6.23122 20 7.75V16.25C20 17.7688 18.7688 19 17.25 19H6.75C5.23122 19 4 17.7688 4 16.25V7.75ZM5.52111 7.52002C5.50725 7.59456 5.5 7.67144 5.5 7.75V16.25C5.5 16.9404 6.05964 17.5 6.75 17.5H17.25C17.9404 17.5 18.5 16.9404 18.5 16.25V7.75C18.5 7.67143 18.4928 7.59456 18.4789 7.52002L12.4969 12.8117C12.2132 13.0628 11.7868 13.0628 11.5031 12.8117L5.52111 7.52002ZM6.63759 6.50499L12 11.2487L17.3624 6.50499C17.3254 6.50169 17.2879 6.5 17.25 6.5H6.75C6.71211 6.5 6.67462 6.50169 6.63759 6.50499Z"
        fill={color}
      />
    </Svg>
  </View>
);
