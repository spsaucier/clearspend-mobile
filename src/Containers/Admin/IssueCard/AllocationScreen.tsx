import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
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
import { useAllPermissions } from '@/Queries/permissions';
import { ActivityIndicator } from '@/Components';
import { generateAllocationTree, getManageableAllocations } from '@/Helpers/AllocationHelpers';
import AllocationTree from '@/Containers/Admin/Components/AllocationTree';
import FadeOutGradient from '@/Components/FadeOutGradient';

const AllocationScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        IssueCardStackParamTypes & AdminStackParamTypes,
        IssueCardScreens.Allocation
      >
    >();
  const { selectedAllocationId, setSelectedAllocationId } = useIssueCardContext();
  const { data, isLoading } = useAllPermissions();

  const allocations = useMemo(
    () => generateAllocationTree(getManageableAllocations('MANAGE_CARDS', data)),
    [data],
  );

  return (
    <AdminScreenWrapper
      testID="issue-card-allocation"
      title={t('adminFlows.issueCard.allocationTitle')}
      text={t('adminFlows.issueCard.allocationText')}
      onPrimaryAction={() => navigate(IssueCardScreens.SpendControls)}
      primaryActionDisabled={!selectedAllocationId}
      onClose={() => navigate(AdminScreens.Employees)}
      edges={['top']}
    >
      {isLoading ? (
        <View style={tw`flex-1 items-center mt-16`}>
          <ActivityIndicator />
        </View>
      ) : (
        !!allocations?.length && (
          <>
            <ScrollView>
              <View style={tw`pb-32`}>
                <AllocationTree
                  allocations={allocations}
                  onSelectAllocation={setSelectedAllocationId}
                  selectedAllocationId={selectedAllocationId}
                />
              </View>
            </ScrollView>
            <View style={tw`mt-auto`}>
              <FadeOutGradient />
            </View>
          </>
        )
      )}
    </AdminScreenWrapper>
  );
};

export default AllocationScreen;
