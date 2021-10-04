import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { CloseIcon } from '@/Assets/Icons';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const CloseIconButton = ({ onPress, style }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={style} onPress={onPress || (() => navigation.goBack())}>
      <CloseIcon color={tw.color('black')} />
    </TouchableOpacity>
  );
};
