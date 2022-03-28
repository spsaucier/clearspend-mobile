/**
 * @format
 */
import { updateTransactionReceipts, updatePagedTransactions } from '../ResponseHelpers';

describe('updateTransactionReceipts', () => {
  it('returns undefined if previous was `undefined`', () => {
    expect(updateTransactionReceipts(undefined)).toBeUndefined();
  });

  it('returns itself if no `receiptId` is passed', () => {
    const response = {
      accountActivityId: '1',
      receipt: {
        receiptId: [],
      },
    };

    const updatedResponse = updateTransactionReceipts(response);

    expect(updatedResponse).toEqual(response);
  });

  it('returns itself with `receiptId` if passed', () => {
    const response = {
      accountActivityId: '1',
      receipt: {
        receiptId: [],
      },
    };

    const updatedResponse = updateTransactionReceipts(response, 'one');

    expect(updatedResponse!.receipt).toEqual({ receiptId: ['one'] });
  });

  it('returns itself with additional `receiptId` if passed with new recepit at index 0', () => {
    const response = {
      accountActivityId: '1',
      receipt: {
        receiptId: ['one'],
      },
    };

    const updatedResponse = updateTransactionReceipts(response, 'two');

    expect(updatedResponse!.receipt).toEqual({ receiptId: ['two', 'one'] });
  });

  it('returns itself with deleted `receiptId` if `deleteReceipt` flag is passed', () => {
    const response = {
      accountActivityId: '1',
      receipt: {
        receiptId: ['one', 'two', 'three', 'four'],
      },
    };

    const updatedResponse = updateTransactionReceipts(response, 'three', true);

    expect(updatedResponse!.receipt).toEqual({ receiptId: ['one', 'two', 'four'] });
  });
});

describe('updatePagedTransactions', () => {
  it('returns undefined if previous was `undefined`', () => {
    expect(updatePagedTransactions(undefined, '', {})).toBeUndefined();
  });

  it('returns response with updated transaction', () => {
    const updateId = '4b';
    const response = {
      pageParams: [],
      pages: [
        {
          pageNumber: 0,
          pageSize: 5,
          totalElements: 5,
          content: [
            {
              accountActivityId: '1a',
            },
            {
              accountActivityId: '2a',
            },
            {
              accountActivityId: '3a',
            },
            {
              accountActivityId: '4a',
            },
            {
              accountActivityId: '5a',
            },
          ],
        },
        {
          pageNumber: 1,
          pageSize: 5,
          totalElements: 5,
          content: [
            {
              accountActivityId: '1b',
            },
            {
              accountActivityId: '2b',
            },
            {
              accountActivityId: '3b',
            },
            {
              accountActivityId: updateId,
            },
            {
              accountActivityId: '5b',
            },
          ],
        },
        {
          pageNumber: 2,
          pageSize: 5,
          totalElements: 5,
          content: [
            {
              accountActivityId: '1c',
            },
            {
              accountActivityId: '2c',
            },
            {
              accountActivityId: '3c',
            },
            {
              accountActivityId: '4c',
            },
            {
              accountActivityId: '5c',
            },
          ],
        },
      ],
    };

    const updatedResponse = updatePagedTransactions(response, updateId, {
      accountActivityId: updateId,
      expenseDetails: { categoryName: 'Marketing' },
    });

    expect(updatedResponse).toEqual({
      pageParams: [],
      pages: [
        {
          pageNumber: 0,
          pageSize: 5,
          totalElements: 5,
          content: [
            {
              accountActivityId: '1a',
            },
            {
              accountActivityId: '2a',
            },
            {
              accountActivityId: '3a',
            },
            {
              accountActivityId: '4a',
            },
            {
              accountActivityId: '5a',
            },
          ],
        },
        {
          pageNumber: 1,
          pageSize: 5,
          totalElements: 5,
          content: [
            {
              accountActivityId: '1b',
            },
            {
              accountActivityId: '2b',
            },
            {
              accountActivityId: '3b',
            },
            {
              accountActivityId: '4b',
              expenseDetails: {
                categoryName: 'Marketing',
              },
            },
            {
              accountActivityId: '5b',
            },
          ],
        },
        {
          pageNumber: 2,
          pageSize: 5,
          totalElements: 5,
          content: [
            {
              accountActivityId: '1c',
            },
            {
              accountActivityId: '2c',
            },
            {
              accountActivityId: '3c',
            },
            {
              accountActivityId: '4c',
            },
            {
              accountActivityId: '5c',
            },
          ],
        },
      ],
    });
  });
});
