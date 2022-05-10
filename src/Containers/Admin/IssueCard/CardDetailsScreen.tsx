import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { CSText as Text, ToggleSwitch } from '@/Components';

const CardDetailsScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.CardDetails>>();
  const { selectedIsPersonal, setSelectedIsPersonal } = useIssueCardContext();

  return (
    <AdminScreenWrapper
      testID="issue-card-card-details"
      title={t('adminFlows.issueCard.cardDetailsTitle')}
      onPrimaryAction={() => {
        navigate(IssueCardScreens.Address);
      }}
    >
      <View style={tw`flex-row justify-between items-center rounded p-4 bg-tan`}>
        <Text>{t('adminFlows.issueCard.cardDetailsLabel')}</Text>
        <ToggleSwitch
          testID={selectedIsPersonal ? 'card-details-switch-on' : 'card-details-switch-off'}
          toggleSwitch={setSelectedIsPersonal}
          value={!!selectedIsPersonal}
        />
      </View>
    </AdminScreenWrapper>
  );
};

export default CardDetailsScreen;
