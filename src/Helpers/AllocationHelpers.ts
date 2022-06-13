import { cloneDeep, isEmpty } from 'lodash';
import {
  Allocation,
  AllocationsAndPermissionsResponse,
  BankAccount,
  UserRolesAndPermissionsRecord,
} from 'generated/capital';

import { can } from '@/Helpers/PermissionsHelpers';
import { AllocationPermissions } from '@/Types/permissions';
import { ReallocationType } from '@/Services/Admin/ManageAllocationProvider';

export type AllocationWithChildren = Allocation & {
  children?: AllocationWithChildren[];
  isCollapsed?: boolean;
};

export type FromToAccount = {
  id: string;
  name?: string;
  amount?: number;
  isBankAccount: boolean;
};

export const isRootAllocation = (allocationId?: string, allocations?: Allocation[]) => {
  const allocation = getAllocationById(allocationId, allocations);
  return allocation && !allocation?.parentAllocationId;
};

export const isBankTransfer = (fromToAccounts?: FromToAccount[]) =>
  fromToAccounts && fromToAccounts.find((a) => a.isBankAccount);

export const getBankAccountIndex = (fromToAccounts: FromToAccount[]) =>
  fromToAccounts.findIndex((a) => a.isBankAccount);

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

export const getAllocationById = (id?: string, allocations?: Allocation[]) =>
  allocations?.find((a) => a.allocationId === id);

const findAllocationNode = (
  id: string,
  node: AllocationWithChildren,
): AllocationWithChildren | undefined => {
  if (id === node.allocationId) return node;

  let found;
  const children = node.children || [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    found = findAllocationNode(id, child);
    if (found) {
      break;
    }
  }
  return found;
};

export const findAllocationNodeGivenNodes = (
  id: string,
  nodes: AllocationWithChildren[],
): AllocationWithChildren | undefined => {
  let found;
  for (let i = 0; i < nodes?.length; i += 1) {
    const current = nodes[i];
    found = findAllocationNode(id, current);
    if (found) {
      break;
    }
  }
  return found;
};

export const getBankAccountById = (id?: string, bankAccounts?: BankAccount[]) =>
  bankAccounts?.find((b) => b.businessBankAccountId === id);

export const getFromToAccount = (
  id: string,
  allocations: Allocation[],
  bankAccounts?: BankAccount[],
): FromToAccount | undefined => {
  const {
    allocationId,
    name: allocationName,
    account,
  } = getAllocationById(id, allocations) || {
    allocationId: '',
    name: '',
  };
  const { businessBankAccountId, name: businessName } = getBankAccountById(id, bankAccounts) || {
    businessBankAccountId: '',
    name: '',
  };

  return allocationId
    ? {
        id: allocationId,
        name: allocationName,
        amount: account?.availableBalance?.amount,
        isBankAccount: false,
      }
    : businessBankAccountId
    ? { id: businessBankAccountId, name: businessName, isBankAccount: true }
    : undefined;
};

export const getFromToAllocations = ({
  allocationId,
  targetAllocationId,
  reallocationType,
  allocations,
  bankAccounts,
}: {
  allocationId: string;
  targetAllocationId?: string;
  reallocationType: ReallocationType;
  allocations: Allocation[];
  bankAccounts?: BankAccount[];
}): [FromToAccount, FromToAccount] | undefined => {
  const a = allocationId && getFromToAccount(allocationId, allocations, bankAccounts);
  const b = targetAllocationId && getFromToAccount(targetAllocationId, allocations, bankAccounts);

  if (!a || !b) return undefined;

  return reallocationType === ReallocationType.Add ? [b, a] : [a, b];
};

export const removeAllocationById = (
  allocationId: string,
  allocations: Allocation[],
  userRoles: UserRolesAndPermissionsRecord[],
): AllocationsAndPermissionsResponse => ({
  allocations: allocations.filter((a) => a.allocationId !== allocationId),
  userRoles: userRoles.filter((u) => u.allocationId !== allocationId),
});

export const getManageableAllocations = (
  permissionType: AllocationPermissions,
  allocationsAndPermissions?: AllocationsAndPermissionsResponse,
) => {
  if (!allocationsAndPermissions) return [];

  const { allocations = [], userRoles = [] } = allocationsAndPermissions;

  return allocations.filter((a) => {
    const role = userRoles.find((r) => r.allocationId === a.allocationId);
    return (role && can(role, permissionType)) || false;
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

// Number: Currency amount (cents optional) Optional thousands separators; optional two-digit fraction
export const AMOUNT_REGEX = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;

// returns 0 or numeric amount
export const validateAllocationAmount = (amount?: string): number | undefined => {
  if (!amount) return undefined;
  if (!AMOUNT_REGEX.test(amount)) return undefined;

  // remove commas (assume US currency)
  const numericAmount = parseFloat(amount.replace(',', ''));

  // check it's a valid number and not negative
  if (Number.isNaN(numericAmount) || numericAmount < 0) return undefined;

  return numericAmount;
};
