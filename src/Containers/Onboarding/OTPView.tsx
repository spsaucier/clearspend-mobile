import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { defaultCellInputStyles } from '@/Helpers/StyleHelpers';

interface Props {
  preface?: JSX.Element;
  title?: JSX.Element;
  testID?: string;
  theme?: 'dark' | 'light';
  messaging?: string;
  onPasscodeChanged?: (newCode: string) => void;
  onSuccessFinished: (passcode: string) => void;
  error?: boolean;
  errorTitle?: string;
  errorTextStyle?: StyleProp<TextStyle>;
}

export const PASSCODE_LENGTH = 6;

const defaultStyles = defaultCellInputStyles();

const darkStyles = StyleSheet.create(defaultStyles);
const lightStyles = StyleSheet.create({
  ...defaultStyles,
  title: { textAlign: 'center', fontSize: 30 },
  cellRoot: {
    ...defaultStyles.cellRoot,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  cellText: {
    ...defaultStyles.cellText,
    color: tw.color('black'),
  },
});

export const OTPView: React.FC<Props> = ({
  title,
  testID,
  theme = 'dark',
  errorTitle,
  error = false,
  errorTextStyle,
  onPasscodeChanged,
  onSuccessFinished,
}: Props) => {
  const styles = theme === 'dark' ? darkStyles : lightStyles;
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
      textChild = symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <View
        onLayout={getCellOnLayoutHandler(index)}
        key={index}
        style={[styles.cellRoot, isFocused && styles.focusCell]}
      >
        <CSText style={styles.cellText}>{textChild}</CSText>
      </View>
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
    <View>
      {title || null}
      <View style={tw.style('items-center justify-center h-30')}>
        <CodeField
          {...props}
          ref={ref}
          testID={testID}
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
        {error ? <CSText style={[tw`text-white mt-3`, errorTextStyle]}>{errorTitle}</CSText> : null}
      </View>
    </View>
  );
};
