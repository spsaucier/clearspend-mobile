import { Allocation, AllocationsAndPermissionsResponse } from 'generated/capital';
import { cloneDeep, isEmpty } from 'lodash';
import { canManageCards } from '@/Helpers/PermissionsHelpers';

export type AllocationWithChildren = Allocation & {
  children?: AllocationWithChildren[];
  isCollapsed?: boolean;
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

  parentAllocation.isCollapsed = false;

  return tree;
};

export const getManageableAllocations = (
  allocationsAndPermissions?: AllocationsAndPermissionsResponse,
) => {
  if (!allocationsAndPermissions) return [];

  const { allocations = [], userRoles = [] } = allocationsAndPermissions;

  return allocations.filter((a) => {
    const role = userRoles.find((r) => r.allocationId === a.allocationId);
    return (role && canManageCards(role)) || false;
  });
};

export const getParentAllocations = (allocations: Allocation[]): Allocation[] =>
  allocations.filter((a) => !a.parentAllocationId);

export const getFirstDescendants = (allocations: Allocation[]): Allocation[] =>
  allocations.filter(
    (a) => !allocations.find(({ allocationId }) => a.parentAllocationId === allocationId),
  );

export const generateAllocationTree = (
  allocations: Allocation[] | undefined,
): AllocationWithChildren[] => {
  if (!allocations) return [];

  const clone = cloneDeep(allocations);
  let parents = getParentAllocations(clone);

  // no root allocation e.g. not an Admin
  if (!parents.length) {
    parents = getFirstDescendants(clone);
  }

  return parents.map((a) => groupAllocation(clone, a));
};
