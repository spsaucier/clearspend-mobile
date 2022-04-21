import Config from 'react-native-config';
import { useUser } from '@/Queries';
import { canManagePermissions, getAllocationPermissions } from '@/Helpers/PermissionsHelpers';
import { useAllPermissions } from '@/Queries/permissions';

export const useSpendControls = (cardAllocationId: string | undefined) => {
  const { data: user } = useUser();
  const { data: permissions } = useAllPermissions(user?.businessId);
  const allocationPermissions = getAllocationPermissions(permissions?.userRoles, cardAllocationId);

  return (
    Config.SHOW_ADMIN === 'true' &&
    allocationPermissions &&
    canManagePermissions(allocationPermissions)
  );
};
