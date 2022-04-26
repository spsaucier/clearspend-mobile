import Config from 'react-native-config';
import { canManagePermissions, getAllocationPermissions } from '@/Helpers/PermissionsHelpers';
import { useAllPermissions } from '@/Queries/permissions';

export const useSpendControls = (cardAllocationId: string | undefined) => {
  const { data: permissions } = useAllPermissions();
  const allocationPermissions = getAllocationPermissions(permissions?.userRoles, cardAllocationId);

  return (
    Config.SHOW_ADMIN === 'true' &&
    allocationPermissions &&
    canManagePermissions(allocationPermissions)
  );
};
