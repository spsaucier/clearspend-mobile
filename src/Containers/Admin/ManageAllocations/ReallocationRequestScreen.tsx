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
import { validateReallocationRequest } from '@/Helpers/RequestHelpers';
import { useManageAllocationContext } from '@/Hooks/useManageAllocationContext';
import { useReallocationRequest } from '@/Queries/business';
import RequestsScreenView from '@/Containers/Admin/Components/RequestScreenView';

const ReallocationRequestScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        ManageAllocationStackParamTypes & AdminStackParamTypes,
        ManageAllocationScreens.ReallocationRequest
      >
    >();
  const context = useManageAllocationContext();
  const { mutate: reallocateFunds, isSuccess, isError, error } = useReallocationRequest();

  useEffect(() => {
    if (isSuccess) navigate(ManageAllocationScreens.ReallocationConfirmation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    const params = validateReallocationRequest(context);
    if (params) reallocateFunds(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequestsScreenView
      isError={isError}
      error={error}
      errorTitle={t('adminFlows.manageAllocation.reallocationRequestErrorTitle')}
      errorText={t('adminFlows.manageAllocation.reallocationRequestErrorText')}
      requestText={t('adminFlows.manageAllocation.reallocationRequestLoadingText')}
      onPrimaryAction={() => navigate(AdminScreens.Home)}
      onPrimaryActionLabel={t('adminFlows.manageAllocation.confirmationPrimaryActionCta')}
    />
  );
};

export default ReallocationRequestScreen;
