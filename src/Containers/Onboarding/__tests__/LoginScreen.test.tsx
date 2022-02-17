import React from 'react';
import { Linking } from 'react-native';
import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import LoginScreen from '../LoginScreen';

import AuthProvider from '@/Services/Auth/AuthProvider';

describe('Login screen', () => {
  it('Launches browser when tapping Forgot Password', async () => {
    const { findByTestId } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>,
    );

    const forgotPasswordLink = await findByTestId('forgotPasswordLink');
    act(() => {
      fireEvent.press(forgotPasswordLink);
    });

    await waitFor(() => expect(Linking.openURL).toBeCalledTimes(1));
  });
});
