import React from 'react';
import { View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '@/Styles/tailwind';
import { CSText as Text, FocusAwareStatusBar, Button } from '@/Components';
import { ActivityIndicator } from '@/Components/ActivityIndicator';
import { CloseCircleIcon } from '@/Components/Icons';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import {
  getFromToAllocations,
  validateAllocationAmount,
  isBankTransfer,
} from '@/Helpers/AllocationHelpers';
import {
  AdminStackParamTypes,
  AdminScreens,
  ManageAllocationStackParamTypes,
  ManageAllocationScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { useManageAllocationContext } from '@/Hooks/useManageAllocationContext';
import { formatCurrency } from '@/Helpers/StringHelpers';
import useBankAccounts from '@/Hooks/useBankAccounts';

const FromOrToTile = ({
  amount,
  name,
  fromOrTo,
}: {
  amount?: number;
  name?: string;
  fromOrTo?: 'FROM' | 'TO';
}) => (
  <View testID={`${fromOrTo}-tile`} style={tw`w-1/2 px-2.5`}>
    <Text style={tw`text-2xs font-medium uppercase tracking-widest mb-1.5`}>{fromOrTo}</Text>
    <View style={tw`bg-tan flex-grow-1 justify-center py-6`}>
      <Text style={tw`text-2xs text-center uppercase tracking-widest font-medium`}>{name}</Text>
      {typeof amount === 'number' && (
        <Text style={tw`text-center mt-2`}>{formatCurrency(amount)}</Text>
      )}
    </View>
  </View>
);

const ReallocationAmountScreen = () => {
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        ManageAllocationStackParamTypes & AdminStackParamTypes,
        ManageAllocationScreens.ReallocationAmount
      >
    >();
  const { t } = useTranslation();

  const {
    allocationId,
    reallocationType,
    targetAllocationId,
    amount,
    setAmount,
    allocations,
    userType,
  } = useManageAllocationContext();

  const { data: bankAccounts, isLoading: isLoadingBankAccounts } = useBankAccounts({
    allocationId,
    allocations,
    userType,
  });

  const fromToAccounts = getFromToAllocations({
    allocationId,
    reallocationType,
    targetAllocationId,
    allocations,
    bankAccounts,
  });

  return (
    <KeyboardAvoidingView
      testID="admin-allocations-transfer-amount-screen"
      behavior="padding"
      style={tw`flex-1 bg-white`}
    >
      <SafeAreaView style={tw`flex-1 px-5`}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <View style={tw`flex-row items-center justify-between py-5`}>
          <BackButtonNavigator theme="light" />
          <TouchableOpacity onPress={() => navigate(AdminScreens.Allocations)}>
            <CloseCircleIcon />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-1`}>
          {isLoadingBankAccounts ? (
            <View style={tw`flex-1 items-center justify-center my-6`}>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              <View style={tw`mt-3 mb-4`}>
                <Text testID="title" style={tw`font-telegraf text-2xl font-light text-black`}>
                  {t('adminFlows.manageAllocation.enterAmount')}
                </Text>
              </View>
              <View style={tw`flex-row items-center mb-8`}>
                <Text style={tw`text-2xl font-telegraf font-light mr-2 text-gray-50`}>$</Text>
                <TextInput
                  testID="amount-input"
                  style={tw`py-2 bg-white text-2xl font-telegraf font-light flex-grow-1`}
                  keyboardType="decimal-pad"
                  autoFocus
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
              {fromToAccounts && (
                <View style={tw`flex-row -mx-2.5`}>
                  {fromToAccounts.map((a, i) => (
                    <FromOrToTile
                      key={a.id}
                      name={a?.name}
                      amount={a.amount}
                      fromOrTo={i === 0 ? 'FROM' : 'TO'}
                    />
                  ))}
                </View>
              )}
              <View style={tw`mt-auto`}>
                <Button
                  testID="primary-action-button"
                  label={t('adminFlows.manageAllocation.updateBalanceCta')}
                  onPress={() => {
                    if (isBankTransfer(fromToAccounts)) {
                      navigate(ManageAllocationScreens.BankTransferRequest);
                    } else {
                      navigate(ManageAllocationScreens.ReallocationRequest);
                    }
                  }}
                  disabled={!validateAllocationAmount(amount)}
                />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ReallocationAmountScreen;
