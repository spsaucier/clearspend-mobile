import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';
import { User } from 'generated/capital';
import { WalletScreens, TransactionStackProps } from '@/Navigators/Wallet/WalletNavigatorTypes';
import { EyeIcon, SnowflakeIcon, KeyIcon } from '@/Components/Icons';
import {
  useFreezeCard,
  useUnFreezeCard,
  // useCard
} from '@/Queries';
// import { useSpendControls } from '@/Hooks/useSpendControls';
import { useAllPermissions } from '@/Queries/permissions';
import { showAdmin } from '@/Helpers/PermissionsHelpers';
import { useFeatureFlag } from '@/Hooks/useFeatureFlag';
import { ArchiveIcon } from '@/Components/Icons/archiveIcon';
import { useCancelCard } from '@/Queries/card';
import OptionsBottomSheet from '@/Components/OptionsBottomSheet';
import OptionsBottomSheetButton from '@/Components/OptionsBottomSheetButton';
import { useAdminContext } from '@/Hooks/useAdminContext';
import { AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

type Props = {
  cardId: string | undefined;
  hideCardInfoButton?: boolean;
  isCardFrozen: boolean;
  setIsCancelling: Dispatch<SetStateAction<boolean>>;
  nextIndex: number | undefined;
  employee?: User;
};

export const CardOptionsBottomSheet = forwardRef(
  (
    {
      cardId,
      hideCardInfoButton = false,
      isCardFrozen,
      setIsCancelling,
      nextIndex,
      employee,
    }: Props,
    ref: any,
  ) => {
    const { t } = useTranslation();
    const { isAdmin } = useAdminContext();
    const { navigate } = useNavigation<TransactionStackProps>();

    // TODO support multiple allocations/spend controls on cards
    // const { data } = useCard(cardId);
    const showSpendControlsRow = false; // useSpendControls(data?.card?.allocationId);

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
      navigate(WalletScreens.CardDetails, { cardId: cardId! });
    };

    const navigateToCardSpendControlScreen = () => {
      closePanel();
      navigate(WalletScreens.CardSpendControl, { cardId: cardId! });
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

    const confirmCardCancel = useCallback(() => {
      closePanel();
      mutateCancel({ cardId })
        .then(() => {
          if (isAdmin && employee) {
            navigate(AdminScreens.EmployeeWallet, { employee, initialFocusCardIdx: nextIndex });
          } else {
            navigate(WalletScreens.Home, { initialFocusCardIdx: nextIndex });
          }

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
      <OptionsBottomSheet ref={ref} title={t('card.options.cardOptions')}>
        <OptionsBottomSheetButton
          text={
            isFreezing || isUnfreezing
              ? t(isUnfreezing ? 'card.options.unfreezingCard' : 'card.options.freezingCard')
              : t(isFrozen ? 'card.options.unfreezeCard' : 'card.options.freezeCard')
          }
          onPress={() => {
            if (!isFrozen) freeze();
            else unfreeze();
          }}
          disabled={isFreezing || isUnfreezing}
          icon={SnowflakeIcon}
        />
        {!hideCardInfoButton && !isFrozen && !isFreezing && !isUnfreezing && (
          <OptionsBottomSheetButton
            icon={EyeIcon}
            text={t('card.options.showCardInfo')}
            onPress={navigateToCardScreen}
          />
        )}
        {showSpendControlsRow && (
          <OptionsBottomSheetButton
            icon={KeyIcon}
            text={t('card.options.spendControls')}
            onPress={navigateToCardSpendControlScreen}
          />
        )}
        {showCancelCardOption && (
          <OptionsBottomSheetButton
            text={t('card.options.cancelCard')}
            icon={ArchiveIcon}
            onPress={cancelAlert}
          />
        )}
      </OptionsBottomSheet>
    );
  },
);

CardOptionsBottomSheet.defaultProps = {
  hideCardInfoButton: false,
  employee: undefined,
};
