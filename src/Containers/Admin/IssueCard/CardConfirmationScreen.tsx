import React from 'react';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { MainScreens } from '@/Navigators/NavigatorTypes';

const CardConfirmationScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.CardConfirmation>
    >();

  return (
    <AdminScreenWrapper
      title={t('adminFlows.issueCard.cardConfirmationTitle')}
      onPrimaryAction={() => {
        navigate(MainScreens.Wallet);
      }}
      onPrimaryActionLabel="Return to dashboard"
      onSecondaryAction={() => {
        navigate(IssueCardScreens.CardType);
      }}
      onSecondaryActionLabel="Issue another card"
      hideBackButton
    />
  );
};

export default CardConfirmationScreen;
