import React, { useMemo } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import tw from '@/Styles/tailwind';
import { CSText as Text, FocusAwareStatusBar, Button } from '@/Components';
import { ActivityIndicator } from '@/Components/ActivityIndicator';
import { CloseCircleIcon, CheckMarkIcon, BusinessIcon } from '@/Components/Icons';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import {
  generateAllocationTree,
  getManageableAllocations,
  removeAllocationById,
  isRootAllocation,
} from '@/Helpers/AllocationHelpers';
import AllocationTree from '@/Containers/Admin/Components/AllocationTree';
import {
  AdminStackParamTypes,
  AdminScreens,
  ManageAllocationStackParamTypes,
  ManageAllocationScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { useManageAllocationContext } from '@/Hooks/useManageAllocationContext';
import { ReallocationType } from '@/Services/Admin/ManageAllocationProvider';
import useBankAccounts from '@/Hooks/useBankAccounts';

const ReallocationAccountScreen = () => {
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        ManageAllocationStackParamTypes & AdminStackParamTypes,
        ManageAllocationScreens.ReallocationAccount
      >
    >();
  const { t } = useTranslation();

  const {
    allocationId,
    reallocationType,
    targetAllocationId,
    setTargetAllocationId,
    allocations,
    userRoles,
    userType,
  } = useManageAllocationContext();

  const { data: bankAccounts, isLoading: isLoadingBankAccounts } = useBankAccounts({
    userType,
  });

  const allocationsNested = useMemo(
    () =>
      generateAllocationTree(
        getManageableAllocations(
          'MANAGE_FUNDS',
          removeAllocationById(allocationId, allocations, userRoles),
        ),
      ),
    [allocationId, allocations, userRoles],
  );

  return (
    <SafeAreaView testID="admin-allocations-add-or-remove-screen" style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={tw`flex-row items-center justify-between p-5`}>
        <BackButtonNavigator theme="light" />
        <TouchableOpacity onPress={() => navigate(AdminScreens.Allocations)}>
          <CloseCircleIcon />
        </TouchableOpacity>
      </View>
      <View style={tw`px-5`}>
        <View style={tw`mt-3 mb-4`}>
          <Text testID="title" style={tw`font-telegraf text-2xl font-light text-black`}>
            {reallocationType === ReallocationType.Add
              ? t('adminFlows.manageAllocation.addFundsTitle')
              : t('adminFlows.manageAllocation.removeFundsTitle')}
          </Text>
          <Text testID="text" style={tw`text-sm leading-normal text-gray-75 mt-2`}>
            {reallocationType === ReallocationType.Add
              ? t('adminFlows.manageAllocation.addFundsText')
              : t('adminFlows.manageAllocation.removeFundsText')}
          </Text>
        </View>
      </View>
      <View style={tw`flex-1`}>
        {isLoadingBankAccounts ? (
          <View style={tw`flex-1 items-center justify-center my-6`}>
            <ActivityIndicator />
          </View>
        ) : (
          !!allocationsNested?.length && (
            <>
              <ScrollView style={tw`px-5`}>
                <View style={tw`pb-32`}>
                  {isRootAllocation(allocationId, allocations) &&
                    bankAccounts &&
                    bankAccounts.map(({ businessBankAccountId, name, accountNumber }) => (
                      <TouchableOpacity
                        testID={`business-account-${name}`}
                        key={businessBankAccountId}
                        style={tw`bg-tan rounded-sm`}
                        onPress={() => setTargetAllocationId(businessBankAccountId)}
                      >
                        <View style={tw`flex-row py-3 px-4`}>
                          <View style={tw`items-center justify-center bg-white w-10 h-10`}>
                            <BusinessIcon />
                          </View>
                          <View style={tw`ml-4 flex-row flex-grow-1 items-center justify-between`}>
                            <View>
                              <Text style={tw`text-sm mb-1`}>{name}</Text>
                              <Text style={tw`text-sm text-gray-75`}>
                                •••• {String(accountNumber).slice(-4)}
                              </Text>
                            </View>
                            {targetAllocationId === businessBankAccountId && (
                              <CheckMarkIcon testID="check-mark-icon" />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  <AllocationTree
                    allocations={allocationsNested}
                    selectedAllocationId={targetAllocationId}
                    onSelectAllocation={setTargetAllocationId}
                  />
                </View>
              </ScrollView>
              <View style={tw`mt-auto p-5`}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                  style={tw`absolute -top-32 left-0 right-0 h-32`}
                  pointerEvents="none"
                />
                <Button
                  testID="primary-action-button"
                  label={t('adminFlows.nextStepCta')}
                  onPress={() => navigate(ManageAllocationScreens.ReallocationAmount)}
                  disabled={!targetAllocationId}
                />
              </View>
            </>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReallocationAccountScreen;
