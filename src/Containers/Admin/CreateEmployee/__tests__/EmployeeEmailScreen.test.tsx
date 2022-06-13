import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmployeeEmailScreen from '../EmployeeEmailScreen';
import { CreateEmployeeProvider } from '@/Services/Admin/CreateEmployeeProvider';

describe('EmployeeEmailScreen', () => {
  it('renders', async () => {
    const { findByTestId } = render(
      <CreateEmployeeProvider>
        <EmployeeEmailScreen />
      </CreateEmployeeProvider>,
    );

    let primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeDisabled();

    const input = await findByTestId('create-employee-first-name-input');
    fireEvent.changeText(input, 'john@example.com');

    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeEnabled();
  });
});
