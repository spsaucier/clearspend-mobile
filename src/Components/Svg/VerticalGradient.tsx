import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

type Props = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
  inverted?: boolean;
  color?: string;
  height?: number;
};

/**
 * @deprecated Prefer react-native-linear-gradient
 */
export const VerticalGradient = ({
  style,
  testID,
  inverted,
  color = 'white',
  height = 80,
}: Props) => {
  const opaque = <Stop stopColor={color} stopOpacity={1} />;
  const transparent = <Stop stopColor={color} offset={1} stopOpacity={0} />;

  const top = inverted ? opaque : transparent;
  const bottom = inverted ? transparent : opaque;

  return (
    <View style={[{ width: '100%' }, style]} pointerEvents="none">
      <Svg width="100%" height={height} fill="none" testID={testID}>
        <Rect opacity={1} width="100%" height={height} fill="url(#paint0_linear_976_10116)" />
        <Defs>
          <LinearGradient
            id="paint0_linear_976_10116"
            x1={187.5}
            y1={!inverted ? 0 : height}
            x2={187.5}
            y2={!inverted ? height : 0}
            gradientUnits="userSpaceOnUse"
          >
            {top}
            {bottom}
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};
