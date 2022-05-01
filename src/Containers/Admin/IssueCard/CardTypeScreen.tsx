import React from 'react';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const CardTypeScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.CardType>>();

  return (
    <AdminScreenWrapper
      title={t('adminFlows.issueCard.cardTypeTitle')}
      text={t('adminFlows.issueCard.cardTypeText')}
      onPrimaryAction={() => {
        navigate(IssueCardScreens.Employee);
      }}
    />
  );
};

export default CardTypeScreen;
