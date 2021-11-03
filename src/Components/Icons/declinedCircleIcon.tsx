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

export const DeclinedCircleIcon = ({
  color = tw.color('white'),
  style,
  testID,
  size = 24,
}: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <Path
        d="M6.84562 12.2464C6.60863 12.4785 6.60379 12.9041 6.85046 13.1508C7.09713 13.3974 7.52275 13.3877 7.7549 13.1556L9.99909 10.9116L12.2433 13.1508C12.4851 13.3926 12.9011 13.3974 13.1477 13.1459C13.3944 12.8993 13.3944 12.4834 13.1526 12.2416L10.9132 10.0024L13.1526 7.75843C13.3944 7.51662 13.3944 7.10071 13.1477 6.85407C12.9011 6.60259 12.4851 6.60742 12.2433 6.84923L9.99909 9.08838L7.7549 6.8444C7.52275 6.61226 7.09713 6.60259 6.85046 6.84923C6.60379 7.09588 6.60863 7.52146 6.84562 7.75843L9.08981 10.0024L6.84562 12.2464Z"
        fill={color}
      />
      <Path
        d="M10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5ZM10 3.75C6.54822 3.75 3.75 6.54822 3.75 10C3.75 13.4518 6.54822 16.25 10 16.25C13.4518 16.25 16.25 13.4518 16.25 10C16.25 6.54822 13.4518 3.75 10 3.75Z"
        fill={color}
      />
    </Svg>
  </View>
);
