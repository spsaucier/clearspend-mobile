import { useMutation } from 'react-query';
import { ChangePasswordRequest } from '@/generated/capital';
import apiClient from '@/Services';

export const useChangePassword = () =>
  useMutation<any, any, ChangePasswordRequest>((data: ChangePasswordRequest) =>
    apiClient.post(`/authentication/change-password`, data).then((r) => r.data),
  );
