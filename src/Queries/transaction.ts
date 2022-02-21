import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import {
  AccountActivityRequest,
  AccountActivityResponse,
  PagedDataAccountActivityResponse,
} from '@/generated/capital';
import apiClient from '@/Services';

export const useTransaction = (accountActivityId: string) =>
  useQuery<AccountActivityResponse, Error>(['transactions', { id: accountActivityId }], () =>
    apiClient.get(`/users/account-activity/${accountActivityId}`).then((res) => res.data),
  );

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

export const useUpdateTransaction = (accountActivityId: string, existingNote?: string) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<Promise<AccountActivityResponse>, Error, { notes?: string; iconRef?: number }>(
    (context) => {
      const { notes, iconRef } = context;
      return apiClient
        .patch(`/users/account-activity/${accountActivityId}`, { notes, iconRef })
        .then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['transactions', { id: accountActivityId }], data);
      },
      onError: (_error, variables) => {
        if (variables.notes) {
          Toast.show({
            type: 'error',
            text1:
              !existingNote || existingNote === ''
                ? t('wallet.transactionDetails.notes.addNoteError')
                : t('wallet.transactionDetails.notes.updateNoteError'),
          });
        } else if (variables.iconRef) {
          Toast.show({
            type: 'error',
            text1: t('wallet.transactionDetails.selectCategory.updateCategoryError'),
          });
        }
      },
    },
  );
};
