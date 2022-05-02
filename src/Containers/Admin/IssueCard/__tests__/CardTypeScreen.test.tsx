import * as React from 'react';
import { render, fireEvent, within } from '@testing-library/react-native';
import CardTypeScreen from '../CardTypeScreen';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';

jest.mock('@/Assets/Images/card-option-physical.png');
jest.mock('@/Assets/Images/card-option-virtual.png');

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

    // on
    fireEvent.press(physicalOption);
    expect(within(physicalOption).queryByTestId('check-mark-icon')).toBeTruthy();
    fireEvent.press(virtualOption);
    expect(within(virtualOption).queryByTestId('check-mark-icon')).toBeTruthy();

    // enables "next" button
    let nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();

    // off
    fireEvent.press(physicalOption);
    expect(within(physicalOption).queryByTestId('check-mark-icon')).toBeFalsy();
    fireEvent.press(virtualOption);
    expect(within(virtualOption).queryByTestId('check-mark-icon')).toBeFalsy();

    // disables "next" button
    nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeDisabled();
  });
});
