import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Trans } from 'react-i18next';
import { View } from 'react-native';
import { Button } from './Button';
import { CSText } from './Text';
import tw from '@/Styles/tailwind';

type InfoPanelProps = {
  title: String | React.ReactElement;
  description: String;
  okButtonText: String;
};

export const InfoPanel = forwardRef(
  ({ title, description, okButtonText }: InfoPanelProps, ref: any) => {
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

    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const onOkButtonPress = () => {
      ref.current?.close();
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={tw`bg-black-20 w-14 h-1`}
        backgroundStyle={tw`bg-secondary`}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <View style={tw`flex-1 pt-4 pb-8 px-5`}>
            <CSText style={tw`text-xl text-white`} testID="infoPanelTitleText">
              <Trans
                i18nKey={title as string}
                components={{
                  key: (
                    <CSText style={tw`text-xl text-primary`} testID="infoPanelHighlightedText" />
                  ),
                }}
              />
            </CSText>
            <CSText style={tw`text-white mt-4 mb-16`} testID="infoPanelDescriptionTest">
              {description}
            </CSText>
            <View style={tw`flex-1 justify-end`}>
              <Button onPress={onOkButtonPress} testID="infoPanelButtonDismiss">
                {okButtonText}
              </Button>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
