import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { waitFor } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import {
  employeeAllocationsAndPermissionsResponse,
  managerAllocationsAndPermissionsResponse,
  adminAllocationsAndPermissionsResponse,
} from '@/Helpers/testing/fixtures/permissions';

import ProfileScreen from '../ProfileScreen';

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(),
  getBuildNumber: jest.fn(),
}));

jest.mock('@/Hooks/useAuthentication', () => ({
  useAuthentication: jest.fn(() => ({
    logout: jest.fn(),
  })),
}));

jest.mock('react-native-config', () => ({
  SHOW_ADMIN: 'true',
}));

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

describe('ProfileScreen', () => {
  it('shows admin row when an `allocationRole` contains `Manager`', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions/${businessId}`, (req, res, ctx) =>
        res(ctx.json(managerAllocationsAndPermissionsResponse)),
      ),
    );

    const { queryByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ProfileScreen />,
    );

    await waitFor(() => {
      expect(queryByTestId('profile-menu-admin-row')).toBeTruthy();
    });
  });
  it('shows admin row when an `allocationRole` contains `Admin`', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions/${businessId}`, (req, res, ctx) =>
        res(ctx.json(adminAllocationsAndPermissionsResponse)),
      ),
    );

    const { queryByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ProfileScreen />,
    );

    await waitFor(() => {
      expect(queryByTestId('profile-menu-admin-row')).toBeTruthy();
    });
  });
  it('does not show admin row when an `allocationRole` does not contain `Manager` or `Admin`', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions/${businessId}`, (req, res, ctx) =>
        res(ctx.json(employeeAllocationsAndPermissionsResponse)),
      ),
    );

    const { queryByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ProfileScreen />,
    );

    await waitFor(() => {
      expect(queryByTestId('profile-menu-admin-row')).toBeFalsy();
    });
  });
});
