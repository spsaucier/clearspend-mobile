import * as React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export const FocusAwareStatusBar = ({
  backgroundColor,
  translucent,
  barStyle,
  animated,
}: StatusBarProps) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      animated={animated}
      backgroundColor={backgroundColor}
      translucent={translucent}
      barStyle={barStyle}
    />
  ) : null;
};
