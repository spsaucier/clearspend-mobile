import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

type Props = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
  inverted?: boolean;
};

export const DarkToLightGradient = ({ style, testID, inverted }: Props) => {
  const darker = <Stop />;
  const lighter = <Stop offset="1" stopOpacity="0" />;

  const top = inverted ? darker : lighter;
  const bottom = inverted ? lighter : darker;

  return (
    <View style={[{ width: '100%' }, style]}>
      <Svg width="100%" height="207" fill="none" testID={testID}>
        <Rect opacity={0.8} width="100%" height="207" fill="url(#paint0_linear_976_10116)" />
        <Defs>
          <LinearGradient
            id="paint0_linear_976_10116"
            x1={187.5}
            y1={!inverted ? 0 : 207}
            x2={187.5}
            y2={!inverted ? 207 : 0}
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
