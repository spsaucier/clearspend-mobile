import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Keyboard, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import tw from '@/Styles/tailwind';

const NoteInputScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { params } = route;

  const [note, setNote] = useState(params.note || '');
  const [charCount, setCharCount] = useState(note.length || 0);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const maxCharCount = 300;

  const onChangeText = (value: string) => {
    setNote(value);
    setCharCount(value.length);
    setButtonDisabled(value.length > maxCharCount);
  };

  const submitNote = () => {
    // TODO Submit Note to API
    navigation.goBack();
  };

  const cancelAndGoBack = () => {
    // TODO Add tracking
    navigation.goBack();
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-between p-6 bg-white`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1`} behavior="padding">
        <View style={tw`flex-1`}>
          <CSText style={tw`text-2xl py-10 text-center`}>Add a note</CSText>
          <TextInput
            style={tw`text-black w-full`}
            multiline
            autoCorrect
            autoFocus
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder={t('wallet.transactionDetails.notes.addANote')}
            placeholderTextColor={tw.color('gray60')}
            // testID={""}
            keyboardType="default"
            onChangeText={onChangeText}
            value={note}
            onBlur={() => Keyboard.dismiss()}
            selectionColor={tw.color('black')}
            scrollEnabled
          />
        </View>
        <View>
          <View style={tw`flex-row items-center justify-end mb-3`}>
            <CSText style={tw.style(charCount > maxCharCount ? 'text-error' : 'text-black')}>
              {charCount}
            </CSText>
            <CSText style={tw`text-black opacity-50`}>{` / ${maxCharCount}`}</CSText>
          </View>
          <Button onPress={submitNote} disabled={buttonDisabled}>
            {t('wallet.transactionDetails.notes.setNote')}
          </Button>
          <Button
            onPress={cancelAndGoBack}
            containerStyle={tw`bg-white`}
            textStyle={tw`text-secondary`}
          >
            {t('wallet.transactionDetails.notes.cancel')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteInputScreen;
