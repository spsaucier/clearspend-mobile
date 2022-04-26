import { Text, TextProps } from 'react-native';
import React from 'react';
import tw from '@/Styles/tailwind';
import { getFontSizeMultiplier } from '@/Helpers/StyleHelpers';

export interface CSTextProps extends TextProps {
  shrinkForSmall?: boolean;
  limitFontScale?: boolean;
}

export const CSText = ({
  children,
  style,
  allowFontScaling = true,
  limitFontScale = false,
  ...props
}: CSTextProps) => {
  if (!children) {
    return null; // avoid crashes on falsy values
  }

  return (
    <Text
      style={[tw`font-montreal text-black text-base`, style]}
      allowFontScaling={!!allowFontScaling}
      maxFontSizeMultiplier={getFontSizeMultiplier(allowFontScaling, limitFontScale)}
      {...props}
    >
      {children}
    </Text>
  );
};
