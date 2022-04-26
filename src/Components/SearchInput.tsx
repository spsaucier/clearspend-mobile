import { TextInput, TextInputProps, View } from 'react-native';
import React from 'react';

import tw from '@/Styles/tailwind';
import { MagnificationIcon } from '@/Components/Icons';
import { getCappedFontScale, getFontSizeMultiplier } from '@/Helpers/StyleHelpers';

export const TWSearchInput = ({
  testID,
  autoCapitalize = 'none',
  autoCorrect = false,
  keyboardType,
  autoFocus,
  placeholder,
  onChangeText,
  value,
}: TextInputProps) => (
  <View style={tw`flex-row justify-between items-center rounded-lg border border-gray-10 p-2`}>
    <TextInput
      autoFocus={autoFocus}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      underlineColorAndroid="rgba(0,0,0,0)"
      placeholder={placeholder}
      placeholderTextColor={tw.color('gray-50')}
      testID={testID}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      style={tw`flex-1 text-black pt-0 pb-0`}
      value={value}
      maxFontSizeMultiplier={getFontSizeMultiplier()}
    />
    <MagnificationIcon size={20 * getCappedFontScale()} />
  </View>
);
