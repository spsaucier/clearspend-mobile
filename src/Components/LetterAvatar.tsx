import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CSText } from './Text';
import tw from '@/Styles/tailwind';

export const LetterAvatar = ({ initials }: { initials: string }) => (
  <View style={tw`rounded-full w-6 items-center justify-center`}>
    <LinearGradient
      colors={['rgba(183, 163, 163, 1)', 'rgba(215, 236, 255, 1)']}
      useAngle
      angle={224}
      angleCenter={{ x: 0.5, y: 0.5 }}
      style={[tw`rounded-full h-6 w-6 items-center justify-center`]}
    >
      <CSText style={tw`text-xs tracking-wider`}>{initials}</CSText>
    </LinearGradient>
  </View>
);
