import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { EyeIcon, SnowflakeIcon } from '@/Components/Icons';
import { useCard, useFreezeCard, useUnFreezeCard } from '@/Queries';
import { MainScreens } from '@/Navigators/NavigatorTypes';

type Props = {
  cardId: string | undefined;
  hideCardInfoButton?: boolean;
};

export const CardOptionsBottomSheet = forwardRef(
  ({ cardId, hideCardInfoButton = false }: Props, ref: any) => {
    const { t } = useTranslation();
    const { navigate } = useNavigation();
    const [isFrozen, setIsFrozen] = useState<boolean>(false);

    const {
      mutate: freeze,
      isLoading: isFreezing,
      isError: isFreezeError,
      isSuccess: isFreezeSuccess,
    } = useFreezeCard(cardId);
    const {
      mutate: unfreeze,
      isLoading: isUnfreezing,
      isError: isUnfreezeError,
      isSuccess: isUnfreezeSuccess,
    } = useUnFreezeCard(cardId);
    const { data, error, isLoading } = useCard(cardId);

    const closePanel = () => {
      ref.current?.close();
    };

    const navigateToCardScreen = () => {
      closePanel();
      navigate(MainScreens.CardDetails, { cardId: cardId! });
    };

    useEffect(() => {
      if (!isLoading && !error && data) {
        setIsFrozen(data.card && data.card.status === 'INACTIVE');
      }
    }, [isLoading, data, error]);

    useEffect(() => {
      Toast.hide();
      if (isFreezing) {
        setIsFrozen(true);
      }
      if (isUnfreezing) {
        setIsFrozen(false);
      }
    }, [isFreezing, isUnfreezing]);

    useEffect(() => {
      if (isFreezeError || isUnfreezeError) {
        Toast.show({
          type: 'error',
          text1: t(
            isFreezeError ? 'card.options.freezeErrorToast' : 'card.options.unfreezeErrorToast',
          ),
        });
      }
    }, [isFreezeError, isUnfreezeError, t]);

    useEffect(() => {
      if (!(isFreezing || isUnfreezing)) {
        if (isFreezeSuccess && isFrozen) {
          Toast.show({
            type: 'success',
            text1: t('card.options.freezeSuccessToast'),
          });
        }
        if (isUnfreezeSuccess && !isFrozen) {
          Toast.show({
            type: 'success',
            text1: t('card.options.unfreezeSuccessToast'),
          });
        }
      }
    }, [isFrozen, isFreezeSuccess, isUnfreezeSuccess, isFreezing, isUnfreezing, t]);

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

    const dimens = useWindowDimensions();
    const snapPointMemo = useMemo(() => [dimens.scale > 2 ? '30%' : '40%'], [dimens.scale]);

    return (
      // <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPointMemo}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={tw`bg-white w-0 h-0`} // TODO Check on closing UI
        backgroundStyle={tw`bg-white`}
      >
        <SafeAreaView style={tw`flex-1 py-4 px-6`} edges={['bottom']}>
          <CSText style={tw`text-lg font-medium mb-4`}>{t('card.options.showCardInfo')}</CSText>

          <TouchableOpacity
            style={tw`flex-row items-center py-4`}
            onPress={() => {
              if (!isFrozen) freeze();
              else unfreeze();
            }}
            disabled={isFreezing || isUnfreezing || isLoading}
          >
            <SnowflakeIcon style={tw`mr-3 w-6`} color={tw.color('black')} />
            {isLoading ? (
              <CSText style={tw`text-base`}>...</CSText>
            ) : isFreezing || isUnfreezing ? (
              <CSText style={tw`text-base`}>
                {t(isUnfreezing ? 'card.options.unfreezingCard' : 'card.options.freezingCard')}
              </CSText>
            ) : (
              <CSText style={tw`text-base`}>
                {t(isFrozen ? 'card.options.unfreezeCard' : 'card.options.freezeCard')}
              </CSText>
            )}
          </TouchableOpacity>

          {!hideCardInfoButton && !isFrozen && !isFreezing && !isUnfreezing && (
            <TouchableOpacity style={tw`flex-row items-center py-4`} onPress={navigateToCardScreen}>
              <EyeIcon style={tw`mr-3 w-6`} color={tw.color('black')} />
              <CSText style={tw`text-base`}>{t('card.options.showCardInfo')}</CSText>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </BottomSheetModal>
      // </BottomSheetModalProvider>
    );
  },
);

CardOptionsBottomSheet.defaultProps = {
  hideCardInfoButton: false,
};
