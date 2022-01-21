import { AuthContext } from '@/Services/Auth/AuthProvider';
import { createContextHook } from '../Services/utils/createContextHook';

export const useAuthentication = createContextHook(AuthContext, 'AuthContext', 'UseAuthentication');
