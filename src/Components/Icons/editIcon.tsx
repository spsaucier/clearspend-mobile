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

export const EditIcon = ({ color = tw.color('black'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.094 4.3141C12.6635 3.74458 13.5869 3.74459 14.1564 4.3141L15.6862 5.84392C16.2557 6.41343 16.2557 7.3368 15.6862 7.90631L7.94212 15.6504C7.85993 15.7326 7.75646 15.7902 7.64333 15.8168L4.10166 16.6502C3.89096 16.6997 3.66962 16.6368 3.51657 16.4837C3.36351 16.3307 3.30055 16.1093 3.35012 15.8986L4.18346 12.357C4.21008 12.2438 4.26772 12.1404 4.3499 12.0582L12.094 4.3141ZM13.2725 5.19798C13.1911 5.11662 13.0592 5.11662 12.9779 5.19798L5.35951 12.8163L4.79814 15.2022L7.18396 14.6408L14.8023 7.02243C14.8837 6.94107 14.8837 6.80916 14.8023 6.7278L13.2725 5.19798ZM10.8335 16.0418C10.8335 15.6966 11.1133 15.4168 11.4585 15.4168H16.0418C16.387 15.4168 16.6668 15.6966 16.6668 16.0418C16.6668 16.387 16.387 16.6668 16.0418 16.6668H11.4585C11.1133 16.6668 10.8335 16.387 10.8335 16.0418Z"
        fill={color}
      />
    </Svg>
  </View>
);
