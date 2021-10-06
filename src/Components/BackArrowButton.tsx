import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon } from '@/Components/Icons';

type Props = {
  iconStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export const BackArrowButton = ({ iconStyle, color, style }: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={style}>
      <BackArrowIcon color={color} style={iconStyle} />
    </TouchableOpacity>
  );
};
