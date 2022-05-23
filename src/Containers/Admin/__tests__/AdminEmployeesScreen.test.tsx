import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import AdminEmployeesScreen from '../AdminEmployeesScreen';
import { usersResponse } from '@/Helpers/testing/fixtures/user';

const server = setupServer(
  rest.get(`/users/list`, (req, res, ctx) => res(ctx.json(usersResponse))),
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

    expect(screen).toBeTruthy();
  });
});
