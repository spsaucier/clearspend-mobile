/**
 * @format
 */
import { AllocationsAndPermissionsResponse } from 'generated/capital';
import { AllocationRoles } from '@/Types/permissions';
import { getRole } from '../PermissionsHelpers';

describe('getRole', () => {
  it('returns highest role', () => {
    expect(
      getRole({
        userRoles: [
          {
            allocationRole: AllocationRoles.Employee,
          },
          {
            allocationRole: AllocationRoles.Admin,
          },
          {
            allocationRole: AllocationRoles.Manager,
          },
          {
            allocationRole: AllocationRoles.ViewOnly,
          },
        ],
      } as AllocationsAndPermissionsResponse),
    ).toBe(AllocationRoles.Admin);

    expect(
      getRole({
        userRoles: [
          {
            allocationRole: AllocationRoles.Employee,
          },
          {
            allocationRole: AllocationRoles.Manager,
          },
          {
            allocationRole: AllocationRoles.Manager,
          },
        ],
      } as AllocationsAndPermissionsResponse),
    ).toBe(AllocationRoles.Manager);
  });
});
