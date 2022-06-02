import * as React from 'react';
import { fireEvent, cleanup, within } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserRolesAndPermissionsRecord } from '@/generated/capital';
import ReallocationConfirmationScreen from '../ReallocationConfirmationScreen';
import {
  ManageAllocationProvider,
  ReallocationType,
} from '@/Services/Admin/ManageAllocationProvider';
import { AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';
import { bankAccounts } from '@/Helpers/testing/fixtures/business';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

const server = setupServer(
  rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
    res(ctx.json(adminResponse)),
  ),
  rest.get(`/business-bank-accounts`, (req, res, ctx) => res(ctx.json(bankAccounts))),
  rest.get(`/users`, (req, res, ctx) =>
    res(ctx.json(usersResponse.find((u) => u.type === 'BUSINESS_OWNER'))),
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

const rootAllocation = adminResponse.allocations.find((a) => a.name === 'Dovetail');
const allocation = adminResponse.allocations.find((a) => a.name === 'Dinner');
const targetAllocation = adminResponse.allocations.find((a) => a.name === 'Breakfast');

describe('ReallocationConfirmationScreen', () => {
  it('renders', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={allocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        targetAllocationId={targetAllocation?.allocationId!}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
        amount="50"
      >
        <ReallocationConfirmationScreen />
      </ManageAllocationProvider>,
    );

    const testId = await findByTestId('manage-allocations-reallocation-confirmation-screen');
    expect(testId).toBeTruthy();

    const dinner = await findByTestId('Dinner-row');
    expect(within(dinner).queryByText('Dinner')).toBeTruthy();
    expect(within(dinner).queryByText('$108.00')).toBeTruthy();
    expect(dinner).toBeTruthy();

    const breakfast = await findByTestId('Breakfast-row');
    expect(within(breakfast).queryByText('Breakfast')).toBeTruthy();
    expect(within(breakfast).queryByText('$200.00')).toBeTruthy();
    expect(breakfast).toBeTruthy();
  });

  it('navigates to "Admin Dashboard" screen when selecting primary button', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={allocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        targetAllocationId={targetAllocation?.allocationId!}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
        amount="50"
      >
        <ReallocationConfirmationScreen />
      </ManageAllocationProvider>,
    );

    const primaryActionButton = await findByTestId('primary-action-button');

    fireEvent.press(primaryActionButton);

    expect(mockedNavigate).toHaveBeenCalledWith(AdminScreens.Home);
  });

  it('matches snapshot for "Rellocation" with "Add" funds', async () => {
    const result = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={allocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        targetAllocationId={targetAllocation?.allocationId}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
      >
        <ReallocationConfirmationScreen />
      </ManageAllocationProvider>,
    );

    const summary = await result.findByTestId('confirmation-summary');

    expect(summary).toBeTruthy();
    expect(result).toMatchSnapshot();
  });

  it('matches snapshot for "Rellocation" with "Remove" funds', async () => {
    const result = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={allocation?.allocationId!}
        reallocationType={ReallocationType.Remove}
        targetAllocationId={targetAllocation?.allocationId}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
      >
        <ReallocationConfirmationScreen />
      </ManageAllocationProvider>,
    );

    const summary = await result.findByTestId('confirmation-summary');

    expect(summary).toBeTruthy();
    expect(result).toMatchSnapshot();
  });

  it('matches snapshot for "BankTransfer" with "Add" funds', async () => {
    const result = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={rootAllocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        targetAllocationId={bankAccounts[0].businessBankAccountId}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="BUSINESS_OWNER"
      >
        <ReallocationConfirmationScreen />
      </ManageAllocationProvider>,
    );

    const summary = await result.findByTestId('confirmation-summary');

    expect(summary).toBeTruthy();
    expect(result).toMatchSnapshot();
  });

  it('matches snapshot for "BankTransfer" with "Remove" funds', async () => {
    const result = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={rootAllocation?.allocationId!}
        reallocationType={ReallocationType.Remove}
        targetAllocationId={bankAccounts[0].businessBankAccountId}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="BUSINESS_OWNER"
      >
        <ReallocationConfirmationScreen />
      </ManageAllocationProvider>,
    );

    const summary = await result.findByTestId('confirmation-summary');

    expect(summary).toBeTruthy();
    expect(result).toMatchSnapshot();
  });
});
