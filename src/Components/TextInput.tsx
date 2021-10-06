import { StyleProp, TextInput, TextInputProps, View, ViewStyle, Text } from 'react-native';
import React, { useState } from 'react';

import tw from '@/Styles/tailwind';

type Props = {
  label?: string;
  errorMessage?: string;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

export const TWTextInput = ({
  errorMessage,
  label,
  testID,
  containerStyle,

  autoCapitalize,
  style,
  keyboardType,
  autoFocus,
  placeholder,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };
  return (
    <View style={[tw`mb-4`, containerStyle]}>
      {label && <Text style={tw`text-white pl-1 mb-1`}>{label}</Text>}
      <TextInput
        // ref={(e) => {
        //   this.inputField = e;
        // }}
        style={[
          tw.style(
            'flex h-14 bg-primaryDark rounded-2xl border px-5 text-base text-white',
            isFocused ? 'border-white' : 'border-primaryLight',
          ),
          style,
        ]}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder={placeholder}
        placeholderTextColor={tw.color('copyLight')}
        testID={testID}
        keyboardType={keyboardType}
      />
      {errorMessage && <Text style={tw`text-sm text-copyLight pl-1 mb-1`}>{errorMessage}</Text>}
    </View>
  );
};
