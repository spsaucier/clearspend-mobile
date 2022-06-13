import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmployeeFirstNameScreen from '../EmployeeFirstNameScreen';
import { CreateEmployeeProvider } from '@/Services/Admin/CreateEmployeeProvider';

describe('EmployeeFirstNameScreen', () => {
  it('renders', async () => {
    const { findByTestId } = render(
      <CreateEmployeeProvider>
        <EmployeeFirstNameScreen />
      </CreateEmployeeProvider>,
    );

    let primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeDisabled();

    const input = await findByTestId('create-employee-first-name-input');
    fireEvent.changeText(input, 'John');

    primaryActionButton = await findByTestId('primary-action-button');
    expect(primaryActionButton).toBeEnabled();
  });
});
