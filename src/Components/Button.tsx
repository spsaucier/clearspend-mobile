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
  theme?: 'primary' | 'dark';
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
  theme = 'primary',
}: Props) => {
  const isPrimaryTheme = theme === 'primary';
  const isDarkTheme = theme === 'dark';

  const renderChildren = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={isPrimaryTheme ? tw.color('black') : tw.color('white')}
          style={tw`w-6`}
        />
      );
    }

    if (_.isString(children) || label) {
      return (
        <Text
          style={[
            tw.style(
              isPrimaryTheme && 'text-black',
              isDarkTheme && 'text-white',
              // disabled && isPrimaryTheme && 'text-black', // TODO Disabled design
              // disabled && isPrimaryTheme && 'text-white' // TODO Disabled design
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
          'flex-row p-3 rounded items-center justify-center',
          small ? 'h-12' : 'h-16 flex w-full',
          isPrimaryTheme && 'bg-primary-new',
          isDarkTheme && 'bg-card-dark',
          // disabled && 'bg-primary-light' : 'bg-white', // TODO Disabled design
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
