import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CSText } from './Text';
import tw from '@/Styles/tailwind';

export const LetterAvatar = ({ initials, size = 40 }: { initials: string; size?: number }) => (
  <View style={[tw`rounded-full items-center justify-center`, { height: size, width: size }]}>
    <LinearGradient
      colors={['rgba(183, 163, 163, 1)', 'rgba(215, 236, 255, 1)']}
      useAngle
      angle={224}
      angleCenter={{ x: 0.5, y: 0.5 }}
      style={[tw`rounded-full items-center justify-center`, { height: size, width: size }]}
    >
      <CSText style={tw`text-xs tracking-wider`}>{initials}</CSText>
    </LinearGradient>
  </View>
);
