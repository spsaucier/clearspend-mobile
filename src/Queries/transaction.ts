import { useQuery } from 'react-query';
import { AccountActivityResponse, PagedDataAccountActivityResponse } from '@/generated/capital';
import apiClient from '@/Services';

export const useTransaction = (accountActivityId: string) =>
  useQuery<AccountActivityResponse, Error>(['transactions', { id: accountActivityId }],
    () => apiClient.get(`/users/account-activity/${accountActivityId}`).then((res) => res.data));

export const useCardTransactions = (cardId: string, pageNumber = 0, pageSize = 20) =>
  useQuery<PagedDataAccountActivityResponse, Error>(['transactions', { card: cardId }],
    () => apiClient.get(`/users/cards/${cardId}/account-activity?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((res) => res.data),
    { keepPreviousData: true });
