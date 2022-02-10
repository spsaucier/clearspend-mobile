import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { linkReceiptAsync, useUploadReceiptRemote } from '@/Queries/receipt';

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

  const uploadReceipt = (uri: string) => {
    const fileName = uri.split('/').pop();
    const extension = fileName?.split('.').pop();
    mutateAsync({
      receipt: {
        uri,
        type: `image/${extension}`,
        name: fileName,
      },
      // TODO: TS freakout
    } as unknown as void).then((data) => {
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
