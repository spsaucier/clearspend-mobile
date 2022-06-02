import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { AllocationWithChildren } from '@/Helpers/AllocationHelpers';
import { CheckMarkIcon, ChevronIconThin } from '@/Components/Icons';

const AllocationNode = ({
  node,
  nodesLength,
  index,
  isRoot,
  selectedAllocationId,
  onSelectAllocation,
}: { node: AllocationWithChildren; nodesLength: number; index: number } & Omit<
  Props,
  'allocations'
>) => {
  const [collapsed, setCollapsed] = useState(node.isCollapsed);

  return (
    <View testID={node.allocationId}>
      <View style={tw.style(`flex-row`, index === 0 && isRoot ? '' : 'mt-4')}>
        <TouchableOpacity
          testID={`${node.allocationId}-option`}
          style={tw`bg-tan rounded-sm flex-grow-1`}
          onPress={() => onSelectAllocation(node.allocationId)}
        >
          {node.parentAllocationId && (
            <View style={tw`absolute justify-center top-0 bottom-0 w-4 -ml-4`}>
              <View style={tw`h-px bg-gray-10`} />
            </View>
          )}
          <View style={tw`flex-row items-center justify-between py-3 px-4 h-16`}>
            <View>
              <Text style={tw`text-sm mb-1`}>{node.name}</Text>
              <Text style={tw`text-sm text-gray-75`}>
                Balance: {formatCurrency(node.account?.availableBalance?.amount)}
              </Text>
            </View>
            {node.allocationId === selectedAllocationId && (
              <CheckMarkIcon testID="check-mark-icon" />
            )}
          </View>
        </TouchableOpacity>
        {!!node?.children?.length && (
          <TouchableOpacity
            testID={`${node.allocationId}-toggle`}
            style={tw`flex items-center justify-center w-12 bg-tan rounded-sm ml-2`}
            onPress={() => {
              node.isCollapsed = !collapsed;
              setCollapsed(node.isCollapsed);
            }}
          >
            <ChevronIconThin style={{ transform: [{ rotate: collapsed ? `90deg` : `270deg` }] }} />
          </TouchableOpacity>
        )}
      </View>
      {!collapsed && !!node?.children?.length && (
        <View style={tw`pl-4 border-l border-gray-10 ml-2`}>
          <AllocationTree
            allocations={node.children}
            onSelectAllocation={onSelectAllocation}
            isRoot={false}
            selectedAllocationId={selectedAllocationId}
          />
        </View>
      )}
      {index === nodesLength - 1 && (
        <View style={tw`absolute w-4 mt-px top-12 bottom-0 bg-white -ml-6`} />
      )}
    </View>
  );
};

interface Props {
  allocations: AllocationWithChildren[];
  onSelectAllocation: (allocationId: string) => void;
  isRoot?: boolean;
  selectedAllocationId?: string;
}

const AllocationTree = ({ allocations, ...rest }: Props) => {
  if (!allocations || !allocations.length) return null;

  return (
    <>
      {allocations.map((allocation, index, arr) => (
        <AllocationNode
          key={allocation.allocationId}
          node={allocation}
          index={index}
          nodesLength={arr.length}
          {...rest}
        />
      ))}
    </>
  );
};

export default AllocationTree;
