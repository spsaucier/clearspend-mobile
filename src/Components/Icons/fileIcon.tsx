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

export const FileIcon = ({ color = tw.color('black'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.7501 21H5.24933C5.05042 21 4.85965 20.921 4.719 20.7803C4.57835 20.6397 4.49933 20.4489 4.49933 20.25V3.75C4.49933 3.55109 4.57835 3.36032 4.719 3.21967C4.85965 3.07902 5.05042 3 5.24933 3H14.2501L19.5001 8.25V20.25C19.5001 20.3485 19.4807 20.446 19.443 20.537C19.4053 20.628 19.35 20.7107 19.2804 20.7803C19.2107 20.85 19.1281 20.9052 19.0371 20.9429C18.9461 20.9806 18.8486 21 18.7501 21Z"
        stroke={color}
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.25 3V8.25H19.5007"
        stroke={color}
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.75 14.25H14.25"
        stroke={color}
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12V16.5"
        stroke={color}
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
