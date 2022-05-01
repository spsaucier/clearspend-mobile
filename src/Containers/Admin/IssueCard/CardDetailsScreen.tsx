import React from 'react';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const CardDetailsScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.CardDetails>>();

  return (
    <AdminScreenWrapper
      title={t('adminFlows.issueCard.cardDetailsTitle')}
      onPrimaryAction={() => {
        navigate(IssueCardScreens.Address);
      }}
    />
  );
};

export default CardDetailsScreen;
