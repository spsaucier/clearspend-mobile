import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { waitFor, cleanup } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';

import TransactionDetailScreen from '../TransactionDetailScreen';
import {
  transaction,
  transactionWithCategory,
  transactionWithReceipt,
} from '@/Helpers/testing/fixtures/transactions';
import { categories } from '@/Helpers/testing/fixtures/categories';
import { transactionTestBusiness as business } from '@/Helpers/testing/fixtures/business';
import { transactionTestUser as user } from '@/Helpers/testing/fixtures/user';

jest.mock('@gorhom/bottom-sheet', () => {
  const RN = require('react-native');

  return {
    __esModule: true,
    ...require('@gorhom/bottom-sheet/mock'),
    // BottomSheetComponent mock throws an error so override as follows
    BottomSheetView: RN.View,
    BottomSheetScrollView: RN.ScrollView,
    BottomSheetSectionList: RN.SectionList,
    BottomSheetFlatList: RN.FlatList,
    BottomSheetVirtualizedList: RN.VirtualizedList,
  };
});

jest.mock('../Receipt/ViewReceiptThumbnail', () => () => {
  const MockName = 'view-receipt-thumbnail-mock';
  // @ts-ignore
  return <MockName />;
});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
  useRoute: () => ({
    params: {
      transactionId: 'c2ccd809-3afc-4f56-b52d-0fdb9b1cd6a4',
    },
  }),
}));

const server = setupServer(
  rest.get(`/expense-categories/list`, (req, res, ctx) => res(ctx.json(categories))),
  rest.get(`/businesses`, (req, res, ctx) => res(ctx.json(business))),
  rest.get(`/users`, (req, res, ctx) => res(ctx.json(user))),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('TransactionDetailScreen', () => {
  it('renders', async () => {
    server.use(
      rest.get(`/users/account-activity/${transaction.accountActivityId}`, (req, res, ctx) =>
        res(ctx.json(transaction)),
      ),
    );

    const { getByTestId, getAllByText, getByText } = renderComponentWithQueryClient(
      createQueryClient(),
      <SafeAreaProvider>
        <TransactionDetailScreen />
      </SafeAreaProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('transaction-detail-screen')).toBeTruthy();

      // status
      expect(getByTestId('transaction-status-approved')).toBeTruthy();

      // info
      expect(getAllByText('-$7.00')).toHaveLength(3);
      expect(getByText('Lord of the fries • Travel')).toBeTruthy();

      // merchant
      expect(getByText('Lord of the fries')).toBeTruthy();
      expect(getByText('1234567890')).toBeTruthy();
      expect(getByText('Travel')).toBeTruthy();

      // icons
      expect(getByTestId('transaction-no-category')).toBeTruthy();
      expect(getByTestId('transaction-no-receipt')).toBeTruthy();

      // note
      expect(getByText('Ate some fries.')).toBeTruthy();
    });
  });

  it('shows expense category if it exists', async () => {
    server.use(
      rest.get(
        `/users/account-activity/${transactionWithCategory.accountActivityId}`,
        (req, res, ctx) => res(ctx.json(transactionWithCategory)),
      ),
    );

    const { queryByTestId, getByText } = renderComponentWithQueryClient(
      createQueryClient(),
      <SafeAreaProvider>
        <TransactionDetailScreen />
      </SafeAreaProvider>,
    );

    await waitFor(() => {
      expect(getByText('Meals')).toBeTruthy();
      expect(queryByTestId('transaction-no-category')).toBeNull();
    });
  });

  it('shows receipt if it exists', async () => {
    server.use(
      rest.get(
        `/users/account-activity/${transactionWithReceipt.accountActivityId}`,
        (req, res, ctx) => res(ctx.json(transactionWithReceipt)),
      ),
    );

    const { queryByTestId, getByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <SafeAreaProvider>
        <TransactionDetailScreen />
      </SafeAreaProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('transaction-receipt')).toBeTruthy();
      expect(queryByTestId('transaction-no-receipt')).toBeNull();
    });
  });

  it('shows "Declined" status', async () => {
    server.use(
      rest.get(`/users/account-activity/${transaction.accountActivityId}`, (req, res, ctx) =>
        res(
          ctx.json({
            ...transaction,
            status: 'DECLINED',
          }),
        ),
      ),
    );

    const { getByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <SafeAreaProvider>
        <TransactionDetailScreen />
      </SafeAreaProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('transaction-status-declined')).toBeTruthy();
    });
  });

  it('shows "Pending" status', async () => {
    server.use(
      rest.get(`/users/account-activity/${transaction.accountActivityId}`, (req, res, ctx) =>
        res(
          ctx.json({
            ...transaction,
            status: 'PENDING',
          }),
        ),
      ),
    );

    const { getByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <SafeAreaProvider>
        <TransactionDetailScreen />
      </SafeAreaProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('transaction-status-pending')).toBeTruthy();
    });
  });
});
