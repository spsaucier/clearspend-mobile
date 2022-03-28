import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const TravelIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M26.1924 10.0502L21.9859 14L25.9859 25L22.9859 28L17.0099 19.2526L13.9859 22V25L10.9859 28L9.21184 22.7682L3.9859 21L6.9859 18H9.9859L12.9859 15L3.9859 9L6.9859 6L17.9859 10L21.9497 5.80761L21.8646 5.87868C22.143 5.5996 22.4738 5.37814 22.8379 5.22697C23.202 5.0758 23.5923 4.99788 23.9866 4.99767C24.3808 4.99745 24.7712 5.07494 25.1355 5.22571C25.4998 5.37648 25.8308 5.59757 26.1096 5.87635C26.3883 6.15512 26.6094 6.4861 26.7602 6.85038C26.911 7.21465 26.9884 7.60507 26.9882 7.99932C26.988 8.39356 26.9101 8.78389 26.7589 9.148C26.6078 9.51211 26.3863 9.84285 26.1072 10.1213L26.1924 10.0502Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
