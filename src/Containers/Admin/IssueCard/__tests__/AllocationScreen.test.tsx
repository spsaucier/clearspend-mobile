import * as React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import AllocationScreen from '../AllocationScreen';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

const mockedSelectedAllocationId = jest.fn();

jest.mock('@/Hooks/useIssueCardContext', () => ({
  useIssueCardContext: () => ({
    setSelectedAllocationId: mockedSelectedAllocationId,
  }),
}));

const server = setupServer(
  rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
    res(ctx.json({ allocations: adminResponse })),
  ),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('AllocationScreen', () => {
  it('renders allocation tree', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <AllocationScreen />
      </IssueCardProvider>,
    );

    const testId = await findByTestId('issue-card-allocation');

    const dovetail = await findByTestId('allocation-0-Dovetail');

    const breakfast = await findByTestId('allocation-0-Breakfast');

    const it = await findByTestId('allocation-1-IT');
    const lunch = await findByTestId('allocation-0-Lunch');
    const barkfeast = await findByTestId('allocation-0-Barkfeast');
    const dinner = await findByTestId('allocation-1-Dinner');

    const marketing = await findByTestId('allocation-2-Marketing');
    const q22022 = await findByTestId('allocation-0-Q2 2022');
    const permissions = await findByTestId('allocation-1-Permissions');

    waitFor(() => {
      expect(testId).toBeTruthy();
      expect(dovetail).toBeTruthy();
      expect(breakfast).toBeTruthy();
      expect(it).toBeTruthy();
      expect(lunch).toBeTruthy();
      expect(barkfeast).toBeTruthy();
      expect(dinner).toBeTruthy();
      expect(marketing).toBeTruthy();
      expect(q22022).toBeTruthy();
      expect(permissions).toBeTruthy();
    });
  });

  it('navigates to "Spend Controls" screen after selecting allocation', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <AllocationScreen />
      </IssueCardProvider>,
    );

    const option = await findByTestId('allocation-0-Lunch');

    fireEvent.press(option);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.SpendControls);
    expect(mockedSelectedAllocationId).toHaveBeenCalledWith(adminResponse[5].allocationId);
  });
});
