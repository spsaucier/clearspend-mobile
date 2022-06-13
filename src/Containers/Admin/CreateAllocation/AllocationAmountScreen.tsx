import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, View } from 'react-native';

import { useNewAllocationContext } from '@/Hooks/useNewAllocationContext';
import {
  AdminScreens,
  AdminStackParamTypes,
  CreateAllocationScreens,
  CreateAllocationStackParamTypes,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '../Components/AdminScreenWrapper';
import { findAllocationNodeGivenNodes } from '@/Helpers/AllocationHelpers';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { CSText } from '@/Components';

const AllocationAmountScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        CreateAllocationStackParamTypes & AdminStackParamTypes,
        CreateAllocationScreens.ParentAllocation
      >
    >();
  const { allocationAmount, setAllocationAmount, allocations, selectedParentAllocationId } =
    useNewAllocationContext();

  const parentAllocation = findAllocationNodeGivenNodes(selectedParentAllocationId!, allocations!);
  const maxParentAllocationAmount = parentAllocation?.account.availableBalance?.amount || 0;

  useEffect(() => {
    if (Number(allocationAmount || 0) > maxParentAllocationAmount) {
      setAllocationAmount(undefined);
    }
    // runs once: resets allocation amount in case user returned to parent allocation screen and selected another parent allocation with a lower balance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxParentAllocationAmount, setAllocationAmount]);

  return (
    <AdminScreenWrapper
      title={t('adminFlows.createAllocation.enterAllocationAmount')}
      text={t('adminFlows.createAllocation.enterAllocationAmountBalance', {
        amount: formatCurrency(maxParentAllocationAmount),
      })}
      onPrimaryAction={() => navigate(CreateAllocationScreens.SelectManagers)}
      primaryActionDisabled={!allocationAmount}
      onClose={() => navigate(AdminScreens.Allocations)}
    >
      <ScrollView style={tw`flex-1`}>
        <View style={tw`flex-row items-center`}>
          <CSText style={tw`text-2xl`}>$</CSText>
          <TextInput
            keyboardType="decimal-pad"
            testID="allocation-amount-input"
            autoFocus
            style={tw`py-2 bg-white text-2xl font-telegraf font-light flex-grow-1`}
            value={allocationAmount?.toString()}
            onChangeText={(newValue) => {
              setAllocationAmount(newValue);
            }}
          />
        </View>
      </ScrollView>
    </AdminScreenWrapper>
  );
};

export default AllocationAmountScreen;
