import { useEffect, useState } from 'react';
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

  const { receiptId, linked } = uploadReceiptState;

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
        receiptId,
      });
    });
  };

  useEffect(() => {
    if (receiptId && !linked) {
      const linkReceipt = async () => {
        await linkReceiptAsync(accountActivityId, receiptId);
      };
      linkReceipt()
        .then(() => setUploadReceiptState({ ...uploadReceiptState, linked: true }))
        .then(() =>
          queryClient.invalidateQueries(['receipt', receiptId], {
            refetchInactive: true,
          }))
        .then(() => {
          // TODO Rodrigo - Fix eslint error
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !!onUploadFinished && onUploadFinished();
        });
    }
  }, [linked, receiptId, accountActivityId, uploadReceiptState]);

  const isUploading = uploadingReceipt || (receiptId && !linked) || false;

  return { uploadReceiptState, uploadReceipt, isUploading };
};

export default useUploadReceipt;
