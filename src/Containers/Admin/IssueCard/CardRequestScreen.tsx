import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import {
  IssueCardStackParamTypes,
  IssueCardScreens,
  AdminStackParamTypes,
  AdminScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { CSText as Text, ActivityIndicator } from '@/Components';
import { validateIssueCardRequest } from '@/Helpers/RequestHelpers';
import { useIssueCardRequest } from '@/Queries/card';

const CardRequestScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        IssueCardStackParamTypes & AdminStackParamTypes,
        IssueCardScreens.CardRequest
      >
    >();
  const { resetSelections, ...context } = useIssueCardContext();
  const { mutate: issueCard, isSuccess, isError, error } = useIssueCardRequest();

  useEffect(() => {
    if (isSuccess) navigate(IssueCardScreens.CardConfirmation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    const params = validateIssueCardRequest(context);
    if (params) issueCard(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminScreenWrapper
      testID="issue-card-card-request"
      onPrimaryAction={
        isError
          ? () => {
              resetSelections();
              navigate(AdminScreens.Home);
            }
          : undefined
      }
      onPrimaryActionLabel={t('adminFlows.issueCard.confirmationPrimaryActionCta')}
      hideBackButton
      hideCloseButton
    >
      {isError ? (
        <View style={tw`flex-1 justify-center items-center`}>
          {(error as any)?.response?.data?.message ? (
            <Text>{(error as any).response.data.message}</Text>
          ) : (
            <>
              <Text>{t('adminFlows.issueCard.cardRequestErrorTitle')}</Text>
              <Text style={tw`mt-2`}>{t('adminFlows.issueCard.cardRequestErrorText')}</Text>
            </>
          )}
        </View>
      ) : (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator />
          <Text style={tw`mt-6`}>{t('adminFlows.issueCard.cardRequestLoadingText')}</Text>
        </View>
      )}
    </AdminScreenWrapper>
  );
};

export default CardRequestScreen;
