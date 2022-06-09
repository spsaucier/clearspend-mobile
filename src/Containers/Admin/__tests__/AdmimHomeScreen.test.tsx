import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { waitFor, cleanup } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { managerAllocationsAndPermissionsResponse } from '@/Helpers/testing/fixtures/permissions';
import AdminHomeScreen from '../AdminHomeScreen';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import { transactions } from '@/Helpers/testing/fixtures/transactions';
import { MockFeatureFlagsProvider } from '@/Helpers/testing/MockFeatureFlagsProvider';

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

const server = setupServer(
  rest.get(`/users`, (req, res, ctx) => res(ctx.json(usersResponse[0]))),
  rest.post(`/account-activity`, (req, res, ctx) => res(ctx.json(transactions))),
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

describe('AdminHomeScreen', () => {
  it('shows selected admin options', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
        res(ctx.json(managerAllocationsAndPermissionsResponse)),
      ),
    );

    const { queryByTestId } = renderComponentWithQueryClient(
      createQueryClient(),

      <MockFeatureFlagsProvider overrides={{ 'request-funds': { enabled: true } }}>
        <AdminHomeScreen />
      </MockFeatureFlagsProvider>,
    );

    await waitFor(() => {
      expect(queryByTestId('admin-actions-employees')).toBeTruthy();
      expect(queryByTestId('admin-actions-allocations')).toBeTruthy();
    });
  });
});
