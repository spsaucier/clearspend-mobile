import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';
import Config from 'react-native-config';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { EyeIcon, SnowflakeIcon, KeyIcon } from '@/Components/Icons';
import { useFreezeCard, useUnFreezeCard, useCard, useUser } from '@/Queries';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { canManagePermissions, getAllocationPermissions } from '@/Helpers/PermissionsHelpers';
import { useAllPermissions } from '@/Queries/permissions';

type Props = {
  cardId: string | undefined;
  hideCardInfoButton?: boolean;
  isCardFrozen: boolean;
};

export const CardOptionsBottomSheet = forwardRef(
  ({ cardId, hideCardInfoButton = false, isCardFrozen }: Props, ref: any) => {
    const { t } = useTranslation();
    const { navigate } = useNavigation();

    const { data } = useCard(cardId);
    const { data: user } = useUser();
    const { data: permissions } = useAllPermissions(user?.businessId!);

    const allocationPermissions = getAllocationPermissions(
      permissions?.userRoles,
      data?.card?.allocationId,
    );
    const showSpendControlsRow =
      Config.SHOW_ADMIN === 'true' &&
      allocationPermissions &&
      canManagePermissions(allocationPermissions);

    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [showSpendControlsRow]);
    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const [isFrozen, setIsFrozen] = useState<boolean>(isCardFrozen);

    const { mutateAsync: mutateFreeze, isLoading: isFreezing } = useFreezeCard(cardId);
    const { mutateAsync: mutateUnfreeze, isLoading: isUnfreezing } = useUnFreezeCard(cardId);

    const closePanel = () => {
      ref.current?.close();
    };

    const navigateToCardScreen = () => {
      closePanel();
      navigate(MainScreens.CardDetails, { cardId: cardId! });
    };

    useEffect(() => {
      setIsFrozen(isCardFrozen);
    }, [cardId, isCardFrozen]);

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
                onPress={() => {
                  // TODO: go to spend controls
                }}
              >
                <KeyIcon style={tw`mr-3 w-6`} color={tw.color('black')} />
                <CSText style={tw`text-base`}>{t('card.options.spendControls')}</CSText>
              </TouchableOpacity>
            )}
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

CardOptionsBottomSheet.defaultProps = {
  hideCardInfoButton: false,
};
