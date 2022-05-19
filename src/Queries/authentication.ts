import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ChangePasswordRequest, TwoFactorStartLoggedInResponse } from '@/generated/capital';
import apiClient from '@/Services';

export const useChangePassword = () =>
  useMutation<AxiosResponse<TwoFactorStartLoggedInResponse>, AxiosError, ChangePasswordRequest>(
    (data: ChangePasswordRequest) => apiClient.post(`/authentication/change-password`, data),
  );
