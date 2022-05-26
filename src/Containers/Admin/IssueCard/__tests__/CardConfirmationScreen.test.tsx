import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardConfirmationScreen from '../CardConfirmationScreen';
import { IssueCardProvider, CardType } from '@/Services/Admin/IssueCardProvider';
import { AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

jest.mock('@/Assets/Images/card-physical.png');
jest.mock('@/Assets/Images/card-virtual.png');

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('CardConfirmationScreen', () => {
  it('shows "virtual" card confirmation', async () => {
    const { findByTestId } = render(
      <IssueCardProvider>
        <CardConfirmationScreen />
      </IssueCardProvider>,
    );

    const testId = await findByTestId('issue-card-card-confirmation');
    expect(testId).toBeTruthy();

    const cardVirtualImage = await findByTestId('card-virtual-image');
    expect(cardVirtualImage).toBeTruthy();

    const cardVirtualText = await findByTestId('card-virtual-text');
    expect(cardVirtualText).toBeTruthy();
  });

  it('shows "physical" card confirmation', async () => {
    const { findByTestId } = render(
      <IssueCardProvider selectedCardType={CardType.Physical}>
        <CardConfirmationScreen />
      </IssueCardProvider>,
    );

    const cardPhysicalImage = await findByTestId('card-physical-image');
    expect(cardPhysicalImage).toBeTruthy();

    const cardPhysicalText = await findByTestId('card-physical-text');
    expect(cardPhysicalText).toBeTruthy();
  });

  it('navigates to "Admin Dashboard" screen when selecting primary button', async () => {
    const { findByTestId } = render(
      <IssueCardProvider>
        <CardConfirmationScreen />
      </IssueCardProvider>,
    );

    const nextButton = await findByTestId('primary-action-button');

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(AdminScreens.Home);
  });
});
