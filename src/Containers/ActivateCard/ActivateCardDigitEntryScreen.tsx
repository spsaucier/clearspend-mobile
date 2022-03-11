import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
  CodeField,
} from 'react-native-confirmation-code-field';

import { MainScreens } from '@/Navigators/NavigatorTypes';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar } from '@/Components';

export const CODE_FIELD_LENGTH = 4;

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 300, maxWidth: 100 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 47,
    height: 47,
    lineHeight: 47,
    fontSize: 24,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderColor: 'transparent',
    overflow: 'hidden',
    ...tw`rounded`,
    borderRadius: 4,
    marginHorizontal: 4,
    fontFamily: 'telegraf',
    fontWeight: '500',
    color: tw.color('black'),
    textAlign: 'center',
  },
  focusCell: {
    opacity: 1,
  },
});

export const ActivateCardDigitEntryScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount: CODE_FIELD_LENGTH });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useFocusEffect(
    useCallback(() => {
      setValue('');
      ref?.current?.focus();
    }, [ref]),
  );

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: string;
    isFocused: boolean;
  }) => {
    let textChild = null;

    if (symbol) {
      textChild = symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <CSText
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </CSText>
    );
  };

  const handleDigitChange = (code: string) => {
    setValue(code);
    if (code.length === CODE_FIELD_LENGTH) {
      navigate(MainScreens.ActivateCardResult, { lastFour: code });
    }
  };

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" translucent />
      <View style={tw`flex-1 bg-white pt-8`}>
        <View style={tw`pl-4 pr-8`}>
          <CSText style={tw`font-telegraf text-2xl leading-snug font-light`}>
            {t('activateCard.enterDigitsInstruction1')}
          </CSText>
          <CSText style={tw`text-base leading-normal text-gray-75 pt-4`}>
            {t('activateCard.enterDigitsInstruction2')}
          </CSText>
        </View>

        <View style={tw`items-center justify-center h-30`}>
          <CodeField
            {...props}
            ref={ref}
            testID="lastFourDigitsCodeField"
            autoFocus
            value={value}
            onChangeText={handleDigitChange}
            cellCount={CODE_FIELD_LENGTH}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
        </View>
      </View>
    </>
  );
};
