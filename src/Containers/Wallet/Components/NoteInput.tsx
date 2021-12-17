import { Keyboard, TextInput, TextInputProps, View } from 'react-native';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { Path, Svg } from 'react-native-svg';
import tw from '@/Styles/tailwind';
import { NoteIcon } from '@/Components/Icons';

export const NoteInput = ({ testID, autoCorrect = false, onChangeText, value }: TextInputProps) => {
  const { t } = useTranslation();

  const Triangle = () => (
    <View style={[{ aspectRatio: 21 / 10, height: 10, width: 21 }]} testID={testID}>
      <Svg width="100%" height="100%" viewBox="0 0 21 10" fill="none">
        <Path d="M20.5 10L10.5 0L0.5 10H20.5Z" fill={tw.color('gray90')} />
      </Svg>
    </View>
  );

  return (
    <View style={tw`flex justify-center items-center`}>
      {Triangle()}
      <View
        style={tw.style(
          'w-full flex-row items-start justify-between border border-gray90 p-2 bg-gray90',
        )}
      >
        <View style={tw`flex-1 flex-row items-center justify-start`}>
          <TextInput
            style={tw`flex-1 text-black ml-2 py-1`}
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
            selectionColor={tw.color('black')}
          />
        </View>
        <NoteIcon style={tw`mt-1 flex h-full`} />
      </View>
    </View>
  );
};
