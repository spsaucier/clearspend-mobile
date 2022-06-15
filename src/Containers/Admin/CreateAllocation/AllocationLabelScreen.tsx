import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput } from 'react-native';

import { useNewAllocationContext } from '@/Hooks/useNewAllocationContext';
import {
  AdminScreens,
  AdminStackParamTypes,
  CreateAllocationScreens,
  CreateAllocationStackParamTypes,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '../Components/AdminScreenWrapper';

const AllocationLabelScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        CreateAllocationStackParamTypes & AdminStackParamTypes,
        CreateAllocationScreens.AllocationLabel
      >
    >();
  const { allocationLabel, setAllocationLabel } = useNewAllocationContext();

  return (
    <AdminScreenWrapper
      title={t('adminFlows.createAllocation.enterAllocationLabel')}
      onPrimaryAction={() => navigate(CreateAllocationScreens.AllocationAmount)}
      primaryActionDisabled={!allocationLabel}
      onClose={() => navigate(AdminScreens.Allocations)}
      edges={['top']}
    >
      <ScrollView style={tw`flex-1`}>
        <TextInput
          testID="allocation-label-input"
          style={tw`py-2 bg-white text-2xl font-telegraf font-light w-full`}
          autoFocus
          multiline
          value={allocationLabel}
          blurOnSubmit
          onChangeText={setAllocationLabel}
        />
      </ScrollView>
    </AdminScreenWrapper>
  );
};

export default AllocationLabelScreen;
