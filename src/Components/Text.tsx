import { Text, TextProps } from 'react-native';
import React from 'react';
import tw from '@/Styles/tailwind';

export const MAX_FONT_SCALE = 1.5;
export const MID_FONT_SCALE = 1.3;
export const MIN_FONT_SCALE = 1;

interface CSTextProps extends TextProps {
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

  let maxFontSizeMultiplier = 1;
  if (allowFontScaling) {
    if (limitFontScale) {
      maxFontSizeMultiplier = MID_FONT_SCALE;
    } else {
      maxFontSizeMultiplier = MAX_FONT_SCALE;
    }
  }
  return (
    <Text
      style={[tw`font-montreal text-black text-base`, style]}
      allowFontScaling={!!allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      {...props}
    >
      {children}
    </Text>
  );
};
