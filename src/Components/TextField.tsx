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

export const CSTextField = ({
  errorMessage,
  label,
  testID,
  containerStyle,
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
        <EyeIcon color={tw.color('black')} />
      ) : (
        <EyeOpenIcon color={tw.color('black')} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={containerStyle}>
      {label && <CSText style={tw`text-black pl-1 mb-3`}>{label}</CSText>}
      <View style={tw.style('flex-row items-center mt-4 bg-white')}>
        <TextInput
          // ref={(e) => {
          //   this.inputField = e;
          // }}
          style={[tw.style('flex-1 text-base text-black'), style]}
          // onBlur={onBlur}
          // onFocus={onFocus}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={placeholder}
          placeholderTextColor={tw.color('white')}
          testID={testID}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={showSecureInput}
          selectionColor={tw.color('black')}
        />
        {secureTextEntry && renderEye()}
      </View>
      {errorMessage && (
        <CSText style={tw`text-sm text-black pl-1 mt-1 mb-1`}>{errorMessage}</CSText>
      )}
    </View>
  );
};
