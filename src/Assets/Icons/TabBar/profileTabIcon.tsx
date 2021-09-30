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

export const ProfileTabIcon = ({
  color = tw.color('primary'),
  style,
  testID,
  size = 20,
}: Props) => (
  <View style={[{ aspectRatio: 18 / 22, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 18 22" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 5C6 3.34315 7.34315 2 9 2C10.6569 2 12 3.34315 12 5C12 6.65685 10.6569 8 9 8C7.34315 8 6 6.65685 6 5ZM9 0C6.23858 0 4 2.23858 4 5C4 7.76142 6.23858 10 9 10C11.7614 10 14 7.76142 14 5C14 2.23858 11.7614 0 9 0ZM4.05025 15.4789C5.36301 14.1661 7.14349 13.4286 9 13.4286C10.8565 13.4286 12.637 14.1661 13.9497 15.4789C15.0245 16.5536 15.7137 17.9418 15.9282 19.4286H2.07177C2.28635 17.9418 2.97552 16.5536 4.05025 15.4789ZM9 11.4286C6.61305 11.4286 4.32387 12.3768 2.63604 14.0647C0.948212 15.7525 0 18.0417 0 20.4286C0 20.6938 0.105357 20.9482 0.292893 21.1357C0.48043 21.3233 0.734784 21.4286 1 21.4286H17C17.2652 21.4286 17.5196 21.3233 17.7071 21.1357C17.8946 20.9482 18 20.6938 18 20.4286C18 18.0417 17.0518 15.7525 15.364 14.0647C13.6761 12.3768 11.3869 11.4286 9 11.4286Z"
        fill={color}
      />
    </Svg>
  </View>
);
