import { ManageAllocationContext } from '@/Services/Admin/ManageAllocationProvider';
import { createContextHook } from '@/Services/utils/createContextHook';

export const useManageAllocationContext = createContextHook(
  ManageAllocationContext,
  'ManageAllocationContext',
  'UseManageAllocationContext',
);
