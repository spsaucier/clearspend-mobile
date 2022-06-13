import { NewAllocationContext } from '@/Services/Admin/NewAllocationProvider';

import { createContextHook } from '@/Services/utils/createContextHook';

export const useNewAllocationContext = createContextHook(
  NewAllocationContext,
  'NewAllocationContext',
  'UseNewAllocationContext',
);
