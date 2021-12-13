import { Keyboard, TextInput, TextInputProps, View } from 'react-native';
import React from 'react';

import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { NoteIcon } from '@/Components/Icons';

export const NoteInput = ({ testID, autoCorrect = false, onChangeText, value }: TextInputProps) => {
  const { t } = useTranslation();

  const triangle = () => (
    <View
      style={tw.style('border-gray90 w-0 h-0', {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
      })}
    />
  );

  return (
    <View style={tw`flex justify-center items-center`}>
      {triangle()}
      <View
        style={tw.style(
          'w-full flex-row items-start justify-between border border-gray90 p-2 bg-gray90',
        )}
      >
        <View style={tw`flex-1 flex-row items-center justify-start`}>
          <TextInput
            style={tw`flex-1 text-black ml-2`}
            multiline
            autoCorrect={autoCorrect}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder={t('wallet.transactionDetails.notes.placeholder')}
            placeholderTextColor={tw.color('black')}
            testID={testID}
            keyboardType="default"
            onChangeText={onChangeText}
            value={value}
            onBlur={() => Keyboard.dismiss()}
          />
        </View>
        <NoteIcon style={tw`mt-2 flex h-full`} />
      </View>
    </View>
  );
};
