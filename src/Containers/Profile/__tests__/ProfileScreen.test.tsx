import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { MockFeatureFlagsProvider } from '@/Helpers/testing/MockFeatureFlagsProvider';
import { usersResponse } from '@/Helpers/testing/fixtures/user';

import ProfileScreen from '../ProfileScreen';

jest.mock('@/Hooks/useAuthentication', () => ({
  useAuthentication: jest.fn(() => ({
    logout: jest.fn(),
  })),
}));

export const handlers = [
  rest.get('/users', (req, res, ctx) => res(ctx.json({ ...usersResponse[0] }))),
];

const server = setupServer(...handlers);

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

describe('ProfileScreen', () => {
  it('renders', async () => {
    const { findByText } = renderComponentWithQueryClient(
      createQueryClient(),
      <MockFeatureFlagsProvider>
        <ProfileScreen />
      </MockFeatureFlagsProvider>,
    );

    const name = await findByText('Bob Business');

    expect(name).toBeTruthy();
  });
});
