import { useQuery, useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import apiClient from '@/Services';
import { ReceiptDetails, AccountActivityResponse } from '@/generated/capital';
import { updateTransactionReceipts } from '../Helpers/ResponseHelpers';
import { invalidateTransactions } from '@/Queries/transaction';

export const uploadReceipt = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  });
  return apiClient
    .post('/images/receipts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 20 * 1000, // 20 secs
    })
    .then((r) => r.data);
};
export const useUploadReceiptRemote = () =>
  useMutation<ReceiptDetails, Error>((data: any) => uploadReceipt(data));

export const linkReceiptAsync = (accountActivityId: string, receiptId: string) =>
  apiClient
    .post(`/users/account-activity/${accountActivityId}/receipts/${receiptId}/link`)
    .then((r) => r.data);

const blobToUri = (res: any) =>
  new Promise((resolve) => {
    const contentType = res.headers['content-type'];
    let toBeRead;
    if (!res.data.type) {
      toBeRead = new Blob([res.data], { type: contentType, lastModified: Date.now() });
    } else toBeRead = res.data;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      return resolve({ data: result, contentType });
    };
    reader.readAsDataURL(toBeRead);
  });

const viewReceipt = (receiptId: string) =>
  apiClient
    .get<Blob>(`/images/receipts/${receiptId}`, {
      responseType: 'blob',
    })
    .then(blobToUri);

export const useReceiptUri = (queryId = '', receiptId = '') =>
  useQuery<any, Error>([queryId, receiptId], () => viewReceipt(receiptId), { retry: 2 });

export const deleteReceipt = (receiptId: string) =>
  apiClient.delete<String>(`/users/receipts/${receiptId}/delete`).then((r) => r.data);

export const useDeleteReceipt = (receiptId: string, accountActivityId: string) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<any, Error, { receiptId: string }>(
    (context) => deleteReceipt(context.receiptId),
    {
      onSuccess: () => {
        queryClient.setQueryData<AccountActivityResponse | undefined>(
          ['transactions', { id: accountActivityId }],
          (previous) => updateTransactionReceipts(previous, receiptId, true /* deleteMode */),
        );

        // TODO: reenable paginated cache?
        // const data = queryClient.getQueryData<AccountActivityResponse | undefined>([
        //   'transactions',
        //   { id: accountActivityId },
        // ]);
        //
        // // update the transaction in the 'paginated' list to avoid a refetch
        // if (data) {
        //   queryClient.setQueryData<InfiniteData<PagedDataAccountActivityResponse> | undefined>(
        //     ['transactions', { card: data.card?.cardId }],
        //     (previous) => updatePagedTransactions(previous, accountActivityId, data),
        //   );
        // }
        invalidateTransactions(queryClient);
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: t('wallet.receipt.deleteError'),
        });
      },
    },
  );
};
