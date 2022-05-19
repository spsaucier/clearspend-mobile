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
import { getFontSizeMultiplier } from '@/Helpers/StyleHelpers';

export type Props = {
  label?: string;
  errorMessage?: string;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  limitFontScale?: boolean;
  theme?: 'light' | 'dark';
} & TextInputProps;

export const CSTextInput = React.forwardRef(
  (
    {
      label,
      errorMessage,
      testID,
      containerStyle,
      limitFontScale,
      style,
      secureTextEntry,
      allowFontScaling = true,
      theme = 'dark',
      ...rest
    }: Props,
    ref: Ref<TextInput>,
  ) => {
    const [showSecureInput, setShowSecureInput] = useState(secureTextEntry);
    const darkTheme = theme === 'dark';

    const renderEye = () => (
      <TouchableOpacity
        style={tw`h-10 w-10 items-center justify-center`}
        onPress={() => setShowSecureInput(!showSecureInput)}
      >
        {showSecureInput ? (
          <EyeIcon color={darkTheme ? tw.color('white') : tw.color('black')} />
        ) : (
          <EyeOpenIcon color={darkTheme ? tw.color('white') : tw.color('black')} />
        )}
      </TouchableOpacity>
    );

    return (
      <View style={containerStyle}>
        {label && (
          <CSText style={tw`${darkTheme ? 'text-white' : 'text-black'} pl-1 mb-3`}>{label}</CSText>
        )}
        <View
          style={tw.style(
            'flex-row items-center h-16 px-5 bg-secondary-light rounded-lg',
            darkTheme ? 'bg-secondary-light' : 'bg-white',
          )}
        >
          <TextInput
            style={[
              tw.style('flex-1 rounded-2xl text-sm', darkTheme ? 'text-white' : 'text-black'),
              style,
            ]}
            testID={testID}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor={darkTheme ? tw.color('gray-5') : tw.color('white')}
            selectionColor={darkTheme ? tw.color('white') : tw.color('black')}
            ref={ref}
            secureTextEntry={showSecureInput}
            maxFontSizeMultiplier={getFontSizeMultiplier(allowFontScaling, limitFontScale)}
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
