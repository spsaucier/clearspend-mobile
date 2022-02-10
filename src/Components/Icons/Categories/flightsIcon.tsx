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

export const FlightsIcon = ({ color = tw.color('black'), style, testID, size = 32 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M26.1924 10.0503L21.9859 14L25.9859 25L22.9859 28L17.0099 19.2526L13.9859 22V25L10.9859 28L9.21184 22.7682L3.9859 21L6.9859 18H9.9859L12.9859 15L3.9859 9.00001L6.9859 6.00001L17.9859 10L21.9497 5.80762L21.8646 5.87869C22.143 5.59961 22.4738 5.37816 22.8379 5.22699C23.202 5.07582 23.5923 4.9979 23.9866 4.99768C24.3808 4.99746 24.7712 5.07496 25.1355 5.22573C25.4998 5.3765 25.8308 5.59759 26.1096 5.87636C26.3883 6.15513 26.6094 6.48612 26.7602 6.85039C26.911 7.21467 26.9884 7.60509 26.9882 7.99933C26.988 8.39357 26.9101 8.78391 26.7589 9.14802C26.6078 9.51212 26.3863 9.84287 26.1072 10.1213L26.1924 10.0503Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
