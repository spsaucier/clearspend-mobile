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

export const WarningIcon = ({ color = tw.color('primary'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0627 5.07977C11.7015 3.97341 13.2983 3.97341 13.9371 5.07977L21.0262 17.3585C21.665 18.4648 20.8665 19.8478 19.589 19.8478H5.41079C4.13328 19.8478 3.33484 18.4648 3.97359 17.3585L11.0627 5.07977ZM12.6381 5.82977C12.5767 5.72341 12.4231 5.72341 12.3617 5.82977L5.27263 18.1085C5.21122 18.2148 5.28798 18.3478 5.41079 18.3478H19.589C19.7118 18.3478 19.7886 18.2148 19.7272 18.1085L12.6381 5.82977ZM12.4999 8.69445C12.9141 8.69445 13.2499 9.03023 13.2499 9.44445V13C13.2499 13.4142 12.9141 13.75 12.4999 13.75C12.0857 13.75 11.7499 13.4142 11.7499 13V9.44445C11.7499 9.03023 12.0857 8.69445 12.4999 8.69445ZM11.7499 16.1111C11.7499 15.6969 12.0857 15.3611 12.4999 15.3611H12.5088C12.923 15.3611 13.2588 15.6969 13.2588 16.1111C13.2588 16.5253 12.923 16.8611 12.5088 16.8611H12.4999C12.0857 16.8611 11.7499 16.5253 11.7499 16.1111Z"
        fill={color}
      />
    </Svg>
  </View>
);
