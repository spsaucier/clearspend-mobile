import { useCallback, useEffect, useState } from 'react';
import { useQueryClient, InfiniteData } from 'react-query';
import { linkReceiptAsync, useUploadReceiptRemote } from '@/Queries/receipt';
import { AccountActivityResponse, PagedDataAccountActivityResponse } from '@/generated/capital';
import { updateTransactionReceipts, updatePagedTransactions } from '../Helpers/ResponseHelpers';

type UploadReceiptState = {
  receiptId?: string;
  linked?: boolean;
};

const initialState: UploadReceiptState = {};

const useUploadReceipt = ({
  accountActivityId,
  onUploadFinished,
}: {
  accountActivityId: string;
  onUploadFinished: any;
}) => {
  const [uploadReceiptState, setUploadReceiptState] = useState<UploadReceiptState>(initialState);
  const { mutateAsync, isLoading: uploadingReceipt } = useUploadReceiptRemote();
  const queryClient = useQueryClient();

  const uploadReceipt = (uri: string, name: string, type: string) => {
    mutateAsync({
      receipt: {
        uri,
        type,
        name,
      },
    } as any).then((data) => {
      const { receiptId } = data;
      setUploadReceiptState({
        ...initialState,
        // @ts-expect-error string[] is not assignable to string?
        // Despite ReceiptDetails type seems incorrect at the backend code,
        // it endpoint returns a string anyway.
        receiptId,
      });
    });
  };

  const { receiptId, linked } = uploadReceiptState;

  const refetchReceiptQuery = useCallback(() => {
    queryClient.invalidateQueries(['receipt', receiptId], {
      refetchInactive: true,
    });

    if (receiptId) {
      queryClient.setQueryData<AccountActivityResponse | undefined>(
        ['transactions', { id: accountActivityId }],
        (previous) => updateTransactionReceipts(previous, receiptId),
      );

      const data = queryClient.getQueryData<AccountActivityResponse | undefined>([
        'transactions',
        { id: accountActivityId },
      ]);

      // update the transaction in the 'paginated' list to avoid a refetch
      if (data) {
        queryClient.setQueryData<InfiniteData<PagedDataAccountActivityResponse> | undefined>(
          ['transactions', { card: data.card?.cardId }],
          (previous) => updatePagedTransactions(previous, accountActivityId, data),
        );
      }
    }
  }, [queryClient, receiptId]);

  useEffect(() => {
    if (receiptId && !linked) {
      const linkReceipt = async () => {
        await linkReceiptAsync(accountActivityId, receiptId);
      };
      linkReceipt()
        .then(() => setUploadReceiptState({ ...uploadReceiptState, linked: true }))
        .then(refetchReceiptQuery)
        .then(() => {
          onUploadFinished();
        });
    }
  }, [
    linked,
    receiptId,
    accountActivityId,
    uploadReceiptState,
    onUploadFinished,
    refetchReceiptQuery,
  ]);

  const isUploading = uploadingReceipt || (receiptId && !linked) || false;

  return { uploadReceiptState, uploadReceipt, isUploading };
};

export default useUploadReceipt;
