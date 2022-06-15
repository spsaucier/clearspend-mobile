import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';

import { useNewAllocationContext } from '@/Hooks/useNewAllocationContext';
import {
  AdminScreens,
  AdminStackParamTypes,
  CreateAllocationStackParamTypes,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '../Components/AdminScreenWrapper';
import { CSText, LetterAvatar } from '@/Components';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { findAllocationNodeGivenNodes } from '@/Helpers/AllocationHelpers';
import { useCreateAllocation } from '@/Queries/allocation';
import { getUserInitials } from '@/Helpers/UserNameHelper';

const ConfirmDetailsScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<CreateAllocationStackParamTypes & AdminStackParamTypes>
    >();
  const {
    allocationLabel,
    selectedParentAllocationId,
    allocationAmount,
    selectedManagers,
    selectedViewers,
    allocations,
  } = useNewAllocationContext();

  const parentAllocation = findAllocationNodeGivenNodes(selectedParentAllocationId!, allocations!);
  const { mutateAsync: createAllocation, isLoading } = useCreateAllocation();

  const onCreateAllocation = () => {
    const {
      account: { availableBalance },
    } = parentAllocation!;
    const { currency } = availableBalance!;

    const amount = Number(allocationAmount);

    createAllocation({
      parentAllocationId: selectedParentAllocationId!,
      name: allocationLabel!,
      amount: { amount, currency: currency! },
      limits: [
        {
          currency: currency!,
          typeMap: {
            ACH_DEPOSIT: {
              DAILY: { amount },
              INSTANT: { amount },
              MONTHLY: { amount },
            },
            ACH_WITHDRAW: {
              DAILY: { amount },
              INSTANT: { amount },
              MONTHLY: { amount },
            },
            PURCHASE: {
              DAILY: { amount },
              INSTANT: { amount },
              MONTHLY: { amount },
            },
          },
        },
      ],
      disableForeign: false,
      disabledMccGroups: [],
      disabledPaymentTypes: [],
    })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: t('adminFlows.createAllocation.confirmDetails.createSuccess'),
        });
        navigate(AdminScreens.Allocations);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: t('error.generic'),
        });
      });
  };

  return (
    <AdminScreenWrapper
      title={t('adminFlows.createAllocation.confirmDetails.title')}
      onPrimaryAction={onCreateAllocation}
      onPrimaryActionLabel={t('adminFlows.createAllocation.confirmDetails.createNewAllocation')}
      onClose={() => navigate(AdminScreens.Allocations)}
      primaryActionDisabled={isLoading}
      processing={isLoading}
      edges={['top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <CSText style={tw`uppercase text-2xs`}>
          {t('adminFlows.createAllocation.confirmDetails.allocationLabel')}
        </CSText>
        <CSText style={tw`mt-1 text-sm`} testID="allocationLabel">
          {allocationLabel}
        </CSText>

        <CSText style={tw`mt-4 uppercase text-2xs`}>
          {t('adminFlows.createAllocation.confirmDetails.parentAllocation')}
        </CSText>
        <CSText style={tw`mt-1 text-sm`} testID="parentAllocationName">
          {parentAllocation?.name}
        </CSText>

        <CSText style={tw`mt-4 uppercase text-2xs`}>
          {t('adminFlows.createAllocation.confirmDetails.balance')}
        </CSText>
        <CSText style={tw`mt-1 text-sm`} testID="allocationAmount">
          {formatCurrency(Number(allocationAmount))}
        </CSText>

        <View style={tw`w-full border-1 border-gray-10 mt-4`} />

        <CSText style={tw`mt-5 text-2xs uppercase`} testID="manager-header">
          {selectedManagers.length === 1
            ? t('adminFlows.createAllocation.confirmDetails.manager')
            : t('adminFlows.createAllocation.confirmDetails.managers')}
        </CSText>

        <View testID="manager-container">
          {selectedManagers.map((x) => (
            <View key={x.userId!} style={tw`flex-row items-center mt-2`}>
              <LetterAvatar size={24} initials={getUserInitials(x)} />
              <CSText style={tw`pl-2`}>{`${x.firstName} ${x.lastName}`}</CSText>
            </View>
          ))}
        </View>

        <CSText style={tw`mt-4 text-2xs uppercase`} testID="viewer-header">
          {selectedViewers.length === 1
            ? t('adminFlows.createAllocation.confirmDetails.viewer')
            : t('adminFlows.createAllocation.confirmDetails.viewers')}
        </CSText>

        <View testID="viewer-container">
          {selectedViewers.map((v) => (
            <View key={v.userId!} style={tw`flex-row items-center mt-2`}>
              <LetterAvatar size={24} initials={getUserInitials(v)} />
              <CSText style={tw`pl-2`}>{`${v.firstName} ${v.lastName}`}</CSText>
            </View>
          ))}
        </View>
      </ScrollView>
    </AdminScreenWrapper>
  );
};

export default ConfirmDetailsScreen;
