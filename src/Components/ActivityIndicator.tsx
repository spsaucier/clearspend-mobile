import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

import { useRotateAnimation } from '@/Hooks';

type Props = {
  color?: string;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const ActivityIndicator = ({
  color = tw.color('primary'),
  bgColor = tw.color('white'),
  style,
}: Props) => {
  const [interpolatedRotate] = useRotateAnimation();

  const loadingCircle = () => (
    <Svg width="100%" height="100%" viewBox="0 0 52 52" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26 1.5C12.469 1.5 1.5 12.469 1.5 26C1.5 39.531 12.469 50.5 26 50.5C39.531 50.5 50.5 39.531 50.5 26C50.5 12.469 39.531 1.5 26 1.5ZM0.5 26C0.5 11.9167 11.9167 0.5 26 0.5C40.0833 0.5 51.5 11.9167 51.5 26C51.5 40.0833 40.0833 51.5 26 51.5C11.9167 51.5 0.5 40.0833 0.5 26Z"
        fill={bgColor}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M51 25.5C51.2761 25.5 51.5 25.7239 51.5 26C51.5 40.0833 40.0833 51.5 26 51.5C25.7239 51.5 25.5 51.2761 25.5 51C25.5 50.7239 25.7239 50.5 26 50.5C39.531 50.5 50.5 39.531 50.5 26C50.5 25.7239 50.7239 25.5 51 25.5Z"
        fill={color}
      />
    </Svg>
  );

  return (
    <View style={[tw`w-16`, { aspectRatio: 1 }, style]}>
      <Animated.View
        style={{
          transform: [
            {
              rotate: interpolatedRotate,
            },
          ],
        }}
      >
        {loadingCircle()}
      </Animated.View>
    </View>
  );
};
