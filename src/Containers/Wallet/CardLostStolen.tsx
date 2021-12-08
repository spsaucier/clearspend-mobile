import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';

const CardLostStolen = () => (
  <SafeAreaView style={tw`flex-1 items-center justify-center`}>
    <CSText>CardLostStolen</CSText>
  </SafeAreaView>
);

export default CardLostStolen;
