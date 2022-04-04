import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { ActivateCardDigitEntryScreen } from '@/Containers/ActivateCard/ActivateCardDigitEntryScreen';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/core', () => {
  const actualNav = jest.requireActual('@react-navigation/core');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useFocusEffect: jest.fn(),
  };
});

describe('Activate Card Digit Entry', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('Renders correctly and accepts input', async () => {
    const partialInput = '12';
    const { findByTestId, findByText } = await render(<ActivateCardDigitEntryScreen />);

    const instruction1Text = await findByText('activateCard.enterDigitsInstruction1');
    const lastFourDigitsCodeField = await findByTestId('lastFourDigitsCodeField');

    expect(instruction1Text).toBeTruthy();
    expect(lastFourDigitsCodeField).toBeTruthy();

    fireEvent.changeText(lastFourDigitsCodeField, partialInput);

    await waitFor(() => expect(lastFourDigitsCodeField.props.value).toBe(partialInput));
  });

  it('Navigates to the result screen when 4 digits are entered', async () => {
    const fullInput = '9926';
    const { findByTestId } = await render(<ActivateCardDigitEntryScreen />);

    const lastFourDigitsCodeField = await findByTestId('lastFourDigitsCodeField');

    fireEvent.changeText(lastFourDigitsCodeField, fullInput);

    expect(mockedNavigate).toHaveBeenCalledWith('Activate Card Result', { lastFour: fullInput });
  });
});
