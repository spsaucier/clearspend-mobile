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

export const NoteIcon = ({ color = tw.color('gray50'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.45817 4.58325C5.88287 4.58325 5.4165 5.04962 5.4165 5.62492V14.3749C5.4165 14.9502 5.88287 15.4166 6.45817 15.4166H13.5415C14.1168 15.4166 14.5832 14.9502 14.5832 14.3749V8.33325H11.4582C11.113 8.33325 10.8332 8.05343 10.8332 7.70825V4.58325H6.45817ZM12.0832 5.2588L13.9076 7.08325H12.0832V5.2588ZM4.1665 5.62492C4.1665 4.35927 5.19252 3.33325 6.45817 3.33325H11.6665C11.8323 3.33325 11.9912 3.3991 12.1084 3.51631L15.6501 7.05798C15.7673 7.17519 15.8332 7.33416 15.8332 7.49992V14.3749C15.8332 15.6406 14.8072 16.6666 13.5415 16.6666H6.45817C5.19252 16.6666 4.1665 15.6406 4.1665 14.3749V5.62492Z"
        fill={color}
      />
    </Svg>
  </View>
);
