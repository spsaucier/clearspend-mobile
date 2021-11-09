import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/core';
import React, { useRef, useMemo, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import tw from '@/Styles/tailwind';
import { FocusAwareStatusBar } from './FocusAwareStatusbar';

type CSBottomSheetProps = {
  snapPoints: string[];
  panningEnabled?: boolean;
  closeOnBackdropTap?: boolean;
  translucidBackground?: boolean;
  children: any;
};

type BackdropProps = {
  animatedPosition: Animated.SharedValue<number>;
  animatedIndex: Animated.SharedValue<number>;
};

export const CSBottomSheet = ({
  snapPoints,
  panningEnabled = true,
  closeOnBackdropTap = true,
  translucidBackground = false,
  children,
}: CSBottomSheetProps) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPointMemo = useMemo(() => snapPoints, []);

  const { handleContentLayout } = useBottomSheetDynamicSnapPoints(snapPointMemo);

  const goBack = () => {
    if (navigation?.canGoBack()) navigation.goBack();
  };

  const renderBackdrop = useCallback((props: BackdropProps) => {
    const { animatedIndex, animatedPosition } = props;
    return (
      <BottomSheetBackdrop
        animatedIndex={animatedIndex}
        animatedPosition={animatedPosition}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={closeOnBackdropTap ? 'close' : 'none'}
      />
    );
  }, []);

  return (
    <BottomSheet
      index={0}
      ref={bottomSheetRef}
      enableHandlePanningGesture
      snapPoints={snapPointMemo}
      backgroundStyle={translucidBackground && tw`opacity-0`}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onClose={() => {
        goBack();
      }}
      handleStyle={[
        tw`flex self-center bg-transparent w-12 rounded-full my-3`,
        { display: panningEnabled ? 'flex' : 'none' },
      ]}
      handleIndicatorStyle={tw`${translucidBackground ? 'bg-gray80' : 'bg-gray20'}`}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <FocusAwareStatusBar />
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};
