import React from 'react';
import { Linking } from 'react-native';
import { fireEvent, waitFor, act } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import LoginScreen from '../LoginScreen';

import AuthProvider from '@/Services/Auth/AuthProvider';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { MockFeatureFlagsProvider } from '@/Helpers/testing/MockFeatureFlagsProvider';

describe('Login screen', () => {
  it('Launches browser when tapping Forgot Password', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <MockFeatureFlagsProvider>
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      </MockFeatureFlagsProvider>,
    );

    const forgotPasswordLink = await findByTestId('loginScreen-forgotPasswordLink');
    act(() => {
      fireEvent.press(forgotPasswordLink);
    });

    await waitFor(() => expect(Linking.openURL).toBeCalledTimes(1));
  });
});
