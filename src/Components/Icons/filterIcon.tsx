import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type FilterIconProps = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
};

export const FilterIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: FilterIconProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.58065 4C7.00822 4 7.35484 4.34662 7.35484 4.77419V13.1504C8.40183 13.4792 9.16129 14.4574 9.16129 15.6129C9.16129 16.7684 8.40183 17.7466 7.35484 18.0754V19.2258C7.35484 19.6534 7.00822 20 6.58065 20C6.15307 20 5.80645 19.6534 5.80645 19.2258V18.0754C4.75946 17.7466 4 16.7684 4 15.6129C4 14.4574 4.75946 13.4792 5.80645 13.1504V4.77419C5.80645 4.34662 6.15307 4 6.58065 4ZM12 4C12.4276 4 12.7742 4.34662 12.7742 4.77419V5.92459C13.8212 6.25344 14.5806 7.23158 14.5806 8.3871C14.5806 9.54262 13.8212 10.5208 12.7742 10.8496V19.2258C12.7742 19.6534 12.4276 20 12 20C11.5724 20 11.2258 19.6534 11.2258 19.2258V10.8496C10.1788 10.5208 9.41935 9.54262 9.41935 8.3871C9.41935 7.23158 10.1788 6.25344 11.2258 5.92459V4.77419C11.2258 4.34662 11.5724 4 12 4ZM17.4194 4C17.8469 4 18.1935 4.34662 18.1935 4.77419V13.1504C19.2405 13.4792 20 14.4574 20 15.6129C20 16.7684 19.2405 17.7466 18.1935 18.0754V19.2258C18.1935 19.6534 17.8469 20 17.4194 20C16.9918 20 16.6452 19.6534 16.6452 19.2258V18.0754C15.5982 17.7466 14.8387 16.7684 14.8387 15.6129C14.8387 14.4574 15.5982 13.4792 16.6452 13.1504V4.77419C16.6452 4.34662 16.9918 4 17.4194 4ZM12 7.35484C11.4299 7.35484 10.9677 7.817 10.9677 8.3871C10.9677 8.9572 11.4299 9.41935 12 9.41935C12.5701 9.41935 13.0323 8.9572 13.0323 8.3871C13.0323 7.817 12.5701 7.35484 12 7.35484ZM6.58065 14.5806C6.01054 14.5806 5.54839 15.0428 5.54839 15.6129C5.54839 16.183 6.01054 16.6452 6.58065 16.6452C7.15075 16.6452 7.6129 16.183 7.6129 15.6129C7.6129 15.0428 7.15075 14.5806 6.58065 14.5806ZM17.4194 14.5806C16.8493 14.5806 16.3871 15.0428 16.3871 15.6129C16.3871 16.183 16.8493 16.6452 17.4194 16.6452C17.9895 16.6452 18.4516 16.183 18.4516 15.6129C18.4516 15.0428 17.9895 14.5806 17.4194 14.5806Z"
        fill={color}
      />
    </Svg>
  </View>
);