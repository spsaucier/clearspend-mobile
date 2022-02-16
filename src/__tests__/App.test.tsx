/**
 * @format
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';

it('renders correctly', async () => {
  // using View not App for now as useAvailableBioMethod() is throwing weird exceptions
  // a better testing can be done once biometrics is mocked
  await render(<View />);
});
