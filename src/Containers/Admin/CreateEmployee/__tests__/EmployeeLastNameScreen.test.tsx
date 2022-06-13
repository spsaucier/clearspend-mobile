import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmployeeLastNameScreen from '../EmployeeLastNameScreen';
import { CreateEmployeeProvider } from '@/Services/Admin/CreateEmployeeProvider';

describe('EmployeeLastNameScreen', () => {
  it('renders', async () => {
    const { findByTestId } = render(
      <CreateEmployeeProvider>
        <EmployeeLastNameScreen />
      </CreateEmployeeProvider>,
    );

    let primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeDisabled();

    const input = await findByTestId('create-employee-last-name-input');
    fireEvent.changeText(input, 'John');

    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeEnabled();
  });
});
