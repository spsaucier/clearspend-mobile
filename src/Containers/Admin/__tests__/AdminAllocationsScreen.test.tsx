import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup, fireEvent } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import AdminAllocationsScreen from '../AdminAllocationsScreen';
import { adminResponse, oneAllocation } from '@/Helpers/testing/fixtures/allocations';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import { bankAccounts } from '@/Helpers/testing/fixtures/business';

const businessOwner = usersResponse.find((u) => u.type === 'BUSINESS_OWNER');
const notABusinessOwner = usersResponse.find((u) => u.type === 'EMPLOYEE');

const server = setupServer(
  rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
    res(ctx.json(adminResponse)),
  ),
  rest.get(`/users`, (req, res, ctx) => res(ctx.json(notABusinessOwner))),
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
    const addFundsButton = await findByTestId('add-funds-button');
    const removeFundsButton = await findByTestId('remove-funds-button');

    expect(button).toBeEnabled();
    expect(addFundsButton).toBeEnabled();
    expect(removeFundsButton).toBeEnabled();
  });

  it('disables "add/remove" allocation options when only allocation exists', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
        res(ctx.json(oneAllocation)),
      ),
    );

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <AdminAllocationsScreen />,
    );

    const option = await findByTestId(`${oneAllocation.allocations[0].allocationId}-option`);

    fireEvent.press(option);

    const button = await findByTestId('manage-allocation-button');
    const addFundsButton = await findByTestId('add-funds-button');
    const removeFundsButton = await findByTestId('remove-funds-button');

    expect(button).toBeEnabled();
    expect(addFundsButton).toBeDisabled();
    expect(removeFundsButton).toBeDisabled();
  });

  it('enables "add/remove" allocation options when one allocation exists with a bank account', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
        res(ctx.json(oneAllocation)),
      ),
    );
    server.use(rest.get(`/users`, (req, res, ctx) => res(ctx.json(businessOwner))));
    server.use(rest.get(`/business-bank-accounts`, (req, res, ctx) => res(ctx.json(bankAccounts))));

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <AdminAllocationsScreen />,
    );

    const option = await findByTestId(`${oneAllocation.allocations[0].allocationId}-option`);

    fireEvent.press(option);

    const button = await findByTestId('manage-allocation-button');
    const addFundsButton = await findByTestId('add-funds-button');
    const removeFundsButton = await findByTestId('remove-funds-button');

    expect(button).toBeEnabled();
    expect(addFundsButton).toBeEnabled();
    expect(removeFundsButton).toBeEnabled();
  });

  it('disables "add/remove" allocation options when one allocation exists with no bank accounts', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
        res(ctx.json(oneAllocation)),
      ),
    );
    server.use(rest.get(`/users`, (req, res, ctx) => res(ctx.json(businessOwner))));
    server.use(rest.get(`/business-bank-accounts`, (req, res, ctx) => res(ctx.json([]))));

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <AdminAllocationsScreen />,
    );

    const option = await findByTestId(`${oneAllocation.allocations[0].allocationId}-option`);

    fireEvent.press(option);

    const button = await findByTestId('manage-allocation-button');
    const addFundsButton = await findByTestId('add-funds-button');
    const removeFundsButton = await findByTestId('remove-funds-button');

    expect(button).toBeEnabled();
    expect(addFundsButton).toBeDisabled();
    expect(removeFundsButton).toBeDisabled();
  });
});
