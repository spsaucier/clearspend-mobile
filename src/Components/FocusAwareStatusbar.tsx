import * as React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export const FocusAwareStatusBar = ({ backgroundColor, translucent, barStyle }: StatusBarProps) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar backgroundColor={backgroundColor} translucent={translucent} barStyle={barStyle} />
  ) : null;
};
