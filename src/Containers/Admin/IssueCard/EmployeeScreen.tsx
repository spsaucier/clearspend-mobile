import React from 'react';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const EmployeeScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.Employee>>();

  return (
    <AdminScreenWrapper
      title={t('adminFlows.issueCard.employeeTitle')}
      onPrimaryAction={() => {
        navigate(IssueCardScreens.CardDetails);
      }}
    />
  );
};

export default EmployeeScreen;
