import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Keyboard, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import tw from '@/Styles/tailwind';
import { useUpdateTransaction } from '@/Queries/transaction';
import { getFontSizeMultiplier } from '@/Helpers/StyleHelpers';

const NoteInputScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { params } = route;

  const [note, setNote] = useState(params.notes || '');
  const [charCount, setCharCount] = useState(note.length || 0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const {
    mutate: saveNote,
    isLoading: isSaving,
    isSuccess,
  } = useUpdateTransaction(params.accountActivityId, params.notes || '');
  const maxCharCount = 300;

  const onChangeText = (value: string) => {
    setNote(value);
    setCharCount(value.length);
    setButtonDisabled(value.length > maxCharCount);
  };

  const submitNote = () => {
    Keyboard.dismiss();
    saveNote({
      notes: note,
      expenseCategoryId: params.expenseCategoryId,
    });
  };

  const cancelAndGoBack = () => {
    // TODO Add tracking
    navigation.goBack();
  };

  useEffect(() => {
    if (isSuccess) navigation.goBack();
  }, [isSuccess, navigation]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1`} behavior="padding">
        <View style={tw`flex-1`}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            containerStyle={tw`flex-1`}
            style={tw`flex-1 px-6 pt-6`}
          >
            <CSText style={tw`text-2xl pt-6 text-center`}>
              {t('wallet.transactionDetails.notes.addANote')}
            </CSText>
            <View style={tw`flex-1`}>
              <TextInput
                style={tw`text-black h-full`}
                multiline
                autoFocus
                autoCorrect
                textAlignVertical="top"
                testID="noteField"
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={t('wallet.transactionDetails.notes.addANote')}
                placeholderTextColor={tw.color('gray-50')}
                onChangeText={onChangeText}
                value={note}
                onBlur={Keyboard.dismiss}
                scrollEnabled
                maxFontSizeMultiplier={getFontSizeMultiplier()}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={tw`mt-1 px-6 pb-6`}>
          <View style={tw`flex-row items-center justify-end m-1`}>
            <CSText style={tw.style(charCount > maxCharCount ? 'text-error' : 'text-black')}>
              {charCount}
            </CSText>
            <CSText style={tw`text-gray-50`}>{` / ${maxCharCount}`}</CSText>
          </View>
          <Button
            onPress={submitNote}
            testID="setNoteButton"
            disabled={buttonDisabled || isSaving}
            loading={isSaving}
            small
          >
            {t('wallet.transactionDetails.notes.setNote')}
          </Button>
          <Button
            onPress={cancelAndGoBack}
            testID="cancelButton"
            containerStyle={tw`bg-white`}
            textStyle={tw`text-secondary`}
            small
            disabled={isSaving}
          >
            {t('wallet.transactionDetails.notes.cancel')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteInputScreen;
