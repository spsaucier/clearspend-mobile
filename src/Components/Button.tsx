import {
  LayoutChangeEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import _ from 'lodash';

import tw from '@/Styles/tailwind';

type Props = {
  label?: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  activeOpacity?: number;
  children?: ReactNode | string;
};

export const Button = ({
  label,
  onPress,
  textStyle,
  containerStyle,
  disabled,
  testID,
  onLayout,
  activeOpacity,
  children,
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[tw`flex-row p-3 rounded-xl bg-white items-center justify-center h-12`, containerStyle]}
    disabled={disabled}
    testID={testID}
    onLayout={onLayout}
    activeOpacity={activeOpacity}
  >
    {_.isString(children) || label ? (
      <Text style={[tw`text-black text-base`, textStyle]}>{label || children}</Text>
    ) : (
      children
    )}
  </TouchableOpacity>
);
