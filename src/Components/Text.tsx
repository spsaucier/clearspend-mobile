import { Text, TextProps } from 'react-native';
import React from 'react';
import tw from '@/Styles/tailwind';

type Props = { children: any } & TextProps;

export const CSText = ({
  children,
  style,
  onPress,
  numberOfLines,
  testID,
  accessibilityActions,
  accessibilityElementsHidden,
  accessibilityHint,
  accessibilityIgnoresInvertColors,
  accessibilityLabel,
  accessibilityLiveRegion,
  accessibilityRole,
  accessibilityState,
  accessibilityValue,
  accessibilityViewIsModal,
  accessible,
  adjustsFontSizeToFit,
  allowFontScaling,
  android_hyphenationFrequency,
  dataDetectorType,
  ellipsizeMode,
  importantForAccessibility,
  lineBreakMode,
  maxFontSizeMultiplier,
  minimumFontScale,
  nativeID,
  selectable,
  selectionColor,
  suppressHighlighting,
  textBreakStrategy,
}: Props) => (
  <Text
    style={[tw`font-montreal text-black`, style]}
    onPress={onPress}
    numberOfLines={numberOfLines}
    testID={testID}
    accessibilityActions={accessibilityActions}
    accessibilityElementsHidden={accessibilityElementsHidden}
    accessibilityHint={accessibilityHint}
    accessibilityIgnoresInvertColors={accessibilityIgnoresInvertColors}
    accessibilityLabel={accessibilityLabel}
    accessibilityLiveRegion={accessibilityLiveRegion}
    accessibilityRole={accessibilityRole}
    accessibilityState={accessibilityState}
    accessibilityValue={accessibilityValue}
    accessibilityViewIsModal={accessibilityViewIsModal}
    accessible={accessible}
    adjustsFontSizeToFit={adjustsFontSizeToFit}
    allowFontScaling={allowFontScaling}
    android_hyphenationFrequency={android_hyphenationFrequency}
    dataDetectorType={dataDetectorType}
    ellipsizeMode={ellipsizeMode}
    importantForAccessibility={importantForAccessibility}
    lineBreakMode={lineBreakMode}
    maxFontSizeMultiplier={maxFontSizeMultiplier}
    minimumFontScale={minimumFontScale}
    nativeID={nativeID}
    selectable={selectable}
    selectionColor={selectionColor}
    suppressHighlighting={suppressHighlighting}
    textBreakStrategy={textBreakStrategy}
  >
    {children}
  </Text>
);