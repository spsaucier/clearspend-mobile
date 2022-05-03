import * as React from 'react';
import { fireEvent, within } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import AddressScreen from '../AddressScreen';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';
import { businessResponse } from '@/Helpers/testing/fixtures/business';
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
  rest.get(`/businesses`, (req, res, ctx) => res(ctx.json(businessResponse))),
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

describe('AddressScreen', () => {
  it('renders default state', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <AddressScreen />
      </IssueCardProvider>,
    );

    const testId = await findByTestId('issue-card-address');
    expect(testId).toBeTruthy();

    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeDisabled();
  });

  it('selecting "business address" option navigates to "allocation" screen', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <AddressScreen />
      </IssueCardProvider>,
    );

    const option = await findByTestId('business-address-option');

    // select user
    fireEvent.press(option);
    expect(within(option).queryByTestId('check-mark-icon')).toBeTruthy();

    // enables "next" button
    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.Allocation);
  });

  it('selecting "new address" option navigates to "new address" screen', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <AddressScreen />
      </IssueCardProvider>,
    );

    const option = await findByTestId('new-address-option');

    // select user
    fireEvent.press(option);
    expect(within(option).queryByTestId('check-mark-icon')).toBeTruthy();

    // enables "next" button
    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.NewAddress);
  });
});
