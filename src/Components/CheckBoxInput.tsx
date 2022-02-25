import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { CheckBoxIcon, CheckBoxCheckedIcon } from './Icons';

type Props = {
  onToggle: (isChecked: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export const CheckBoxInput = ({ onToggle, style }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        const isOrNotChecked = !isChecked;
        setIsChecked(isOrNotChecked);
        onToggle(isOrNotChecked);
      }}
    >
      {isChecked ? <CheckBoxCheckedIcon /> : <CheckBoxIcon />}
    </TouchableOpacity>
  );
};
