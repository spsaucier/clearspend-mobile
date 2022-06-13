import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup, fireEvent } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import { NewAllocationProvider } from '@/Services/Admin/NewAllocationProvider';
import { adminResponse } from '@/Helpers/testing/fixtures/allocations';
import { CreateAllocationScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import SelectViewersScreen from '../SelectViewersScreen';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
  useIsFocused: jest.fn(() => true),
}));

const server = setupServer(
  rest.get(`/users/list`, (req, res, ctx) => res(ctx.json(usersResponse))),
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

describe('Select Viewers Screen', () => {
  it('should not select any viewer in the list and should not navigate to "Next"', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewAllocationProvider>
        <SelectViewersScreen />
      </NewAllocationProvider>,
    );

    const nextButton = await findByTestId('primary-action-button');
    fireEvent.press(nextButton);

    expect(mockedNavigate).not.toHaveBeenCalledWith(CreateAllocationScreens.ConfirmDetails);
  });

  it('should select the first viewer in the list and navigate to "Next"', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewAllocationProvider>
        <SelectViewersScreen />
      </NewAllocationProvider>,
    );

    const [first] = usersResponse;
    const { userId } = first;

    const userRow = await findByTestId(userId);
    await fireEvent.press(userRow);

    const checkIcon = await findByTestId(`${userId}-check-mark-icon`);
    expect(checkIcon).toBeTruthy();

    const nextButton = await findByTestId('primary-action-button');
    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(CreateAllocationScreens.ConfirmDetails);
  });
});
