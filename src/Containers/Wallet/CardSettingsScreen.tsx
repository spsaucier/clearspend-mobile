import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { BottomSheetModal, Button } from '@/Components';
import tw from '@/Styles/tailwind';

const CardSettingsContent = () => {
  const { animatedIndex, close } = useBottomSheet();

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: interpolate(animatedIndex.value, [0, 1], [20, 200]) }],
    }),
    [animatedIndex],
  );
  return (
    <View style={tw`flex-1`}>
      <Animated.Text style={animatedStyle}>Card Settings Modal</Animated.Text>
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
  <BottomSheetModal snapPoints={['40%', '90%']}>
    <CardSettingsContent />
  </BottomSheetModal>
);

export default CardSettingsScreen;
