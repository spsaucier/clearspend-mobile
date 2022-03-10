import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';

interface Props {
  preface?: JSX.Element;
  title: JSX.Element;
  messaging?: string;
  onPasscodeChanged?: (newCode: string) => void;
  onSuccessFinished: (passcode: string) => void;
  errorTitle?: string;
  error?: string;
}

export const PASSCODE_LENGTH = 4;

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 300, maxWidth: 100 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 70,
    lineHeight: 70,
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    marginHorizontal: 4,
    fontFamily: 'telegraf',
    fontWeight: '500',
    color: tw.color('primary'),
    textAlign: 'center',
  },
  focusCell: {
    opacity: 1,
  },
});

export const PasscodeView: React.FC<Props> = ({
  preface,
  title,
  messaging,
  errorTitle,
  error = '',
  onPasscodeChanged,
  onSuccessFinished,
}: Props) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: PASSCODE_LENGTH });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
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
      textChild = '●';
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

  const handlePasscodeChange = (code: string) => {
    onPasscodeChanged?.(code);
    setValue(code);
    if (code.length === PASSCODE_LENGTH) {
      onSuccessFinished?.(code);
    }
  };

  return (
    <SafeAreaView style={tw.style('pt-10')}>
      {preface}
      {title}
      <View style={tw.style('items-center justify-center h-30')}>
        <CodeField
          {...props}
          ref={ref}
          autoFocus
          value={value}
          onChangeText={handlePasscodeChange}
          cellCount={PASSCODE_LENGTH}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
      </View>
      <View style={tw.style('items-center')}>
        {error ? <CSText style={tw`text-white mt-3`}>{errorTitle}</CSText> : null}
        {(error || messaging) && <CSText style={tw`text-white`}>{error || messaging}</CSText>}
      </View>
    </SafeAreaView>
  );
};
