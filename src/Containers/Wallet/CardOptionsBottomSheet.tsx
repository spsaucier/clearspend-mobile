import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { EyeIcon, SnowflakeIcon, KeyIcon } from '@/Components/Icons';
import { useFreezeCard, useUnFreezeCard, useCard } from '@/Queries';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { useSpendControls } from '@/Hooks/useSpendControls';
import { useAllPermissions } from '@/Queries/permissions';
import { showAdmin } from '@/Helpers/PermissionsHelpers';
import { useFeatureFlag } from '@/Hooks/useFeatureFlag';
import { ArchiveIcon } from '@/Components/Icons/archiveIcon';
import { useCancelCard } from '@/Queries/card';

type Props = {
  cardId: string | undefined;
  hideCardInfoButton?: boolean;
  isCardFrozen: boolean;
  setIsCancelling: Dispatch<SetStateAction<boolean>>;
  nextIndex: number | undefined;
};

export const CardOptionsBottomSheet = forwardRef(
  (
    { cardId, hideCardInfoButton = false, isCardFrozen, setIsCancelling, nextIndex }: Props,
    ref: any,
  ) => {
    const { t } = useTranslation();
    const { navigate } = useNavigation();

    const { data } = useCard(cardId);

    const showSpendControlsRow = useSpendControls(data?.card?.allocationId);

    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

    const [isFrozen, setIsFrozen] = useState<boolean>(isCardFrozen);

    const { mutateAsync: mutateFreeze, isLoading: isFreezing } = useFreezeCard(cardId);
    const { mutateAsync: mutateUnfreeze, isLoading: isUnfreezing } = useUnFreezeCard(cardId);
    const { data: permissions } = useAllPermissions();
    const { enabled: adminEnabled } = useFeatureFlag('view-admin');
    const { mutateAsync: mutateCancel, isLoading: isCancelling } = useCancelCard();

    const hasAdminPermissions = showAdmin(permissions);
    const showCancelCardOption = hasAdminPermissions && adminEnabled;

    const closePanel = useCallback(() => {
      ref.current?.close();
    }, [ref]);

    const navigateToCardScreen = () => {
      closePanel();
      navigate(MainScreens.CardDetails, { cardId: cardId! });
    };

    const navigateToCardSpendControlScreen = () => {
      closePanel();
      navigate(MainScreens.CardSpendControl, { cardId: cardId! });
    };

    useEffect(() => {
      setIsFrozen(isCardFrozen);
    }, [cardId, isCardFrozen]);

    useEffect(() => {
      setIsCancelling(isCancelling);
    }, [isCancelling, setIsCancelling]);

    const freeze = useCallback(() => {
      mutateFreeze()
        .then(() => {
          setIsFrozen(true);
          Toast.show({
            type: 'success',
            text1: t('card.options.freezeSuccessToast'),
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: t('card.options.freezeErrorToast'),
          });
        });
    }, [mutateFreeze, t]);

    const unfreeze = useCallback(() => {
      mutateUnfreeze()
        .then(() => {
          setIsFrozen(false);
          Toast.show({
            type: 'success',
            text1: t('card.options.unfreezeSuccessToast'),
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: t('card.options.unfreezeErrorToast'),
          });
        });
    }, [mutateUnfreeze, t]);

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

    const confirmCardCancel = useCallback(() => {
      closePanel();
      mutateCancel({ cardId })
        .then(() => {
          navigate(MainScreens.Wallet, { initialFocusCardIdx: nextIndex });
          Toast.show({
            type: 'success',
            text1: t('toasts.cancelCard.success'),
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: t('toasts.cancelCard.error'),
          });
        });
    }, [cardId, closePanel, mutateCancel, navigate, nextIndex, t]);

    const cancelAlert = useCallback(
      () =>
        Alert.alert(
          t('card.options.cancelCardAlert.title'),
          t('card.options.cancelCardAlert.message'),
          [
            {
              text: t('card.options.cancelCardAlert.back'),
            },
            {
              text: t('card.options.cancelCardAlert.confirm'),
              onPress: () => confirmCardCancel(),
            },
          ],
          { cancelable: true },
        ),
      [confirmCardCancel, t],
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={tw`bg-white w-0 h-0`} // TODO Check on closing UI
        backgroundStyle={tw`bg-white`}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <SafeAreaView style={tw`flex-1 pt-4 pb-8 px-5`} edges={['bottom']}>
            <CSText style={tw`text-lg font-medium mb-4`}>{t('card.options.cardOptions')}</CSText>

            <TouchableOpacity
              style={tw`flex-row items-center py-4`}
              onPress={() => {
                if (!isFrozen) freeze();
                else unfreeze();
              }}
              disabled={isFreezing || isUnfreezing}
            >
              <SnowflakeIcon style={tw`mr-3 w-6`} color={tw.color('black')} />
              {isFreezing || isUnfreezing ? (
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
              <TouchableOpacity
                style={tw`flex-row items-center py-4`}
                onPress={navigateToCardScreen}
              >
                <EyeIcon style={tw`mr-3 w-6`} color={tw.color('black')} />
                <CSText style={tw`text-base`}>{t('card.options.showCardInfo')}</CSText>
              </TouchableOpacity>
            )}
            {showSpendControlsRow && (
              <TouchableOpacity
                style={tw`flex-row items-center py-4`}
                onPress={navigateToCardSpendControlScreen}
              >
                <KeyIcon style={tw`mr-3 w-6`} color={tw.color('black')} />
                <CSText style={tw`text-base`}>{t('card.options.spendControls')}</CSText>
              </TouchableOpacity>
            )}
            {showCancelCardOption ? (
              <TouchableOpacity style={tw`flex-row items-center py-4`} onPress={cancelAlert}>
                <ArchiveIcon style={tw`mr-3 w-6`} color={tw.color('darkError')} />
                <CSText style={tw`text-base text-darkError`}>{t('card.options.cancelCard')}</CSText>
              </TouchableOpacity>
            ) : null}
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

CardOptionsBottomSheet.defaultProps = {
  hideCardInfoButton: false,
};
