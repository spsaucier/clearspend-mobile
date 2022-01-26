import { TouchableOpacity, View } from 'react-native';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { Path, Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { NoteIcon, PlusCircleFilledIcon, PlusIcon } from '@/Components/Icons';
import { CSText } from '@/Components';
import { MainScreens } from '../../../Navigators/NavigatorTypes';

type Props = {
  note: string | null | undefined;
  transactionId: string;
};

export const TransactionNote = ({ note = '', transactionId }: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const navToNoteInput = () => {
    navigate(MainScreens.NoteInput, { transactionId, note });
  };

  const Triangle = () => (
    <View style={[{ aspectRatio: 21 / 10, height: 10, width: 21 }]}>
      <Svg width="100%" height="100%" viewBox="0 0 21 10" fill="none">
        <Path d="M20.5 10L10.5 0L0.5 10H20.5Z" fill={tw.color('tan')} />
      </Svg>
    </View>
  );

  if (!note) {
    return (
      <View style={tw`flex justify-center items-center my-3`}>
        <TouchableOpacity
          onPress={navToNoteInput}
          style={tw`flex-row justify-center items-center py-2 px-4 rounded-full bg-tan`}
        >
          <PlusCircleFilledIcon />
          <CSText style={tw`ml-2 text-secondary`}>
            {t('wallet.transactionDetails.notes.addANote')}
          </CSText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={tw`flex justify-center items-center`}>
      {Triangle()}
      <View
        style={tw.style('w-full flex-row items-start justify-between border border-tan p-2 bg-tan')}
      >
        <View style={tw`flex-1 flex-row items-center justify-start`}>
          <CSText style={tw`p-2`}>{note}</CSText>
        </View>
        <TouchableOpacity onPress={navToNoteInput}>
          <NoteIcon style={tw`mt-1 flex`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
