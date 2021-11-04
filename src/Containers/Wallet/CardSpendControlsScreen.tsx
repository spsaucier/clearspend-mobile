import React from 'react';
import { Text, View } from 'react-native';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import tw from '@/Styles/tailwind';
import { BottomSheetModal, Button } from '@/Components';

const CardSpendControlsContent = () => {
  const { close } = useBottomSheet();
  return (
    <View style={tw`flex items-center h-full`}>
      <Text>SpendControlsScreen</Text>
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
  <BottomSheetModal snapPoints={['90%']}>
    <CardSpendControlsContent />
  </BottomSheetModal>
);

export default CardSpendControlsScreen;
