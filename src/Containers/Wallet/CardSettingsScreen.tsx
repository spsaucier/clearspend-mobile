import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';

const CardSettingsScreen = () => (
  <SafeAreaView style={tw`flex-1 items-center justify-center`}>
    <Text>CardSettingsScreen</Text>
  </SafeAreaView>
);

export default CardSettingsScreen;
