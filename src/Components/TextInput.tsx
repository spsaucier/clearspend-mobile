import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

import tw from '@/Styles/tailwind';
import { EyeIcon } from '@/Components/Icons';

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
  // TextInputProps
  autoCapitalize = 'none',
  autoCorrect = false,
  style,
  keyboardType,
  autoFocus,
  placeholder,
  onChangeText,
  secureTextEntry,
  value,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSecureInput, setShowSecureInput] = useState(secureTextEntry);

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const renderEye = () => (
    <TouchableOpacity onPress={() => setShowSecureInput(!showSecureInput)}>
      {/* TODO Add eye icon with line when ready */}
      {showSecureInput ? <EyeIcon color={tw.color('white')} /> : <EyeIcon />}
    </TouchableOpacity>
  );

  return (
    <View style={containerStyle}>
      {label && <Text style={tw`text-white pl-1 mb-1`}>{label}</Text>}
      <View
        style={tw.style(
          'flex-row items-center h-14 bg-primary-dark rounded-2xl border px-5',
          isFocused ? 'border-white' : 'border-primary-light',
        )}
      >
        <TextInput
          // ref={(e) => {
          //   this.inputField = e;
          // }}
          style={[
            tw.style(
              'flex-1 bg-primary-dark rounded-2xl text-base text-white',
              isFocused ? 'border-white' : 'border-primary-light',
            ),
            style,
          ]}
          onBlur={onBlur}
          onFocus={onFocus}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={placeholder}
          placeholderTextColor={tw.color('copyLight')}
          testID={testID}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={showSecureInput}
        />
        {secureTextEntry && renderEye()}
      </View>
      {errorMessage && <Text style={tw`text-sm text-copyLight pl-1 mb-1`}>{errorMessage}</Text>}
    </View>
  );
};
