import { InfiniteData } from 'react-query';
import { AccountActivityResponse, PagedDataAccountActivityResponse } from '../generated/capital';

export const updateTransactionReceipts = (
  previous: AccountActivityResponse | undefined,
  receiptId?: string,
  deleteReceipt?: boolean,
) => {
  if (!previous) return previous;

  return {
    ...previous,
    receipt: {
      receiptId: [receiptId || '', ...((previous && previous.receipt?.receiptId) || [])]
        .filter(Boolean)
        .filter((r) => (deleteReceipt ? r !== receiptId : r)),
    },
  };
};

export const updatePagedTransactions = (
  previous: InfiniteData<PagedDataAccountActivityResponse> | undefined,
  accountActivityId: string,
  data: AccountActivityResponse,
) => {
  if (!previous) return previous;

  const indexes = (() => {
    let i;
    let j;

    for (i = 0; previous && previous.pages && i < previous.pages.length; i += 1) {
      const { content } = previous.pages[i];
      for (j = 0; content && j < content.length; j += 1) {
        if (content[j].accountActivityId === accountActivityId) {
          return { pageIndex: i, contentIndex: j };
        }
      }
    }

    return undefined;
  })();

  if (!indexes) return previous;

  const { pageIndex: i, contentIndex: j } = indexes;

  return {
    ...previous,
    pages: [
      ...(previous!.pages.slice(0, i) || []),
      {
        ...previous!.pages[i],
        content: [
          ...(previous!.pages[i].content || []).slice(0, j),
          {
            ...data,
          },
          ...(previous!.pages[i].content || []).slice(j + 1),
        ],
      },
      ...(previous!.pages.slice(i + 1) || []),
    ],
  };
};
