import { useMutation, useQuery } from 'react-query';
import { TermsAndConditionsResponse } from '@/generated/capital';
import apiClient from '@/Services';

export const acceptTermsAndConditions = (accessToken?: string) =>
  apiClient.patch(
    `/terms-and-conditions`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

export const useTermsAndConditionsTimestampDetails = () =>
  useQuery<TermsAndConditionsResponse, Error>(
    [],
    () => apiClient.get(`/terms-and-conditions/timestamp-details`).then((r) => r.data),
    { enabled: false, retry: false },
  );

export const useAcceptTermsAndConditions = () =>
  useMutation<any, Error>(() => acceptTermsAndConditions());
