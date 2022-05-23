import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup, fireEvent } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import AdminAllocationsScreen from '../AdminAllocationsScreen';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';

const server = setupServer(
  rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
    res(ctx.json(adminResponse)),
  ),
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

describe('AdminAllocationsScreen', () => {
  it('renders', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <AdminAllocationsScreen />,
    );

    const screen = await findByTestId('admin-allocations-screen');
    const button = await findByTestId('manage-allocation-button');

    expect(screen).toBeTruthy();
    expect(button).toBeDisabled();
  });

  it('selecting a "manageable" allocation enables "Manage allocation" button', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <AdminAllocationsScreen />,
    );

    const option = await findByTestId(`${adminResponse.allocations[0].allocationId}-option`);

    fireEvent.press(option);

    const button = await findByTestId('manage-allocation-button');

    expect(button).toBeEnabled();
  });
});
