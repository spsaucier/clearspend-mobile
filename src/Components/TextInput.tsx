import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

import tw from '@/Styles/tailwind';
import { EyeIcon, EyeOpenIcon } from '@/Components/Icons';
import { CSText } from './Text';

type Props = {
  label?: string;
  errorMessage?: string;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

export const CSTextInput = ({
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
  const [showSecureInput, setShowSecureInput] = useState(secureTextEntry);

  const renderEye = () => (
    <TouchableOpacity
      style={tw`h-10 w-10 items-center justify-center`}
      onPress={() => setShowSecureInput(!showSecureInput)}
    >
      {showSecureInput ? (
        <EyeIcon color={tw.color('white')} />
      ) : (
        <EyeOpenIcon color={tw.color('white')} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={containerStyle}>
      {label && <CSText style={tw`text-white pl-1 mb-3`}>{label}</CSText>}
      <View style={tw.style('flex-row items-center h-16 px-5 bg-secondary-light rounded-lg')}>
        <TextInput
          // ref={(e) => {
          //   this.inputField = e;
          // }}
          style={[tw.style('flex-1 rounded-2xl text-base text-white'), style]}
          // onBlur={onBlur}
          // onFocus={onFocus}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={placeholder}
          placeholderTextColor={tw.color('gray95')}
          testID={testID}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={showSecureInput}
        />
        {secureTextEntry && renderEye()}
      </View>
      {errorMessage && (
        <CSText style={tw`text-sm text-white pl-1 mt-1 mb-1`}>{errorMessage}</CSText>
      )}
    </View>
  );
};
