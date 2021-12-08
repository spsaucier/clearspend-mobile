import React from 'react';
import { View } from 'react-native';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import tw from '@/Styles/tailwind';
import { CSBottomSheet, Button, CSText } from '@/Components';

const CardSpendControlsContent = () => {
  const { close } = useBottomSheet();
  return (
    <View style={tw`flex items-center h-full`}>
      <CSText>SpendControlsScreen</CSText>
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

const CardSpendControlsScreen = () => (
  <CSBottomSheet snapPoints={['90%']}>
    <CardSpendControlsContent />
  </CSBottomSheet>
);

export default CardSpendControlsScreen;
