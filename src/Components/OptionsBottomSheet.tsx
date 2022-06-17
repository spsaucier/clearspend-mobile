import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { forwardRef, useCallback } from 'react';
import { View } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components';

interface Props {
  children: React.ReactNode;
  title: string;
}

const OptionsBottomSheet = forwardRef<BottomSheetModal, Props>(({ children, title }, ref) => {
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  const renderBackdrop = useCallback(
    ({ animatedIndex, animatedPosition, style }: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        animatedIndex={animatedIndex}
        animatedPosition={animatedPosition}
        style={style}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <View style={tw`flex-1 pt-4 pb-8 px-5`}>
          <Text style={tw`mb-5`}>{title}</Text>
          {children}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default OptionsBottomSheet;
