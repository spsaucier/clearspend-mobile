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

export const MaintenanceIcon = ({ color = tw.color('black'), style, testID, size = 32 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M23.1239 4.63345L17.8787 9.87869L18.5858 13.4142L22.1213 14.1213L27.3666 8.87609L27.3671 8.87588C28.0163 10.4084 28.1716 12.1052 27.8113 13.7302C27.451 15.3551 26.593 16.8272 25.3569 17.9417C24.1207 19.0562 22.5678 19.7575 20.9144 19.9481C19.261 20.1387 17.5892 19.8091 16.1319 19.0051L16.1321 19.0048L9.12133 27.1213C8.55861 27.6834 7.79572 27.999 7.00037 27.9988C6.20501 27.9986 5.4423 27.6825 4.8799 27.1201C4.3175 26.5577 4.00145 25.795 4.00122 24.9997C4.00099 24.2043 4.31661 23.4414 4.87869 22.8787L12.9951 15.868L12.9949 15.8681C12.1909 14.4108 11.8613 12.7391 12.0519 11.0856C12.2425 9.43219 12.9438 7.87931 14.0583 6.64315C15.1728 5.40698 16.6449 4.54904 18.2699 4.18874C19.8948 3.82844 21.5916 3.98371 23.1241 4.63294L23.1239 4.63345Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
