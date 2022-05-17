import { canManagePermissions, getAllocationPermissions } from '@/Helpers/PermissionsHelpers';
import { useAllPermissions } from '@/Queries/permissions';
import { useFeatureFlag } from '@/Hooks/useFeatureFlag';

export const useSpendControls = (cardAllocationId: string | undefined) => {
  const { enabled: adminEnabled } = useFeatureFlag('view-admin');
  const { data: permissions } = useAllPermissions();
  const allocationPermissions = getAllocationPermissions(permissions?.userRoles, cardAllocationId);

  return adminEnabled && allocationPermissions && canManagePermissions(allocationPermissions);
};
