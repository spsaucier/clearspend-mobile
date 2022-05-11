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
          allocations={generateAllocationTree(fiveLevelsDeepResponse as AllocationWithChildren[])}
          onSelect={jest.fn()}
        />
      </View>,
    );

    fiveLevelsDeepResponse.forEach((a) => {
      expect(getByTestId(a.allocationId)).toBeTruthy();
    });
  });

  it('allocations with children are collapsible', () => {
    const { allocationId: parentId } =
      fiveLevelsDeepResponse.find((a) => a.allocationId === '1-1-1-1') || {};
    const { allocationId: childId } =
      fiveLevelsDeepResponse.find((a) => a.allocationId === '1-1-1-1-1') || {};

    const { getByTestId, queryByTestId } = render(
      <View>
        <AllocationTree
          allocations={generateAllocationTree(fiveLevelsDeepResponse as AllocationWithChildren[])}
          onSelect={jest.fn()}
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
      fiveLevelsDeepResponse.find((a) => a.allocationId === '1-1-1-1-1') || {};

    const { getByTestId } = render(
      <View>
        <AllocationTree
          allocations={generateAllocationTree(fiveLevelsDeepResponse as AllocationWithChildren[])}
          onSelect={jest.fn()}
        />
      </View>,
    );

    const leaf = getByTestId(leafId!);

    expect(within(leaf).queryByTestId(`${leafId}-toggle`)).toBeNull();
  });

  it('calls `onSelect` with `allocationId`', () => {
    const allocation = fiveLevelsDeepResponse.find((a) => a.allocationId === '1-1-1-1-1');

    const onSelectMock = jest.fn();

    const { getByTestId } = render(
      <View>
        <AllocationTree
          allocations={generateAllocationTree(fiveLevelsDeepResponse as AllocationWithChildren[])}
          onSelect={onSelectMock}
        />
      </View>,
    );

    const barkfeast = getByTestId(`${allocation!.allocationId}-option`);

    fireEvent.press(barkfeast);

    expect(onSelectMock).toBeCalledWith(allocation!.allocationId);
  });
});
