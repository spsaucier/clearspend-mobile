import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { act } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import NewPasswordScreen from '@/Containers/Profile/ChangePassword/NewPasswordScreen';
import { usersResponse } from '@/Helpers/testing/fixtures/user';

const mockedPop = jest.fn();
const mockedPopToTop = jest.fn();

jest.mock('@react-navigation/core', () => {
  const actualNav = jest.requireActual('@react-navigation/core');
  return {
    ...actualNav,
    useNavigation: () => ({
      pop: mockedPop,
      popToTop: mockedPopToTop,
    }),
    useRoute: jest.fn().mockReturnValue({
      params: {
        currentPassword: 'test-curr-pass',
      },
    }),
  };
});

const server = setupServer(rest.get(`/users`, (req, res, ctx) => res(ctx.json(usersResponse[0]))));

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const twoFactorPromptResponse = () =>
  rest.post('/authentication/change-password', (req, res, ctx) =>
    res.once(
      ctx.status(242),
      ctx.body({ twoFactorId: 'test-twoFactorId', trustChallenge: 'test-trustChallenge' }),
    ),
  );

describe('NewPasswordScreen', () => {
  it('Displays OTP entry when the backend prompts for OTP, resends request and navigates on success', async () => {
    server.use(twoFactorPromptResponse());

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewPasswordScreen />,
    );

    // Enter a new password
    const newPasswordTextField = await findByTestId('updatePassword-newPasswordEntryField');
    act(() => {
      fireEvent.changeText(newPasswordTextField, 'test-new-pass');
    });
    await waitFor(() => expect(newPasswordTextField.props.value).toBe('test-new-pass'));

    // Press the change password button
    const changePasswordButton = await findByTestId('updatePassword-changePassword-button');
    act(() => {
      fireEvent.press(changePasswordButton);
    });

    // Assert that the enter OTP input has appeared
    const enterOtpInput = await findByTestId('updatePassword-enterOTP-input');
    expect(enterOtpInput).toBeTruthy();

    // Successful OTP response
    server.use(
      rest.post('/authentication/change-password', (req, res, ctx) => res.once(ctx.status(200))),
    );

    act(() => {
      fireEvent.changeText(enterOtpInput, '161616');
    });

    await waitFor(() => expect(enterOtpInput.props.value).toBe('161616'));

    // Navigates back on successful OTP
    await waitFor(() => expect(mockedPopToTop).toBeCalledTimes(1));
  });

  it('Does not display OTP input when not prompted by backend', async () => {
    server.use(
      rest.post('/authentication/change-password', (req, res, ctx) => res.once(ctx.status(200))),
    );

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewPasswordScreen />,
    );

    // Enter a new password
    const newPasswordTextField = await findByTestId('updatePassword-newPasswordEntryField');
    act(() => {
      fireEvent.changeText(newPasswordTextField, 'test-new-pass');
    });
    await waitFor(() => expect(newPasswordTextField.props.value).toBe('test-new-pass'));
    // Navigates back on password change success
    await waitFor(() => expect(mockedPopToTop).toBeCalledTimes(1));
  });

  it('Handles Errors in the OTP flow', async () => {
    server.use(twoFactorPromptResponse());

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <NewPasswordScreen />,
    );

    // Enter a new password
    const newPasswordTextField = await findByTestId('updatePassword-newPasswordEntryField');
    act(() => {
      fireEvent.changeText(newPasswordTextField, 'test-new-pass');
    });
    await waitFor(() => expect(newPasswordTextField.props.value).toBe('test-new-pass'));

    // Press the change password button
    const changePasswordButton = await findByTestId('updatePassword-changePassword-button');
    act(() => {
      fireEvent.press(changePasswordButton);
    });

    // Assert that the enter OTP input has appeared
    const enterOtpInput = await findByTestId('updatePassword-enterOTP-input');
    expect(enterOtpInput).toBeTruthy();

    // Return an incorrect OTP code error
    server.use(
      rest.post('/authentication/change-password', (req, res, ctx) => res.once(ctx.status(421))),
    );

    act(() => {
      fireEvent.changeText(enterOtpInput, '161616');
    });

    await waitFor(() => expect(enterOtpInput.props.value).toBe('161616'));

    // Displays the "Resend OTP" button when the code was wrong
    await waitFor(() => expect(findByTestId('updatePassword-resendOTP-button')).toBeTruthy());
  });
});
