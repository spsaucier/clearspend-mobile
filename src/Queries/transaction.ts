import { useInfiniteQuery, useQuery } from 'react-query';
import {
  AccountActivityRequest,
  AccountActivityResponse,
  PagedDataAccountActivityResponse,
} from '@/generated/capital';
import apiClient from '@/Services';

export const useTransaction = (accountActivityId: string) =>
  useQuery<AccountActivityResponse, Error>(['transactions', { id: accountActivityId }], () =>
    apiClient.get(`/users/account-activity/${accountActivityId}`).then((res) => res.data));

const pageSize = 10;

export const useCardTransactions = ({
  cardId,
  searchText = '',
}: Omit<AccountActivityRequest, 'pageRequest'>) =>
  useInfiniteQuery<PagedDataAccountActivityResponse, Error>(
    ['transactions', { card: cardId }],
    (request) =>
      apiClient
        .post('/account-activity', {
          cardId,
          searchText: searchText.trim() || undefined,
          pageRequest: { pageNumber: request.pageParam || 0, pageSize },
        })
        .then((res) => res.data),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        if ((lastPage.totalElements || 0) > ((lastPage.pageNumber || 0) + 1) * pageSize) {
          return (lastPage.pageNumber || 0) + 1;
        }
        return undefined;
      },
    },
  );
