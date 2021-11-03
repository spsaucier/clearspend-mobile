import { Keyboard, TextInput, TextInputProps, View } from 'react-native';
import React from 'react';

import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { EditIcon, NoteIcon } from '@/Components/Icons';

export const NoteInput = ({ testID, autoCorrect = false, onChangeText, value }: TextInputProps) => {
  const { t } = useTranslation();
  return (
    <View
      style={tw.style(
        'w-full flex-row items-center justify-between rounded-lg border border-gray90 p-2',
      )}
    >
      <View style={tw`flex-1 flex-row items-center justify-start`}>
        <NoteIcon style={tw`mt-2`} />
        <TextInput
          style={tw`flex-1 text-copyDark ml-2`}
          multiline
          autoCorrect={autoCorrect}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={t('wallet.transactionDetails.notes.placeholder')}
          placeholderTextColor={tw.color('gray50')}
          testID={testID}
          keyboardType="default"
          onChangeText={onChangeText}
          value={value}
          onBlur={() => Keyboard.dismiss()}
        />
      </View>
      <EditIcon style={tw`mt-2 flex h-full`} />
    </View>
  );
};
