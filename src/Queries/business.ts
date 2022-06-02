import { useQuery, useMutation } from 'react-query';
import {
  Business,
  BusinessFundAllocationResponse,
  BusinessReallocationRequest,
  BankAccount,
  TransactBankAccountRequest,
  CreateAdjustmentResponse,
} from '@/generated/capital';
import apiClient from '@/Services';

export const useBusiness = () =>
  useQuery<Business, Error>('business', () => apiClient.get('/businesses').then((res) => res.data));

export const useReallocationRequest = () =>
  useMutation<BusinessFundAllocationResponse, Error, BusinessReallocationRequest>((context) =>
    apiClient.post(`/businesses/transactions`, context).then((res) => res.data),
  );

export const useBusinessBankAccounts = ({ enabled }: { enabled: boolean }) =>
  useQuery<BankAccount[], Error>(
    'businessBankAccounts',
    () => apiClient.get('/business-bank-accounts').then((res) => res.data),
    {
      enabled,
    },
  );

export const useBankTransactionRequest = ({
  businessBankAccountId,
}: {
  businessBankAccountId: string;
}) =>
  useMutation<CreateAdjustmentResponse, Error, TransactBankAccountRequest>((context) =>
    apiClient
      .post(`/business-bank-accounts/${businessBankAccountId}/transactions`, context)
      .then((res) => res.data),
  );
