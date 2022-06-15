import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '@/Styles/tailwind';
import { useNewAllocationContext } from '@/Hooks/useNewAllocationContext';
import {
  AdminScreens,
  AdminStackParamTypes,
  CreateAllocationScreens,
  CreateAllocationStackParamTypes,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import AdminScreenWrapper from '../Components/AdminScreenWrapper';
import AllocationTree from '../Components/AllocationTree';
import FadeOutGradient from '@/Components/FadeOutGradient';

const ParentAllocationScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<CreateAllocationStackParamTypes & AdminStackParamTypes>
    >();
  const {
    selectedParentAllocationId,
    setSelectedParentAllocationId,
    isLoadingAllocations,
    allocations,
  } = useNewAllocationContext();

  return (
    <AdminScreenWrapper
      title={t('adminFlows.createAllocation.parentAllocationTitle')}
      text={t('adminFlows.createAllocation.parentAllocationInstruction')}
      onPrimaryAction={() => navigate(CreateAllocationScreens.AllocationLabel)}
      primaryActionDisabled={!selectedParentAllocationId}
      hideBackButton
      onClose={() => navigate(AdminScreens.Allocations)}
      edges={['top']}
    >
      {isLoadingAllocations ? (
        <View style={tw`flex-1 items-center mt-16`}>
          <ActivityIndicator />
        </View>
      ) : (
        !!allocations?.length && (
          <>
            <ScrollView contentContainerStyle={tw`pb-16`}>
              <AllocationTree
                allocations={allocations}
                onSelectAllocation={setSelectedParentAllocationId}
                selectedAllocationId={selectedParentAllocationId}
              />
            </ScrollView>
            <View style={tw`mt-auto`}>
              <FadeOutGradient position="-top-32" />
            </View>
          </>
        )
      )}
    </AdminScreenWrapper>
  );
};

export default ParentAllocationScreen;
