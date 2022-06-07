import * as React from 'react';
import { fireEvent, waitFor, cleanup, within } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserRolesAndPermissionsRecord } from '@/generated/capital';
import ReallocationAmountScreen from '../ReallocationAmountScreen';
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
}));

const server = setupServer(
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
const selectedAllocation = adminResponse.allocations.find((a) => a.name === 'Dinner');
const selectedTargetAllocation = adminResponse.allocations.find((a) => a.name === 'Breakfast');

describe('ReallocationAmountScreen', () => {
  it('renders "ADD" allocations order correctly', async () => {
    const { queryByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={selectedAllocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        targetAllocationId={selectedTargetAllocation?.allocationId!}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
      >
        <ReallocationAmountScreen />
      </ManageAllocationProvider>,
    );

    await waitFor(() => {
      const testId = queryByTestId('admin-allocations-transfer-amount-screen');
      expect(testId).toBeTruthy();

      const fromTile = queryByTestId('FROM-tile');
      expect(fromTile).toBeTruthy();
      expect(within(fromTile!).queryByText('Breakfast')).toBeTruthy();
      expect(within(fromTile!).queryByText('$200.00')).toBeTruthy();

      const toTile = queryByTestId('TO-tile');
      expect(toTile).toBeTruthy();
      expect(within(toTile!).queryByText('Dinner')).toBeTruthy();
      expect(within(toTile!).queryByText('$108.00')).toBeTruthy();

      const primaryActionButton = queryByTestId('primary-action-button');
      expect(primaryActionButton).toBeDisabled();
    });
  });

  it('renders "REMOVE" allocations order correctly', async () => {
    const { queryByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={selectedAllocation?.allocationId!}
        reallocationType={ReallocationType.Remove}
        targetAllocationId={selectedTargetAllocation?.allocationId!}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
      >
        <ReallocationAmountScreen />
      </ManageAllocationProvider>,
    );

    await waitFor(() => {
      const testId = queryByTestId('admin-allocations-transfer-amount-screen');
      expect(testId).toBeTruthy();

      const fromTile = queryByTestId('FROM-tile');
      expect(fromTile).toBeTruthy();
      expect(within(fromTile!).queryByText('Dinner')).toBeTruthy();
      expect(within(fromTile!).queryByText('$108.00')).toBeTruthy();

      const toTile = queryByTestId('TO-tile');
      expect(toTile).toBeTruthy();
      expect(within(toTile!).queryByText('Breakfast')).toBeTruthy();
      expect(within(toTile!).queryByText('$200.00')).toBeTruthy();

      const primaryActionButton = queryByTestId('primary-action-button');
      expect(primaryActionButton).toBeDisabled();
    });
  });

  it('validates amount', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={selectedAllocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        targetAllocationId={selectedTargetAllocation?.allocationId!}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
      >
        <ReallocationAmountScreen />
      </ManageAllocationProvider>,
    );

    let primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeDisabled();

    const amountInput = await findByTestId('amount-input');

    // zero
    fireEvent.changeText(amountInput, '0');
    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeDisabled();

    // negative value
    fireEvent.changeText(amountInput, '-1');
    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeDisabled();

    // value with too many decimals
    fireEvent.changeText(amountInput, '100.0000000');
    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeDisabled();

    // value with only one decimal
    fireEvent.changeText(amountInput, '100.0');
    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeDisabled();

    // valid value (integer)
    fireEvent.changeText(amountInput, '100');
    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeEnabled();

    // value value (decimal)
    fireEvent.changeText(amountInput, '100.00');
    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeEnabled();

    // value with thousandths commas
    fireEvent.changeText(amountInput, '5,000.00');
    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeEnabled();
  });

  it('navigates to "Bank Transfer" request screen if bank account was selected', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={rootAllocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        targetAllocationId={bankAccounts[0].businessBankAccountId}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="BUSINESS_OWNER"
      >
        <ReallocationAmountScreen />
      </ManageAllocationProvider>,
    );

    const amountInput = await findByTestId('amount-input');

    fireEvent.changeText(amountInput, '500');

    const primaryActionButton = await findByTestId('primary-action-button');

    fireEvent.press(primaryActionButton);

    const bankTransferPrompt = await findByTestId('bank-transfer-prompt');
    expect(bankTransferPrompt).toBeTruthy();
  });

  it('navigates to "Reallocation" request screen if bank account was not selected', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <ManageAllocationProvider
        allocationId={selectedAllocation?.allocationId!}
        reallocationType={ReallocationType.Add}
        targetAllocationId={selectedTargetAllocation?.allocationId!}
        allocations={adminResponse.allocations}
        userRoles={adminResponse.userRoles as UserRolesAndPermissionsRecord[]}
        userType="EMPLOYEE"
      >
        <ReallocationAmountScreen />
      </ManageAllocationProvider>,
    );

    const amountInput = await findByTestId('amount-input');

    fireEvent.changeText(amountInput, '500');

    const primaryActionButton = await findByTestId('primary-action-button');

    fireEvent.press(primaryActionButton);

    expect(mockedNavigate).toHaveBeenCalledWith(ManageAllocationScreens.ReallocationRequest);
  });
});
