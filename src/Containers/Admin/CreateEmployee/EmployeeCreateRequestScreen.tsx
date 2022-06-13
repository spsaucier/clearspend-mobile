import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import {
  CreateEmployeeStackParamTypes,
  CreateEmployeeScreens,
  AdminStackParamTypes,
  AdminScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { validateCreateEmployeeRequest } from '@/Helpers/RequestHelpers';
import RequestsScreenView from '@/Containers/Admin/Components/RequestScreenView';
import { useCreateEmployeeContext } from '@/Hooks/useCreateEmployeeContext';
import { useCreateUser } from '@/Queries/user';

const EmployeeCreateRequestScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        CreateEmployeeStackParamTypes & AdminStackParamTypes,
        CreateEmployeeScreens.EmployeeCreateRequest
      >
    >();
  const context = useCreateEmployeeContext();
  const { data, mutate: createUser, isError, error } = useCreateUser();

  useEffect(() => {
    if (data) navigate(CreateEmployeeScreens.EmployeeConfirmation, { userId: data.userId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const params = validateCreateEmployeeRequest(context);
    if (params) createUser(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequestsScreenView
      isError={isError}
      error={error}
      errorTitle={t('adminFlows.createEmployee.employeeRequestErrorTitle')}
      errorText={t('adminFlows.createEmployee.employeeRequestErrorText')}
      requestText={t('adminFlows.createEmployee.employeeRequestLoadingText')}
      onPrimaryAction={() => navigate(AdminScreens.Employees)}
      onPrimaryActionLabel={t('adminFlows.createEmployee.confirmationPrimaryActionCta')}
    />
  );
};

export default EmployeeCreateRequestScreen;
