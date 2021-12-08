import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { CloseIcon } from '@/Components/Icons';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export const CloseIconButton = ({ onPress, style, color = tw.color('black') }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={style} onPress={onPress || (() => navigation.goBack())}>
      <CloseIcon color={color} />
    </TouchableOpacity>
  );
};
