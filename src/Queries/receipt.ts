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
    })
    .then((r) => r.data);
};
export const useUploadReceipt = () =>
  useMutation<ReceiptDetails, Error>((data: any) => uploadReceipt(data));

export const linkReceiptAsync = (receiptId: string, accountActivityId: string) =>
  apiClient
    .post(`/users/account-activity/${accountActivityId}/receipts/${receiptId}/link`)
    .then((r) => r.data);

const blobToUri = (res: { data: Blob }) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(res.data);
  });

const viewReceipt = (receiptId: string) =>
  apiClient
    .get<Blob>(`/images/receipts/${receiptId}`, {
      responseType: 'blob',
    })
    .then(blobToUri);

export const useReceiptUri = (receiptId = '') =>
  useQuery<any, Error>(['receipt', receiptId], () => viewReceipt(receiptId));
