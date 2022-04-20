import { UserRolesAndPermissionsRecord } from 'generated/capital';

type ValuesOf<T extends unknown[]> = T[number];

export type AllocationPermissions = ValuesOf<
  Required<UserRolesAndPermissionsRecord>['allocationPermissions']
>;

export type Permissions = UserRolesAndPermissionsRecord | null;

export enum AllocationRoles {
  Admin = 'Admin',
  Manager = 'Manager',
  ViewOnly = 'View only',
  Employee = 'Employee',
}
