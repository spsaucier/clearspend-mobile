import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Trans } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

    const onOkButtonPress = () => {
      ref.current?.close();
    };

    const dimens = useWindowDimensions();
    const snapPointMemo = useMemo(() => [dimens.scale > 2 ? '35%' : '48%'], [dimens.scale]);

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPointMemo}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={tw`bg-gray80`}
          backgroundStyle={tw`bg-secondary`}
        >
          <SafeAreaView style={tw`flex-1 p-4`} edges={['bottom']}>
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
            <CSText style={tw`text-white mt-4`} testID="infoPanelDescriptionTest">
              {description}
            </CSText>
            <View style={tw`flex-1 justify-end`}>
              <Button onPress={onOkButtonPress} testID="infoPanelButtonDismiss">
                {okButtonText}
              </Button>
            </View>
          </SafeAreaView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);
