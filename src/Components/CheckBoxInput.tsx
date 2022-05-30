import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { CheckBoxIcon, CheckBoxCheckedIcon } from './Icons';

type Props = {
  onToggle: (isChecked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
};

export const CheckBoxInput = ({ onToggle, style, accessibilityLabel, testID }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableOpacity
      style={style}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel}
      onPress={() => {
        const isOrNotChecked = !isChecked;
        setIsChecked(isOrNotChecked);
        onToggle(isOrNotChecked);
      }}
      testID={testID}
    >
      {isChecked ? <CheckBoxCheckedIcon /> : <CheckBoxIcon />}
    </TouchableOpacity>
  );
};
