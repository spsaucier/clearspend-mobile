import { useQuery, useMutation } from 'react-query';
import apiClient from '@/Services';
import { ReceiptDetails } from '@/generated/capital';

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

const handleDataHeader = (data: string) =>
  data.replace('application/octet-stream', 'application/pdf');

const blobToUri = (res: any) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(handleDataHeader(result));
    };
    reader.readAsDataURL(res.data);
  });

const viewReceipt = (receiptId: string) =>
  apiClient
    .get<Blob>(`/images/receipts/${receiptId}`, {
      responseType: 'blob',
    })
    .then(blobToUri);

export const useReceiptUri = (queryId = '', receiptId = '') =>
  useQuery<any, Error>([queryId, receiptId], () => viewReceipt(receiptId));

export const deleteReceipt = (receiptId: string) =>
  apiClient.delete<String>(`/users/receipts/${receiptId}/delete`).then((r) => r.data);

export const useDeleteReceiptLazy = (receiptId: string) =>
  useQuery<any, Error>(['deleteReceipt', receiptId], () => deleteReceipt(receiptId), {
    enabled: false,
    retry: false,
  });
