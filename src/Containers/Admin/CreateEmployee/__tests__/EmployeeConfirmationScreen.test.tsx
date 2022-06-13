import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, cleanup } from '@testing-library/react-native';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import EmployeeConfirmationScreen from '../EmployeeConfirmationScreen';
import { CreateEmployeeProvider } from '@/Services/Admin/CreateEmployeeProvider';
import { AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { usersResponse } from '@/Helpers/testing/fixtures/user';

const user = usersResponse[0];
const { userId } = user;

jest.mock('@/Assets/Images/card-option-physical.png');

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
  useRoute: () => ({
    params: {
      userId,
    },
  }),
}));

const server = setupServer(rest.get(`/users/${userId}`, (req, res, ctx) => res(ctx.json(user))));

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

describe('EmployeeConfirmationScreen', () => {
  it('renders', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <CreateEmployeeProvider>
        <EmployeeConfirmationScreen />
      </CreateEmployeeProvider>,
    );

    const secondaryActionButton = await findByTestId('secondary-action-button');
    fireEvent.press(secondaryActionButton);
    expect(mockedNavigate).toHaveBeenCalledWith(AdminScreens.Employees);

    const primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeEnabled();

    fireEvent.press(primaryActionButton);
    expect(mockedNavigate).toHaveBeenCalledWith(AdminScreens.IssueCard, { user });
  });
});
