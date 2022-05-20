import * as React from 'react';
import { fireEvent, within, cleanup } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import EmployeeScreen from '../EmployeeScreen';
import { IssueCardProvider, CardType } from '@/Services/Admin/IssueCardProvider';
import { usersResponse } from '@/Helpers/testing/fixtures/user';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

const server = setupServer(
  rest.get(`/users/list`, (req, res, ctx) => res(ctx.json(usersResponse))),
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

describe('EmployeeScreen', () => {
  it('renders default state', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <EmployeeScreen />
      </IssueCardProvider>,
    );

    const testId = await findByTestId('issue-card-employee');
    expect(testId).toBeTruthy();

    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeDisabled();
  });

  it('selects "user" option', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <EmployeeScreen />
      </IssueCardProvider>,
    );

    const option = await findByTestId(usersResponse[0].userId);

    // select user
    fireEvent.press(option);
    expect(within(option).queryByTestId('check-mark-icon')).toBeTruthy();

    // enables "next" button
    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();
  });

  it('navigates to "Allocation" screen when "physical" card type is not selected', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider selectedCardType={CardType.Virtual}>
        <EmployeeScreen />
      </IssueCardProvider>,
    );

    const option = await findByTestId(usersResponse[0].userId);

    fireEvent.press(option);

    const nextButton = await findByTestId('primary-action-button');

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.Allocation);
  });

  it('navigates to "Card Details" screen when "physical" card type is selected', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider selectedCardType={CardType.Physical}>
        <EmployeeScreen />
      </IssueCardProvider>,
    );

    const option = await findByTestId(usersResponse[0].userId);

    fireEvent.press(option);

    const nextButton = await findByTestId('primary-action-button');

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.CardDetails);
  });
});
