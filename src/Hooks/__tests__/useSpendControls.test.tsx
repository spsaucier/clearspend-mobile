import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Text } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { useSpendControls } from '@/Hooks/useSpendControls';
import { managerAllocationsAndPermissionsResponse } from '@/Helpers/testing/fixtures/permissions';

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

const TestComponent = ({ allocationId }: { allocationId: string }) => {
  const canUseSpendControls = useSpendControls(allocationId);

  return canUseSpendControls ? <Text>Spend Controls</Text> : null;
};

describe('useSpendControls', () => {
  it('shows "Spend Controls" option when user has permission', async () => {
    const { allocationId } = managerAllocationsAndPermissionsResponse.userRoles[1];

    server.use(
      rest.get(`/roles-and-permissions/allPermissions/${businessId}`, (req, res, ctx) =>
        res(ctx.json(managerAllocationsAndPermissionsResponse)),
      ),
    );

    const { queryByText } = renderComponentWithQueryClient(
      createQueryClient(),
      <TestComponent allocationId={allocationId} />,
    );

    await waitFor(() => {
      expect(queryByText('Spend Controls')).toBeTruthy();
    });
  });
  it('does not show "Spend Controls" option when user has no permission', async () => {
    const { allocationId } = managerAllocationsAndPermissionsResponse.userRoles[0];

    server.use(
      rest.get(`/roles-and-permissions/allPermissions/${businessId}`, (req, res, ctx) =>
        res(ctx.json(managerAllocationsAndPermissionsResponse)),
      ),
    );

    const { queryByText } = renderComponentWithQueryClient(
      createQueryClient(),
      <TestComponent allocationId={allocationId} />,
    );

    await waitFor(() => {
      expect(queryByText('Spend Controls')).toBeFalsy();
    });
  });
});
