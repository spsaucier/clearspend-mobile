import { AdminContext } from '@/Services/Admin/AdminProvider';
import { createContextHook } from '@/Services/utils/createContextHook';

export const useAdminContext = createContextHook(AdminContext, 'AdminContext', 'UseAdminContext');
