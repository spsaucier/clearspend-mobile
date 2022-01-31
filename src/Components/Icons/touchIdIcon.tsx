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

export const TouchIdIcon = ({ color = tw.color('primary'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
      <Path
        d="M7.12817 26.0047C8.36388 23.518 9.00498 20.7782 9.0009 18.0014C8.99963 16.6519 9.30237 15.3196 9.88665 14.1032C10.4709 12.8869 11.3217 11.8178 12.3759 10.9753"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.0009 18.0012C18.0079 22.5756 16.8475 27.076 14.6293 31.0766"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.5009 18.0012C13.5009 16.8077 13.975 15.6632 14.8189 14.8192C15.6628 13.9753 16.8074 13.5012 18.0009 13.5012C19.1943 13.5012 20.3389 13.9753 21.1828 14.8192C22.0267 15.6632 22.5009 16.8077 22.5009 18.0012C22.5074 22.6396 21.4856 27.2217 19.509 31.4177"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M30.7357 25.8762C31.2459 23.2823 31.5022 20.6448 31.5009 18.0012C31.5009 14.4208 30.0785 10.987 27.5468 8.45528C25.0151 5.92354 21.5813 4.50122 18.0009 4.50122C14.4204 4.50122 10.9867 5.92354 8.45491 8.45528C5.92317 10.987 4.50085 14.4208 4.50085 18.0012C4.50253 19.534 4.24274 21.0558 3.73267 22.5013"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.0508 22.5012C12.5705 24.8668 11.7103 27.1389 10.5034 29.2294"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.8759 9.07085C18.1426 8.91242 19.4285 9.02507 20.6484 9.40134C21.8683 9.7776 22.9943 10.4089 23.9517 11.2533C24.9091 12.0978 25.6761 13.1361 26.2018 14.2995C26.7275 15.4628 26.9998 16.7246 27.0009 18.0012C27.0012 19.5055 26.9082 21.0084 26.7223 22.5011"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M25.8668 27.0012C25.6526 27.8336 25.4097 28.6539 25.1382 29.4622"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);
