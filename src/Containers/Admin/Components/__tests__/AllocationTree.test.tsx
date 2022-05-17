import React from 'react';
import { View } from 'react-native';
import { render, fireEvent, within } from '@testing-library/react-native';
import AllocationTree from '../AllocationTree';
import { generateAllocationTree, AllocationWithChildren } from '@/Helpers/AllocationHelpers';
import { fiveLevelsDeepResponse } from '@/Helpers/testing/fixtures/allocations';

describe('AllocationTree', () => {
  it('renders default state', () => {
    const { getByTestId } = render(
      <View>
        <AllocationTree
          allocations={generateAllocationTree(
            fiveLevelsDeepResponse.allocations as AllocationWithChildren[],
          )}
          onSelectAllocation={jest.fn()}
        />
      </View>,
    );

    fiveLevelsDeepResponse.allocations.forEach((a) => {
      expect(getByTestId(a.allocationId)).toBeTruthy();
    });
  });

  it('allocations with children are collapsible', () => {
    const { allocationId: parentId } =
      fiveLevelsDeepResponse.allocations.find((a) => a.allocationId === '1-1-1-1') || {};
    const { allocationId: childId } =
      fiveLevelsDeepResponse.allocations.find((a) => a.allocationId === '1-1-1-1-1') || {};

    const { getByTestId, queryByTestId } = render(
      <View>
        <AllocationTree
          allocations={generateAllocationTree(
            fiveLevelsDeepResponse.allocations as AllocationWithChildren[],
          )}
          onSelectAllocation={jest.fn()}
        />
      </View>,
    );

    const parent = getByTestId(parentId!);
    const child = getByTestId(childId!);

    expect(parent).toBeTruthy();
    expect(child).toBeTruthy();

    const toggle = within(parent).queryByTestId(`${parentId}-toggle`);

    fireEvent.press(toggle!);

    expect(queryByTestId(childId!)).toBeNull();
  });

  it('allocations with no children (leafs) are not collapsible', () => {
    const { allocationId: leafId } =
      fiveLevelsDeepResponse.allocations.find((a) => a.allocationId === '1-1-1-1-1') || {};

    const { getByTestId } = render(
      <View>
        <AllocationTree
          allocations={generateAllocationTree(
            fiveLevelsDeepResponse.allocations as AllocationWithChildren[],
          )}
          onSelectAllocation={jest.fn()}
        />
      </View>,
    );

    const leaf = getByTestId(leafId!);

    expect(within(leaf).queryByTestId(`${leafId}-toggle`)).toBeNull();
  });

  it('calls `onSelectAllocation` with `allocationId`', () => {
    const allocation = fiveLevelsDeepResponse.allocations.find(
      (a) => a.allocationId === '1-1-1-1-1',
    );

    const onSelectAllocationMock = jest.fn();

    const { getByTestId } = render(
      <View>
        <AllocationTree
          allocations={generateAllocationTree(
            fiveLevelsDeepResponse.allocations as AllocationWithChildren[],
          )}
          onSelectAllocation={onSelectAllocationMock}
        />
      </View>,
    );

    const barkfeast = getByTestId(`${allocation!.allocationId}-option`);

    fireEvent.press(barkfeast);

    expect(onSelectAllocationMock).toBeCalledWith(allocation!.allocationId);
  });
});
