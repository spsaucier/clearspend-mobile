import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { AllocationWithChildren } from '@/Helpers/AllocationHelpers';
import { CheckMarkIcon, ChevronIconThin } from '@/Components/Icons';
import useForceUpdate from '@/Hooks/useForceUpdate';

interface Props {
  allocations: AllocationWithChildren[];
  onSelect: (allocationId: string) => void;
  isRoot?: boolean;
  selectedAllocationId?: string;
}

const AllocationTree = ({ allocations, onSelect, isRoot = true, selectedAllocationId }: Props) => {
  const forceUpdate = useForceUpdate();

  if (!allocations) return null;

  return (
    <>
      {allocations.map((allocation, index, arr) => (
        <View key={allocation.allocationId} testID={allocation.allocationId}>
          <View style={tw.style(`flex-row`, index === 0 && isRoot ? '' : 'mt-4')}>
            <TouchableOpacity
              testID={`${allocation.allocationId}-option`}
              style={tw`bg-tan rounded-sm flex-grow-1`}
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
                {allocation.allocationId === selectedAllocationId && (
                  <CheckMarkIcon
                    testID="check-mark-icon"
                    style={tw`w-4`}
                    color={tw.color('black')}
                  />
                )}
              </View>
            </TouchableOpacity>
            {allocation.children && (
              <TouchableOpacity
                testID={`${allocation.allocationId}-toggle`}
                style={tw`flex items-center justify-center w-12 bg-tan rounded-sm ml-2`}
                onPress={() => {
                  allocation.isCollapsed = !allocation.isCollapsed;
                  forceUpdate();
                }}
              >
                <ChevronIconThin
                  style={{ transform: [{ rotate: allocation?.isCollapsed ? `90deg` : `270deg` }] }}
                />
              </TouchableOpacity>
            )}
          </View>
          {!allocation.isCollapsed && allocation.children && (
            <View style={tw`pl-4 border-l border-gray-10 ml-2`}>
              <AllocationTree
                allocations={allocation.children}
                onSelect={onSelect}
                isRoot={false}
                selectedAllocationId={selectedAllocationId}
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

export default AllocationTree;
