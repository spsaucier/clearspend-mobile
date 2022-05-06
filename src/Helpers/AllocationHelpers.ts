import { Allocation } from 'generated/capital';
import { cloneDeep, isEmpty } from 'lodash';

export type AllocationWithChildren = Allocation & {
  children?: AllocationWithChildren[];
};

export const groupAllocation = (
  allocations: AllocationWithChildren[],
  parentAllocation: AllocationWithChildren,
) => {
  let tree = <AllocationWithChildren>{};

  if (isEmpty(tree)) tree = parentAllocation;

  const children = allocations.filter(
    (a) => a.parentAllocationId === parentAllocation.allocationId,
  );

  if (children.length) {
    parentAllocation.children = children;
    children.forEach((child) => groupAllocation(allocations, child));
  }

  return tree;
};

export const getParentAllocations = (allocations: Allocation[]): Allocation[] =>
  allocations.filter((a) => !a.parentAllocationId);

export const getFirstDescendants = (allocations: Allocation[]): Allocation[] =>
  allocations.filter(
    (a) => !allocations.find(({ allocationId }) => a.parentAllocationId === allocationId),
  );

export const allocationTree = (allocations: Allocation[]): AllocationWithChildren[] => {
  const clone = cloneDeep(allocations);
  let parents = getParentAllocations(clone);

  // no root allocation e.g. not an Admin
  if (!parents.length) {
    parents = getFirstDescendants(clone);
  }

  return parents.map((a) => groupAllocation(clone, a));
};
