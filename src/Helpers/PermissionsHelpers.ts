import {
  UserRolesAndPermissionsRecord,
  AllocationsAndPermissionsResponse,
} from 'generated/capital';
import { AllocationPermissions, Permissions, AllocationRoles } from '@/Types/permissions';

export function getAllocationPermissions(
  userRoles: UserRolesAndPermissionsRecord[] | undefined,
  allocationId: string | undefined,
): UserRolesAndPermissionsRecord | undefined {
  return userRoles?.find((role) => role.allocationId === allocationId);
}

function can(permissions: Permissions, permission: AllocationPermissions): boolean {
  return Boolean(permissions?.allocationPermissions?.includes(permission));
}

export function canLinkBankAccounts(permissions: Permissions): boolean {
  return can(permissions, 'LINK_BANK_ACCOUNTS');
}

export function canManageFunds(permissions: Permissions): boolean {
  return can(permissions, 'MANAGE_FUNDS');
}

export function canManageCards(permissions: Permissions): boolean {
  return can(permissions, 'MANAGE_CARDS');
}

export function canManageUsers(permissions: Permissions): boolean {
  return can(permissions, 'MANAGE_USERS');
}

export function canManagePermissions(permissions: Permissions): boolean {
  return can(permissions, 'MANAGE_PERMISSIONS');
}

export function canManageConnections(permissions: Permissions): boolean {
  return can(permissions, 'MANAGE_CONNECTIONS');
}

export function canRead(permissions: Permissions): boolean {
  return can(permissions, 'READ');
}

export function showAdmin(
  allocationPermissions: AllocationsAndPermissionsResponse | undefined,
): boolean {
  return Boolean(
    allocationPermissions?.userRoles?.some(
      (role) =>
        role.allocationRole === AllocationRoles.Admin ||
        role.allocationRole === AllocationRoles.Manager,
    ),
  );
}

export const rolesByLevel = {
  [AllocationRoles.Admin]: 4,
  [AllocationRoles.Manager]: 3,
  [AllocationRoles.Employee]: 2,
  [AllocationRoles.ViewOnly]: 1,
};

export function getRole(
  allocationPermissions: AllocationsAndPermissionsResponse | undefined,
): AllocationRoles {
  return allocationPermissions?.userRoles?.sort(
    (a, b) =>
      rolesByLevel[b.allocationRole as AllocationRoles] -
      rolesByLevel[a.allocationRole as AllocationRoles],
  )[0].allocationRole as AllocationRoles;
}

export function showManageUsers(
  allocationPermissions: AllocationsAndPermissionsResponse | undefined,
): boolean {
  return Boolean(allocationPermissions?.userRoles?.some((role) => canManageUsers(role)));
}

export function showManageCards(
  allocationPermissions: AllocationsAndPermissionsResponse | undefined,
): boolean {
  return Boolean(allocationPermissions?.userRoles?.some((role) => canManageCards(role)));
}

export function showManagePermissions(
  allocationPermissions: AllocationsAndPermissionsResponse | undefined,
): boolean {
  return Boolean(allocationPermissions?.userRoles?.some((role) => canManagePermissions(role)));
}
