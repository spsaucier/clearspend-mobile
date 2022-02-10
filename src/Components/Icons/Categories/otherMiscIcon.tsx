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

export const OtherMiscIcon = ({ color = tw.color('black'), style, testID, size = 32 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M26.253 26.2531C28.4009 24.1052 25.5517 17.7735 19.8891 12.1109C14.2265 6.44832 7.89482 3.59908 5.74694 5.74696C3.59905 7.89484 6.44829 14.2265 12.1109 19.8891C17.7735 25.5517 24.1051 28.4009 26.253 26.2531Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.8891 19.8891C25.5517 14.2265 28.4009 7.89483 26.253 5.74694C24.1051 3.59906 17.7735 6.4483 12.1109 12.1109C6.44829 17.7735 3.59905 24.1052 5.74694 26.253C7.89482 28.4009 14.2265 25.5517 19.8891 19.8891Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 17.25C16.6904 17.25 17.25 16.6904 17.25 16C17.25 15.3096 16.6904 14.75 16 14.75C15.3096 14.75 14.75 15.3096 14.75 16C14.75 16.6904 15.3096 17.25 16 17.25Z"
        fill="black"
      />
    </Svg>
  </View>
);
