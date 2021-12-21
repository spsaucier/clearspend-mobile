import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from './ActivityIndicator';
import tw from '@/Styles/tailwind';

type Props = {
  visible: boolean;
  message: string;
  subMessage?: string;
};

export const ActivityOverlay = ({ visible, message, subMessage }: Props) => (
  <View
    style={{
      display: visible ? 'flex' : 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      position: 'absolute',
      height: '100%',
      width: '100%',
    }}
  >
    <ActivityIndicator />
    <Text style={tw`font-telegraf text-white text-xl pt-10`}>{message}</Text>
    {subMessage && <Text style={tw`font-telegraf text-white pt-3`}>{subMessage}</Text>}
  </View>
);
