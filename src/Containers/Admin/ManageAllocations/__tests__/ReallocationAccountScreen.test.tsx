import * as React from 'react';
import { fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserRolesAndPermissionsRecord } from '@/generated/capital';
import ReallocationAccountScreen from '../ReallocationAccountScreen';
import {
  ManageAllocationProvider,
  ReallocationType,
} from '@/Services/Admin/ManageAllocationProvider';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';
import { bankAccounts } from '@/Helpers/testing/fixtures/business';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { ManageAllocationScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
  useIsFocused: () => true,
}));

const server = setupServer(
  rest.get(`/users`, (req, res, ctx) =>
    res(ctx.json(usersResponse.find((u) => u.type === 'BUSINESS_OWNER'))),
  ),
  rest.get(`/business-bank-accounts`, (req, res, ctx) => res(ctx.json(bankAccounts))),
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

describe('ReallocationAccountScreen', () => {
  it('renders "Add" funds screen without selected allocation as an option and bank account', async () => {
    const selectedAllocation = adminResponse.allocations.find((a) => a.name === 'Dovetail');
    const anyOtherAllocation = adminResponse.allocations.find((a) => a.name === 'Breakfast');
    const { queryByTestId, queryByText } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={selectedAllocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="BUSINESS_OWNER"
      >
        <ReallocationAccountScreen />
      </ManageAllocationProvider>,
    );

    await waitFor(() => {
      const testId = queryByTestId('admin-allocations-add-or-remove-screen');
      expect(testId).toBeTruthy();

      const title = queryByText('adminFlows.manageAllocation.addFundsTitle');
      expect(title).toBeTruthy();

      const text = queryByText('adminFlows.manageAllocation.addFundsText');
      expect(text).toBeTruthy();

      const bankAccount = queryByTestId('business-account-Plaid Saving');
      expect(bankAccount).toBeTruthy();

      const anyOtherOption = queryByTestId(`${anyOtherAllocation?.allocationId}-option`);
      expect(anyOtherOption).toBeTruthy();

      // should not be in allocation list
      const selectedOption = queryByTestId(`${selectedAllocation?.allocationId}-option`);
      expect(selectedOption).toBeFalsy();

      const nextButton = queryByTestId('primary-action-button');
      expect(nextButton).toBeDisabled();
    });
  });

  it('renders "Remove" funds screen without bank account', async () => {
    const selectedAllocation = adminResponse.allocations.find((a) => a.name === 'Lunch');
    const { queryByText } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={selectedAllocation?.allocationId!}
        reallocationType={ReallocationType.Remove}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
      >
        <ReallocationAccountScreen />
      </ManageAllocationProvider>,
    );

    await waitFor(() => {
      const title = queryByText('adminFlows.manageAllocation.removeFundsTitle');
      expect(title).toBeTruthy();

      const text = queryByText('adminFlows.manageAllocation.removeFundsText');
      expect(text).toBeTruthy();

      const bankAccount = queryByText('Plaid Saving');
      expect(bankAccount).toBeFalsy();
    });
  });

  it('primary action button is enabled after target allocation selection', async () => {
    const selectedAllocation = adminResponse.allocations.find((a) => a.name === 'Lunch');
    const anyOtherAllocation = adminResponse.allocations.find((a) => a.name === 'Breakfast');
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={selectedAllocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="BUSINESS_OWNER"
      >
        <ReallocationAccountScreen />
      </ManageAllocationProvider>,
    );

    const option = await findByTestId(`${anyOtherAllocation?.allocationId}-option`);

    fireEvent.press(option);

    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();

    fireEvent.press(nextButton);
    expect(mockedNavigate).toHaveBeenCalledWith(ManageAllocationScreens.ReallocationAmount);
  });
});
