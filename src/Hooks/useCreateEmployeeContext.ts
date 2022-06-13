import { CreateEmployeeContext } from '@/Services/Admin/CreateEmployeeProvider';
import { createContextHook } from '@/Services/utils/createContextHook';

export const useCreateEmployeeContext = createContextHook(
  CreateEmployeeContext,
  'CreateEmployeeContext',
  'UseCreateEmployeeContext',
);
