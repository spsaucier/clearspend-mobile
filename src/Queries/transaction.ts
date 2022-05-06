import { useInfiniteQuery, useMutation, useQuery, useQueryClient, QueryClient } from 'react-query';
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
  withoutReceipt,
  missingExpenseCategory,
}: Omit<AccountActivityRequest, 'pageRequest'>) =>
  useInfiniteQuery<PagedDataAccountActivityResponse, Error>(
    ['transactions', { card: cardId, searchText, withoutReceipt, missingExpenseCategory }],
    (request) =>
      apiClient
        .post('/account-activity', {
          cardId,
          searchText: searchText.trim() || undefined,
          withoutReceipt: withoutReceipt || undefined,
          missingExpenseCategory: missingExpenseCategory || undefined,
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

export const invalidateTransactions = (queryClient: QueryClient) =>
  queryClient.invalidateQueries('transactions');

export const useUpdateTransaction = (accountActivityId: string, existingNote?: string) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<
    AccountActivityResponse,
    Error,
    { notes?: string; expenseCategoryId?: string }
  >(
    (context) => {
      const { notes, expenseCategoryId } = context;
      return apiClient
        .patch(`/users/account-activity/${accountActivityId}`, { notes, expenseCategoryId })
        .then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['transactions', { id: accountActivityId }], data);

        // TODO: reenable paginated cache?
        // // update the transaction in the 'paginated' list to avoid a refetch
        // queryClient.setQueryData<InfiniteData<PagedDataAccountActivityResponse> | undefined>(
        //   ['transactions', { card: data.card?.cardId }],
        //   (previous) => updatePagedTransactions(previous, accountActivityId, data),
        // );

        invalidateTransactions(queryClient);
      },
      onError: (_error, variables) => {
        // If an existing note argument was provided there was an error adding or updating the note
        if (existingNote !== undefined) {
          Toast.show({
            type: 'error',
            text1:
              !existingNote || existingNote === ''
                ? t('wallet.transactionDetails.notes.addNoteError')
                : t('wallet.transactionDetails.notes.updateNoteError'),
          });
          // If an expenseCategoryId was provided to the mutate function there was an error updating the category
        } else if (variables.expenseCategoryId) {
          Toast.show({
            type: 'error',
            text1: t('wallet.transactionDetails.selectCategory.updateCategoryError'),
          });
        }
      },
    },
  );
};
