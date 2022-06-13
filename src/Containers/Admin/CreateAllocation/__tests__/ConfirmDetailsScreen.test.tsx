import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import { NewAllocationProvider } from '@/Services/Admin/NewAllocationProvider';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';
import ConfirmDetailsScreen from '../ConfirmDetailsScreen';
import { formatCurrency } from '@/Helpers/StringHelpers';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
  useIsFocused: jest.fn(() => true),
}));

const server = setupServer(
  rest.get(`/users/list`, (_, res, ctx) => res(ctx.json(usersResponse))),
  rest.get(`/roles-and-permissions/allPermissions`, (_, res, ctx) => res(ctx.json(adminResponse))),
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

describe('Confirm Details Screen', () => {
  it('should render confirmation details screen with allocation name, parent allocation name, amount, 1 manager and 1 viewer', async () => {
    const label = 'test';
    const amount = '200.00';
    const parentAllocationId = '7a2ed2cd-f517-428e-8b3e-bf7e13b1bb51';
    const [first, second] = usersResponse;

    const managers = [
      { userId: first.userId, firstName: first.firstName, lastName: first.lastName },
    ];
    const viewers = [
      { userId: first.userId, firstName: second.firstName, lastName: second.lastName },
    ];

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewAllocationProvider
        selectedParentAllocationId={parentAllocationId}
        allocationLabel={label}
        allocationAmount={amount}
        selectedManagers={managers}
        selectedViewers={viewers}
      >
        <ConfirmDetailsScreen />
      </NewAllocationProvider>,
    );

    const allocationLabel = await findByTestId('allocationLabel');
    expect(allocationLabel.props.children).toBe('test');

    const parentAllocationName = await findByTestId('parentAllocationName');
    expect(parentAllocationName.props.children).toBe('Breakfast');

    const allocationAmount = await findByTestId('allocationAmount');
    expect(allocationAmount.props.children).toBe(formatCurrency(Number(amount)));

    const managerSectionHeader = await findByTestId('manager-header');
    expect(managerSectionHeader.props.children).toBe(
      'adminFlows.createAllocation.confirmDetails.manager',
    );

    const managerContainer = await findByTestId('manager-container');
    expect(managerContainer.children.length).toBe(1);

    const viewerSectionHeader = await findByTestId('viewer-header');
    expect(viewerSectionHeader.props.children).toBe(
      'adminFlows.createAllocation.confirmDetails.viewer',
    );

    const viewerContainer = await findByTestId('viewer-container');
    expect(viewerContainer.children.length).toBe(1);
  });

  it('should render multiple managers and multiple viewer', async () => {
    const label = 'test';
    const amount = '200.00';
    const parentAllocationId = '7a2ed2cd-f517-428e-8b3e-bf7e13b1bb51';

    const first3Users = usersResponse!.slice(0, 3).map((x) => ({
      userId: x.userId,
      firstName: x.firstName,
      lastName: x.lastName,
    }));

    const last3Users = usersResponse!
      .reverse()
      .slice(0, 3)
      .map((x) => ({
        userId: x.userId,
        firstName: x.firstName,
        lastName: x.lastName,
      }));

    const managers = [...first3Users];
    const viewers = [...last3Users];

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewAllocationProvider
        selectedParentAllocationId={parentAllocationId}
        allocationLabel={label}
        allocationAmount={amount}
        selectedManagers={managers}
        selectedViewers={viewers}
      >
        <ConfirmDetailsScreen />
      </NewAllocationProvider>,
    );

    const managerHeader = await findByTestId('manager-header');
    expect(managerHeader.props.children).toBe(
      'adminFlows.createAllocation.confirmDetails.managers',
    );

    const managerContainer = await findByTestId('manager-container');
    expect(managerContainer.children.length).toBe(3);

    const viewerHeader = await findByTestId('viewer-header');
    expect(viewerHeader.props.children).toBe('adminFlows.createAllocation.confirmDetails.viewers');

    const viewerContainer = await findByTestId('viewer-container');
    expect(viewerContainer.children.length).toBe(3);
  });
});
