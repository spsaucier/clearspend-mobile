import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, { Ref, useState } from 'react';

import tw from '@/Styles/tailwind';
import { EyeIcon, EyeOpenIcon } from '@/Components/Icons';
import { CSText } from './Text';

export type Props = {
  label?: string;
  errorMessage?: string;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

export const CSTextInput = React.forwardRef(
  (
    { label, errorMessage, testID, containerStyle, style, secureTextEntry, ...rest }: Props,
    ref: Ref<TextInput>,
  ) => {
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
            style={[tw.style('flex-1 rounded-2xl text-base text-white'), style]}
            testID={testID}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor={tw.color('gray95')}
            selectionColor={tw.color('white')}
            ref={ref}
            secureTextEntry={showSecureInput}
            {...rest}
          />
          {secureTextEntry && renderEye()}
        </View>
        {errorMessage && (
          <CSText style={tw`text-sm text-white pl-1 mt-1 mb-1`}>{errorMessage}</CSText>
        )}
      </View>
    );
  },
);
