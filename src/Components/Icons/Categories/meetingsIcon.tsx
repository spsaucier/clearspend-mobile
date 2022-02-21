import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const MeetingsIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M30.0897 15.2231L27 16.7679L23 9.10768L26.1212 7.5471C26.3557 7.42986 26.6268 7.40939 26.8763 7.4901C27.1257 7.57082 27.3335 7.74626 27.4548 7.97866L30.5289 13.8658C30.5904 13.9835 30.6278 14.1123 30.639 14.2446C30.6501 14.377 30.6348 14.5102 30.5939 14.6365C30.553 14.7629 30.4874 14.8798 30.4008 14.9805C30.3142 15.0812 30.2085 15.1637 30.0897 15.2231V15.2231Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.99998 16.634L1.91027 15.0891C1.79149 15.0297 1.68573 14.9473 1.59916 14.8466C1.51259 14.7459 1.44694 14.6289 1.40606 14.5026C1.36517 14.3762 1.34986 14.243 1.36102 14.1107C1.37218 13.9783 1.40959 13.8495 1.47106 13.7318L4.54517 7.84469C4.66652 7.6123 4.87429 7.43685 5.12372 7.35613C5.37316 7.27541 5.64432 7.29588 5.87881 7.41313L8.99998 8.97371L4.99998 16.634Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27 16.7679L25 19.1077L20.4004 23.7073C20.2783 23.8294 20.1266 23.9178 19.9602 23.9639C19.7938 24.01 19.6182 24.0123 19.4507 23.9704L12.2061 22.1592C12.0702 22.1252 11.943 22.0631 11.8326 21.9768L5 16.634"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25 19.1077L19.5 15.1077L17.9 16.3077C17.2076 16.827 16.3655 17.1077 15.5 17.1077C14.6345 17.1077 13.7924 16.827 13.1 16.3077L12.4224 15.7995C12.3078 15.7135 12.213 15.6039 12.1444 15.4781C12.0758 15.3523 12.0351 15.2133 12.0249 15.0704C12.0148 14.9274 12.0354 14.784 12.0855 14.6498C12.1356 14.5156 12.214 14.3937 12.3153 14.2924L17.2071 9.40056C17.3 9.3077 17.4102 9.23404 17.5315 9.18379C17.6528 9.13353 17.7829 9.10767 17.9142 9.10767H23"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.07178 8.97369L15.4868 7.1035C15.7159 7.0367 15.9614 7.05406 16.1789 7.15246L20.5 9.10767"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 26.6077L10.2326 25.6658C10.0797 25.6276 9.938 25.5538 9.81907 25.4504L7 23"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
