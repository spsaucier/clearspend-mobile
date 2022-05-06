import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { useAllPermissions } from '@/Queries/permissions';
import { CSText as Text, ActivityIndicator } from '@/Components';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { allocationTree, AllocationWithChildren } from '@/Helpers/AllocationHelpers';
import { ChevronIcon } from '@/Components/Icons';

interface AllocationOptionProps {
  allocations: AllocationWithChildren[];
  onSelect: (allocationId: string) => void;
  isRoot?: boolean;
}

const AllocationOption = ({ allocations, onSelect, isRoot = true }: AllocationOptionProps) => {
  if (!allocations) return null;

  return (
    <>
      {allocations.map((allocation, index, arr) => (
        <View key={allocation.allocationId}>
          <TouchableOpacity
            testID={`allocation-${index}-${allocation.name}`}
            style={tw.style('bg-tan', index === 0 && isRoot ? '' : 'mt-4')}
            onPress={() => onSelect(allocation.allocationId)}
          >
            {allocation.parentAllocationId && (
              <View style={tw`absolute justify-center top-0 bottom-0 w-4 -ml-4`}>
                <View style={tw`h-px bg-gray-10`} />
              </View>
            )}
            <View style={tw`flex-row items-center justify-between py-3 px-4 h-16`}>
              <View>
                <Text style={tw`text-sm mb-1`}>{allocation.name}</Text>
                <Text style={tw`text-sm text-gray-75`}>
                  Balance: {formatCurrency(allocation.account?.availableBalance?.amount)}
                </Text>
              </View>
              <ChevronIcon />
            </View>
          </TouchableOpacity>
          {allocation.children && (
            <View style={tw`pl-4 border-l border-gray-10 ml-2`}>
              <AllocationOption
                allocations={allocation.children}
                onSelect={onSelect}
                isRoot={false}
              />
            </View>
          )}
          {index === arr.length - 1 && (
            <View style={tw`absolute w-4 mt-px top-12 bottom-0 bg-white -ml-6`} />
          )}
        </View>
      ))}
    </>
  );
};

const AllocationScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.Allocation>>();
  const { setSelectedAllocationId } = useIssueCardContext();
  const { data, isLoading } = useAllPermissions();

  const onSelectAllocation = (allocationId: string) => {
    setSelectedAllocationId(allocationId);
    navigate(IssueCardScreens.SpendControls);
  };

  return (
    <AdminScreenWrapper
      testID="issue-card-allocation"
      title={t('adminFlows.issueCard.allocationTitle')}
      text={t('adminFlows.issueCard.allocationText')}
      edges={['top']}
    >
      {isLoading ? (
        <View style={tw`flex-1 items-center mt-16`}>
          <ActivityIndicator />
        </View>
      ) : (
        data?.allocations && (
          <ScrollView>
            <View style={tw`pb-16`}>
              <AllocationOption
                allocations={allocationTree(data.allocations)}
                onSelect={onSelectAllocation}
              />
            </View>
          </ScrollView>
        )
      )}
    </AdminScreenWrapper>
  );
};

export default AllocationScreen;
