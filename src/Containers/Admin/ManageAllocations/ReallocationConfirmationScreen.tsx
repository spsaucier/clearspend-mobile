import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '@/Styles/tailwind';
import { useAllPermissions } from '@/Queries/permissions';
import { CSText as Text, FocusAwareStatusBar, Button } from '@/Components';
import { ExclamationIcon } from '@/Components/Icons';
import { ActivityIndicator } from '@/Components/ActivityIndicator';
import {
  getFromToAllocations,
  FromToAccount,
  getBankAccountIndex,
  validateAllocationAmount,
} from '@/Helpers/AllocationHelpers';
import {
  AdminStackParamTypes,
  AdminScreens,
  ManageAllocationStackParamTypes,
  ManageAllocationScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { useManageAllocationContext } from '@/Hooks/useManageAllocationContext';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { ReallocationType } from '@/Services/Admin/ManageAllocationProvider';
import useBankAccounts from '@/Hooks/useBankAccounts';

export const FromOrToRow = ({
  amount,
  name,
  isBankAccount,
  bankAccountText,
}: FromToAccount & { bankAccountText?: string }) => (
  <View testID={`${name}-row`} style={tw`bg-tan px-4 py-3 mb-1`}>
    {isBankAccount ? (
      <View style={tw`flex-row items-center`}>
        <ExclamationIcon size={20} />
        <Text style={tw`text-xs ml-2`}>{bankAccountText}</Text>
      </View>
    ) : (
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`text-sm`}>{name}</Text>
        <Text style={tw`text-sm`}>{formatCurrency(amount)}</Text>
      </View>
    )}
  </View>
);

const ReallocationConfirmationScreen = () => {
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        ManageAllocationStackParamTypes & AdminStackParamTypes,
        ManageAllocationScreens.ReallocationConfirmation
      >
    >();
  const { t } = useTranslation();

  const { allocationId, reallocationType, targetAllocationId, amount, userType } =
    useManageAllocationContext();

  // refetch allocations to see updated amounts
  const { data } = useAllPermissions();

  const { data: bankAccounts, isLoading: isLoadingBankAccounts } = useBankAccounts({
    allocationId,
    allocations: data?.allocations,
    userType,
  });

  let fromToAccounts =
    data?.allocations &&
    getFromToAllocations({
      allocationId,
      reallocationType,
      targetAllocationId,
      allocations: data.allocations,
      bankAccounts,
    });

  if (fromToAccounts && getBankAccountIndex(fromToAccounts) === 0) {
    fromToAccounts = [fromToAccounts[1], fromToAccounts[0]];
  }

  return (
    <SafeAreaView
      testID="manage-allocations-reallocation-confirmation-screen"
      style={tw`flex-1 bg-white px-5`}
      edges={['top', 'bottom']}
    >
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {isLoadingBankAccounts ? (
        <View style={tw`flex-1 items-center justify-center my-6`}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={tw`mt-24 mb-4`}>
          <Text testID="title" style={tw`font-telegraf text-2xl font-light text-black`}>
            {t('adminFlows.manageAllocation.confirmationTitle')}
          </Text>
          {fromToAccounts && (
            <Text testID="text" style={tw`text-sm leading-normal text-gray-75 mt-4 mb-8`}>
              <Trans
                i18nKey={t('adminFlows.manageAllocation.confirmationText', {
                  amount: formatCurrency(validateAllocationAmount(amount)),
                  allocationFrom: fromToAccounts[0].name,
                  allocationTo: fromToAccounts[1].name,
                  reallocationTypePastTense:
                    reallocationType === ReallocationType.Add ? 'added' : 'removed',
                  interpolation: { escapeValue: false },
                })}
                components={{
                  key1: <Text style={tw`text-sm font-semibold`} />,
                  key2: <Text style={tw`text-sm font-semibold`} />,
                  key3: <Text style={tw`text-sm font-semibold`} />,
                }}
              />
            </Text>
          )}
          <Text style={tw`text-2xs font-medium uppercase tracking-widest mb-2`}>
            {t('adminFlows.manageAllocation.updatedBalances')}
          </Text>
          {fromToAccounts && (
            <View testID="confirmation-summary">
              {fromToAccounts.map((a) => (
                <FromOrToRow
                  key={a.id}
                  {...a}
                  bankAccountText={t(
                    'adminFlows.manageAllocation.bankTransferConfirmationDisclaimer',
                  )}
                />
              ))}
            </View>
          )}
        </View>
      )}
      <View style={tw`mt-auto py-5`}>
        <Button
          testID="primary-action-button"
          label={t('adminFlows.manageAllocation.confirmationPrimaryActionCta')}
          onPress={() => navigate(AdminScreens.Home)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReallocationConfirmationScreen;
