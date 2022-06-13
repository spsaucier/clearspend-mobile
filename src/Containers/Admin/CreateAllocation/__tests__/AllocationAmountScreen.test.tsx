import * as React from 'react';
import { fireEvent, cleanup } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { CreateAllocationScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { NewAllocationProvider } from '@/Services/Admin/NewAllocationProvider';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import AllocationAmountScreen from '../AllocationAmountScreen';

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

describe('Allocation Label Screen', () => {
  it('should NOT allow to navigate "Next" when input is empty', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewAllocationProvider>
        <AllocationAmountScreen />
      </NewAllocationProvider>,
    );

    const nextButton = await findByTestId('primary-action-button');
    fireEvent.press(nextButton);

    expect(mockedNavigate).not.toHaveBeenCalledWith(CreateAllocationScreens.SelectManagers);
  });

  it('should ALLOW to navigate to "Next" when input is not empty', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewAllocationProvider>
        <AllocationAmountScreen />
      </NewAllocationProvider>,
    );

    const labelInput = await findByTestId('allocation-amount-input');
    fireEvent.changeText(labelInput, '123');

    const nextButton = await findByTestId('primary-action-button');
    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(CreateAllocationScreens.SelectManagers);
  });
});
