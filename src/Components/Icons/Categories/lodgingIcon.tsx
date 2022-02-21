import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const LodgingIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M26.9985 27V14.4424C26.9985 14.303 26.9694 14.1652 26.9131 14.0378C26.8567 13.9104 26.7743 13.7962 26.6712 13.7024L16.6705 4.61054C16.4865 4.44318 16.2466 4.35046 15.9978 4.35046C15.749 4.35047 15.5092 4.44322 15.3251 4.61058L5.3258 13.7024C5.22272 13.7962 5.14036 13.9104 5.084 14.0378C5.02765 14.1652 4.99854 14.303 4.99854 14.4423V27"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.99854 27H29.9985"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.9978 26.999V19.999C18.9978 19.7337 18.8924 19.4794 18.7049 19.2919C18.5174 19.1043 18.263 18.999 17.9978 18.999H13.9978C13.7326 18.999 13.4782 19.1043 13.2907 19.2919C13.1032 19.4794 12.9978 19.7337 12.9978 19.999V26.999"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
