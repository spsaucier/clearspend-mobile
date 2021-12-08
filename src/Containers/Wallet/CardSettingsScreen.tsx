import React from 'react';
import { View } from 'react-native';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { CSBottomSheet, Button, CSText } from '@/Components';
import tw from '@/Styles/tailwind';

const CardSettingsContent = () => {
  const { close } = useBottomSheet();

  return (
    <View style={tw`flex items-center h-full`}>
      <CSText>Card Settings Modal</CSText>
      <Button
        onPress={() => {
          close();
        }}
      >
        Close
      </Button>
    </View>
  );
};

const CardSettingsScreen = () => (
  <CSBottomSheet snapPoints={['40%', '90%']}>
    <CardSettingsContent />
  </CSBottomSheet>
);

export default CardSettingsScreen;
