import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { waitFor } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import {
  managerAllocationsAndPermissionsResponse,
  adminAllocationsAndPermissionsResponse,
} from '@/Helpers/testing/fixtures/permissions';

import AdminScreen from '../AdminScreen';

const businessId = 'business-01';

export const handlers = [
  rest.get('/users', (req, res, ctx) =>
    res(
      ctx.json({
        businessId,
      }),
    ),
  ),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('AdminScreen', () => {
  it('shows selected admin options based on `Manger` permissions', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions/${businessId}`, (req, res, ctx) =>
        res(ctx.json(managerAllocationsAndPermissionsResponse)),
      ),
    );

    const { queryByTestId } = renderComponentWithQueryClient(createQueryClient(), <AdminScreen />);

    await waitFor(() => {
      expect(queryByTestId('profile-menu-manage-users-row')).toBeFalsy();
      expect(queryByTestId('profile-menu-manage-cards-row')).toBeTruthy();
      expect(queryByTestId('profile-menu-manage-permissions-row')).toBeTruthy();
    });
  });
  it('shows selected admin options based on `Admin` permissions', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions/${businessId}`, (req, res, ctx) =>
        res(ctx.json(adminAllocationsAndPermissionsResponse)),
      ),
    );

    const { queryByTestId } = renderComponentWithQueryClient(createQueryClient(), <AdminScreen />);

    await waitFor(() => {
      expect(queryByTestId('profile-menu-manage-users-row')).toBeTruthy();
      expect(queryByTestId('profile-menu-manage-cards-row')).toBeTruthy();
      expect(queryByTestId('profile-menu-manage-permissions-row')).toBeTruthy();
    });
  });
});
