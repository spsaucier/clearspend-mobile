import * as React from 'react';
import { render } from '@testing-library/react-native';
import i18next from 'i18next';
import SpendControl from '../SpendControl';

describe('SpendControl', () => {
  it('renders spend control state', async () => {
    await i18next.changeLanguage('cimode');
    const initialState = {
      categoryTypes: [],
      paymentTypes: [],
      limits: {
        daily: { amount: 200.0, enabled: true },
        monthly: { amount: 300.0, enabled: true },
        instant: { amount: 100.0, enabled: true },
      },
      disableForeign: false,
    };

    const { findByTestId } = render(
      <SpendControl
        categoryTypes={initialState.categoryTypes}
        paymentTypes={initialState.paymentTypes}
        limits={initialState.limits}
        disableForeign
        onAllCategoriesToggle={() => {}}
        onAllPaymentTypesToggle={() => {}}
        onCategoryUpdated={() => {}}
        onLimitUpdated={() => {}}
        onPaymentTypeUpdated={() => {}}
        onInternationalToggle={() => {}}
      />,
    );

    const dailyLimitAmount = await findByTestId('dailyLimitAmount');
    expect(dailyLimitAmount.props.value).toBe(`$${initialState.limits.daily.amount.toFixed(2)}`);

    const monthlyLimitAmount = await findByTestId('monthlyLimitAmount');
    expect(monthlyLimitAmount.props.value).toBe(
      `$${initialState.limits.monthly.amount.toFixed(2)}`,
    );

    const instantLimitAmount = await findByTestId('instantLimitAmount');
    expect(instantLimitAmount.props.value).toBe(
      `$${initialState.limits.instant.amount.toFixed(2)}`,
    );
  });
});
