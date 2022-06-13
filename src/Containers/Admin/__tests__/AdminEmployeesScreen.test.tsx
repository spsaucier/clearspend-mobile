import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import AdminEmployeesScreen from '../AdminEmployeesScreen';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';

const server = setupServer(
  rest.get(`/users/list`, (req, res, ctx) => res(ctx.json(usersResponse))),
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

describe('AdminEmployeesScreen', () => {
  it('renders', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <AdminEmployeesScreen />,
    );

    const screen = await findByTestId('admin-employees-screen');
    const addEmployeeButton = await findByTestId('add-employee-button');

    expect(screen).toBeTruthy();
    expect(addEmployeeButton).toBeTruthy();
  });
});
