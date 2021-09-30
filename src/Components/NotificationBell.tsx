import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import tw from '@/Styles/tailwind';
import { NotificationIcon } from '@/Assets/Icons';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const NotificationBell = ({ style }: Props) => {
  const hasNotification = true;
  return (
    <TouchableOpacity onPress={() => {}} style={[style]}>
      {hasNotification && (
        <View style={tw`absolute bg-error h-2 w-2 rounded-full -top-1 -right-1`} />
      )}
      <NotificationIcon />
    </TouchableOpacity>
  );
};
