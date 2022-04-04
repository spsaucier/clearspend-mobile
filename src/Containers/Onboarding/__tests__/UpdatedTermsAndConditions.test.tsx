import React from 'react';
import { Linking } from 'react-native';
import { fireEvent, waitFor, act } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import UpdatedTermsAndConditionsScreen from '../UpdatedTermsAndConditionsScreen';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { createQueryClient } from '@/Helpers/testing/reactQuery';

const mockedLogout = jest.fn();

jest.mock('@/Hooks/useAuthentication', () => ({
  useAuthentication: () => ({
    logout: mockedLogout,
  }),
}));

const mockedNavigateReplace = jest.fn();

jest.mock('@react-navigation/core', () => {
  const actualNav = jest.requireActual('@react-navigation/core');
  return {
    ...actualNav,
    useNavigation: () => ({
      replace: mockedNavigateReplace,
    }),
  };
});

const wrapperRender = () =>
  renderComponentWithQueryClient(createQueryClient(), <UpdatedTermsAndConditionsScreen />);

describe('Updated Terms and Conditions', () => {
  it('Launches browser when tapping Terms of Service link', async () => {
    const { findByTestId } = wrapperRender();

    const termsAndConditionsLink = await findByTestId('termsAndPrivacyLink');
    act(() => {
      fireEvent.press(termsAndConditionsLink);
    });

    await waitFor(() => expect(Linking.openURL).toBeCalledTimes(1));
  });

  it('Launches browser when tapping Privacy Policy link', async () => {
    const { findByTestId } = wrapperRender();

    const privacyPolicyLink = await findByTestId('privacyPolicyLink');
    act(() => {
      fireEvent.press(privacyPolicyLink);
    });

    await waitFor(() => expect(Linking.openURL).toBeCalledTimes(1));
  });

  it('Cancel and logout', async () => {
    const { findByTestId } = wrapperRender();

    const logoutButton = await findByTestId('cancelButton');
    act(() => {
      fireEvent.press(logoutButton);
    });

    await waitFor(() => expect(mockedLogout).toBeCalled());
  });

  it('Accept and continue', async () => {
    const server = setupServer(
      rest.patch('*/terms-and-conditions', (req, res, ctx) => res(ctx.body({}))),
    );

    server.listen({
      onUnhandledRequest: 'error',
    });

    const { findByTestId } = wrapperRender();
    const acceptAndContinueButton = await findByTestId('acceptAndContinueButton');
    act(() => {
      fireEvent.press(acceptAndContinueButton);
    });

    await waitFor(() => expect(mockedNavigateReplace).toBeCalled());

    server.resetHandlers();
    server.close();
  });
});
