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

export const NotificationIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 16,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C4.68629 0 2 2.68629 2 6V7.83235L0.0713874 11.9307C-0.0379398 12.163 -0.0208246 12.4351 0.116752 12.6519C0.254328 12.8687 0.493242 13 0.750001 13H4.12602C4.57006 14.7252 6.13616 16 8 16C9.86384 16 11.4299 14.7252 11.874 13H15.25C15.5068 13 15.7457 12.8687 15.8833 12.6519C16.0208 12.4351 16.0379 12.163 15.9286 11.9307L14 7.83235V6C14 2.68629 11.3137 0 8 0ZM5.43747 13H10.5625C10.1625 14.0243 9.16599 14.75 8 14.75C6.83401 14.75 5.8375 14.0243 5.43747 13ZM14.0682 11.5L12.5714 8.31935C12.5244 8.21945 12.5 8.11041 12.5 8V6C12.5 3.51472 10.4853 1.5 8 1.5C5.51472 1.5 3.5 3.51472 3.5 6V8C3.5 8.11041 3.47563 8.21945 3.42862 8.31935L1.93184 11.5H14.0682Z"
        fill={color}
      />
    </Svg>
  </View>
);
