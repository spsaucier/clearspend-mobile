import React from 'react';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const SpendControlsScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.SpendControls>>();

  return (
    <AdminScreenWrapper
      title={t('adminFlows.issueCard.spendControlsTitle')}
      text={t('adminFlows.issueCard.spendControlsText')}
      onPrimaryAction={() => {
        navigate(IssueCardScreens.CardConfirmation);
      }}
      onPrimaryActionLabel="Issue new card"
    />
  );
};

export default SpendControlsScreen;
