import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardDetailsScreen from '../CardDetailsScreen';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';

describe('CardDetailsScreen', () => {
  it('renders default state', async () => {
    const { findByTestId } = render(
      <IssueCardProvider>
        <CardDetailsScreen />
      </IssueCardProvider>,
    );

    const testId = await findByTestId('issue-card-card-details');
    expect(testId).toBeTruthy();

    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();
  });

  it('selecting "show employee name" option toggles on/off', async () => {
    const { findByTestId } = render(
      <IssueCardProvider>
        <CardDetailsScreen />
      </IssueCardProvider>,
    );

    const off = await findByTestId('card-details-switch-off');

    // on
    fireEvent.press(off);

    const on = await findByTestId('card-details-switch-on');

    expect(on).toBeTruthy();
  });
});
