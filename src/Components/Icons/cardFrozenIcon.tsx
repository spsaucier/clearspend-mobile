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

export const CardFrozenIcon = ({ color = tw.color('error'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.0431 15.647H15.3891C14.9907 15.647 14.7207 15.377 14.7207 14.9989V13.75C14.7207 13.3652 14.9907 13.1019 15.3891 13.1019H17.0431C17.4346 13.1019 17.7047 13.3652 17.7047 13.75V14.9989C17.7047 15.377 17.4346 15.647 17.0431 15.647Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.64989 8.29453L20.2062 8.28614C20.0907 7.35566 19.7558 6.73041 19.3111 6.31745C18.7461 5.79279 17.885 5.5 16.7143 5.5H8.14286C6.97211 5.5 6.11107 5.79279 5.54605 6.31745C5.1 6.73165 4.76441 7.35942 4.64989 8.29453ZM20.25 9.78612L4.60714 9.79455V12.988C5.1576 12.7211 5.77554 12.5714 6.42857 12.5714C8.73707 12.5714 10.6071 14.4415 10.6071 16.75C10.6071 17.0802 10.5682 17.4035 10.4939 17.7143H16.7143C17.885 17.7143 18.7461 17.4215 19.3111 16.8968C19.866 16.3815 20.25 15.5356 20.25 14.1786V9.78612ZM9.79706 19.2143H16.7143C18.115 19.2143 19.3968 18.8642 20.3318 17.996C21.2768 17.1185 21.75 15.8215 21.75 14.1786V9.03571C21.75 7.39276 21.2768 6.09581 20.3318 5.21826C19.3968 4.35006 18.115 4 16.7143 4H8.14286C6.74217 4 5.46036 4.35006 4.52538 5.21826C3.58033 6.09581 3.10714 7.39276 3.10714 9.03571V14.2136C2.5694 14.9168 2.25 15.796 2.25 16.75C2.25 17.5314 2.46832 18.2741 2.85564 18.9043C3.57795 20.1146 4.90517 20.9286 6.42857 20.9286C7.81792 20.9286 9.0441 20.2515 9.79706 19.2143ZM6.42857 14.0714C4.9485 14.0714 3.75 15.2699 3.75 16.75C3.75 17.2157 3.87083 17.6558 4.08374 18.0342L7.7171 14.4008C7.33487 14.1908 6.89575 14.0714 6.42857 14.0714ZM8.77776 15.4615L5.14042 19.0988C5.52121 19.3089 5.96006 19.4286 6.42857 19.4286C7.40587 19.4286 8.25416 18.9077 8.7154 18.1323L8.72153 18.122C8.96654 17.7247 9.10714 17.2522 9.10714 16.75C9.10714 16.2828 8.98774 15.8437 8.77776 15.4615Z"
        fill={color}
      />
    </Svg>
  </View>
);