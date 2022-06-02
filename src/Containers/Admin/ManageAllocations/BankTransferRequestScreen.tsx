import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import {
  ManageAllocationStackParamTypes,
  ManageAllocationScreens,
  AdminStackParamTypes,
  AdminScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { validateBankTransferRequest } from '@/Helpers/RequestHelpers';
import { useManageAllocationContext } from '@/Hooks/useManageAllocationContext';
import { useBankTransactionRequest } from '@/Queries/business';
import RequestsScreenView from '@/Containers/Admin/Components/RequestScreenView';

const BankTransferRequestScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        ManageAllocationStackParamTypes & AdminStackParamTypes,
        ManageAllocationScreens.BankTransferRequest
      >
    >();
  const { targetAllocationId = '', amount, reallocationType } = useManageAllocationContext();
  const {
    mutate: transferFunds,
    isSuccess,
    isError,
    error,
  } = useBankTransactionRequest({ businessBankAccountId: targetAllocationId });

  useEffect(() => {
    if (isSuccess) navigate(ManageAllocationScreens.ReallocationConfirmation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    const params = validateBankTransferRequest({ reallocationType, amount });
    if (params) transferFunds(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequestsScreenView
      isError={isError}
      error={error}
      errorTitle={t('adminFlows.manageAllocation.bankTransferRequestErrorTitle')}
      errorText={t('adminFlows.manageAllocation.bankTransferRequestErrorText')}
      requestText={t('adminFlows.manageAllocation.bankTransferRequestLoadingText')}
      onPrimaryAction={() => navigate(AdminScreens.Home)}
      onPrimaryActionLabel={t('adminFlows.manageAllocation.confirmationPrimaryActionCta')}
    />
  );
};

export default BankTransferRequestScreen;
