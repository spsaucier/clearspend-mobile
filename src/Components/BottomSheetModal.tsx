import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/core';
import React, { useRef, useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import tw from '@/Styles/tailwind';
import { FocusAwareStatusBar } from './FocusAwareStatusbar';

type BottomSheetModalProps = {
  snapPoints: string[];
  panningEnabled?: boolean;
  closeOnBackdropTap?: boolean;
  children: any;
};

export const BottomSheetModal = ({
  snapPoints,
  panningEnabled = true,
  closeOnBackdropTap = true,
  children,
}: BottomSheetModalProps) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPointMemo = useMemo(() => snapPoints, []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPointMemo);

  const goBack = () => {
    if (navigation?.canGoBack()) navigation.goBack();
  };

  const onBackdropTap = () => {
    if (!closeOnBackdropTap) return;
    bottomSheetRef?.current?.close();
  };

  return (
    <TouchableWithoutFeedback style={tw`h-full`} onPress={onBackdropTap}>
      <BottomSheet
        ref={bottomSheetRef}
        enableHandlePanningGesture={panningEnabled}
        enableContentPanningGesture={panningEnabled}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={panningEnabled}
        onClose={() => {
          goBack();
        }}
        handleStyle={[
          tw`flex self-center bg-white w-12 rounded-full my-3 opacity-40`,
          { display: panningEnabled ? 'flex' : 'none' },
        ]}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <FocusAwareStatusBar barStyle="light-content" />
          {children}
        </BottomSheetView>
      </BottomSheet>
    </TouchableWithoutFeedback>
  );
};
