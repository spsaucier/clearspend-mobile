import * as React from 'react';
import { render, fireEvent, within } from '@testing-library/react-native';
import CardTypeScreen from '../CardTypeScreen';
import { IssueCardProvider, CardType } from '@/Services/Admin/IssueCardProvider';
import { IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

jest.mock('@/Assets/Images/card-option-physical.png');
jest.mock('@/Assets/Images/card-option-virtual.png');

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('CardTypeScreen', () => {
  it('renders default state', async () => {
    const { findByTestId } = render(
      <IssueCardProvider>
        <CardTypeScreen />
      </IssueCardProvider>,
    );

    const testId = await findByTestId('issue-card-card-type');
    expect(testId).toBeTruthy();

    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeDisabled();
  });

  it('selecting a "card type" option toggles on/off', async () => {
    const { findByTestId } = render(
      <IssueCardProvider>
        <CardTypeScreen />
      </IssueCardProvider>,
    );

    const physicalOption = await findByTestId('physical-card-option');
    const virtualOption = await findByTestId('virtual-card-option');

    fireEvent.press(physicalOption);
    expect(within(physicalOption).queryByTestId('check-mark-icon')).toBeTruthy();

    // enables "next" button
    let nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();

    // toggles
    fireEvent.press(virtualOption);
    expect(within(virtualOption).queryByTestId('check-mark-icon')).toBeTruthy();
    expect(within(physicalOption).queryByTestId('check-mark-icon')).toBeFalsy();

    nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();
  });

  it('navigates to "Employee" screen when no user is pre-selected', async () => {
    const { findByTestId } = render(
      <IssueCardProvider selectedCardType={CardType.Virtual}>
        <CardTypeScreen />
      </IssueCardProvider>,
    );

    const nextButton = await findByTestId('primary-action-button');

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.Employee);
  });

  it('navigates to "Allocation" screen when user is pre-selected and card type is "Virtual"', async () => {
    const { findByTestId } = render(
      <IssueCardProvider selectedCardType={CardType.Virtual} selectedUser={{ userId: '123' }}>
        <CardTypeScreen />
      </IssueCardProvider>,
    );

    const nextButton = await findByTestId('primary-action-button');

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.Allocation);
  });

  it('navigates to "Card Details" screen when user is pre-selected and card type is "Physical"', async () => {
    const { findByTestId } = render(
      <IssueCardProvider selectedCardType={CardType.Physical} selectedUser={{ userId: '123' }}>
        <CardTypeScreen />
      </IssueCardProvider>,
    );

    const nextButton = await findByTestId('primary-action-button');

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.CardDetails);
  });
});
