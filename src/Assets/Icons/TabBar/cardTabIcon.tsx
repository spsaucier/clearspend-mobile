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

export const CardTabIcon = ({ color = tw.color('primary'), style, testID, size = 20 }: Props) => (
  <View style={[{ aspectRatio: 22 / 24, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 22 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.73913 6C2.33679 6 2 6.3299 2 6.75V17.25C2 17.6701 2.33679 18 2.73913 18H19.2609C19.6632 18 20 17.6701 20 17.25V6.75C20 6.3299 19.6632 6 19.2609 6H2.73913ZM0 6.75C0 5.2371 1.22049 4 2.73913 4H19.2609C20.7795 4 22 5.2371 22 6.75V17.25C22 18.7629 20.7795 20 19.2609 20H2.73913C1.22049 20 0 18.7629 0 17.25V6.75Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21 17L1 17L1 15L21 15L21 17Z"
        fill={color}
      />
      <Path
        d="M11.5106 8.43733L9.17109 7.14933C8.9947 7.056 8.80902 7 8.61406 7C7.99204 7 7.49072 7.48533 7.49072 8.08267V8.21333C7.49072 8.36267 7.57427 8.512 7.71353 8.58667L8.15915 8.82933C8.25199 8.876 8.3634 8.876 8.44695 8.82933C8.5305 8.78267 8.58621 8.68933 8.58621 8.58667V8.26C8.58621 8.204 8.63263 8.16667 8.64191 8.15733C8.68833 8.12933 8.73475 8.12933 8.78117 8.15733L10.805 9.27733C10.8422 9.296 10.87 9.33333 10.87 9.38C10.87 9.42667 10.8515 9.464 10.805 9.48267L8.78117 10.6027C8.73475 10.6307 8.68833 10.6307 8.64191 10.6027C8.62334 10.5933 8.58621 10.556 8.58621 10.5V10.3227C8.58621 9.94 8.39125 9.604 8.05703 9.39867C7.70424 9.184 7.2679 9.184 6.90584 9.38L4.56631 10.6867C4.21353 10.8827 4 11.228 4 11.62C4 12.012 4.21353 12.3667 4.56631 12.5533L6.90584 13.8507C7.08223 13.944 7.2679 14 7.46286 14C8.08488 14 8.58621 13.5147 8.58621 12.9173V12.7867C8.58621 12.6373 8.50265 12.488 8.3634 12.4133L7.91777 12.1707C7.82493 12.124 7.71353 12.124 7.62997 12.1707C7.54642 12.2173 7.49072 12.3107 7.49072 12.4133V12.74C7.49072 12.796 7.4443 12.8333 7.43501 12.8427C7.38859 12.8707 7.34218 12.8707 7.29576 12.8427L5.27188 11.7227C5.23475 11.704 5.2069 11.6667 5.2069 11.62C5.2069 11.5733 5.23475 11.536 5.27188 11.5173L7.29576 10.3973C7.34218 10.3693 7.38859 10.3787 7.43501 10.3973C7.45358 10.4067 7.49072 10.444 7.49072 10.5V10.6773C7.49072 11.06 7.68568 11.396 8.01989 11.6013C8.37268 11.816 8.80902 11.816 9.17109 11.62L11.5106 10.3227C11.8634 10.1267 12.0769 9.78133 12.0769 9.38933C12.0769 8.988 11.8634 8.63333 11.5106 8.43733Z"
        fill={color}
      />
    </Svg>
  </View>
);
