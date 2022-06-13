import * as React from 'react';
import { fireEvent, cleanup } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { CreateAllocationScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { NewAllocationProvider } from '@/Services/Admin/NewAllocationProvider';
import ParentAllocationScreen from '../ParentAllocationScreen';
import { usersResponse } from '@/Helpers/testing/fixtures/user';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
  useIsFocused: jest.fn(() => true),
}));

const server = setupServer(
  rest.get(`/users/list`, (_, res, ctx) => res(ctx.json(usersResponse))),
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

describe('Parent Allocation Screen', () => {
  it('should NOT navigates to "Next" screen when no parent allocation is being selected', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewAllocationProvider>
        <ParentAllocationScreen />
      </NewAllocationProvider>,
    );

    const nextButton = await findByTestId('primary-action-button');
    fireEvent.press(nextButton);

    expect(mockedNavigate).not.toHaveBeenCalledWith(CreateAllocationScreens.AllocationLabel);
  });

  it('navigates to "Next" screen after selecting a parent allocation', async () => {
    const parentAllocation = adminResponse.allocations.find((a) => a.name === 'Lunch');

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewAllocationProvider>
        <ParentAllocationScreen />
      </NewAllocationProvider>,
    );

    const option = await findByTestId(`${parentAllocation!.allocationId}-option`);
    fireEvent.press(option);

    const nextButton = await findByTestId('primary-action-button');
    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(CreateAllocationScreens.AllocationLabel);
  });
});
