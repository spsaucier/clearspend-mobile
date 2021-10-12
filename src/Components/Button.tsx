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
import { ActivityIndicator } from '@/Components/ActivityIndicator';

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
  small?: boolean;
  loading?: boolean;
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
  small = false,
  loading = false,
}: Props) => {
  const renderChildren = () => {
    if (loading) {
      return <ActivityIndicator color={tw.color('white')} style={tw`w-6`} />;
    }
    if (_.isString(children) || label) {
      return (
        <Text
          style={[
            tw.style(
              'text-base font-semibold',
              disabled ? 'text-primary-highlight' : 'text-primary-light',
            ),
            textStyle,
          ]}
        >
          {label || children}
        </Text>
      );
    }
    return children;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw.style(
          'flex-row p-3 rounded-2xl items-center justify-center',
          small ? 'h-12' : 'h-16 flex w-full',
          disabled ? 'bg-primary-light' : 'bg-white',
        ),
        containerStyle,
      ]}
      disabled={disabled || loading}
      testID={testID}
      onLayout={onLayout}
      activeOpacity={activeOpacity}
    >
      {renderChildren()}
    </TouchableOpacity>
  );
};
