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
  size = 24,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C8.68629 4 6 6.68629 6 10V11.8323L4.07139 15.9307C3.96206 16.163 3.97918 16.4351 4.11675 16.6519C4.25433 16.8687 4.49324 17 4.75 17H8.12602C8.57006 18.7252 10.1362 20 12 20C13.8638 20 15.4299 18.7252 15.874 17H19.25C19.5068 17 19.7457 16.8687 19.8833 16.6519C20.0208 16.4351 20.0379 16.163 19.9286 15.9307L18 11.8323V10C18 6.68629 15.3137 4 12 4ZM9.43747 17H14.5625C14.1625 18.0243 13.166 18.75 12 18.75C10.834 18.75 9.8375 18.0243 9.43747 17ZM18.0682 15.5L16.5714 12.3193C16.5244 12.2194 16.5 12.1104 16.5 12V10C16.5 7.51472 14.4853 5.5 12 5.5C9.51472 5.5 7.5 7.51472 7.5 10V12C7.5 12.1104 7.47563 12.2194 7.42862 12.3193L5.93184 15.5H18.0682Z"
        fill={color}
      />
    </Svg>
  </View>
);
