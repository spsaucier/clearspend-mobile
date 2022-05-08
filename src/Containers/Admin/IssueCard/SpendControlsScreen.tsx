import React, { useEffect, useReducer } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { isEqual } from 'lodash';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import SpendControl, { Limit, MerchantCategoryTypes, PaymentTypes } from '../SpendControl';
import { useAllocation } from '@/Queries/allocation';
import { AllocationDetailsResponse } from '@/generated/capital';
import { ActivityIndicator, CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';

type SpendControlStateType = {
  maxAmount: number;
  paymentTypes: any[];
  categoryTypes: any[];
  limits: {
    currency: string;
    daily: Limit;
    monthly: Limit;
    instant: Limit;
  };
};

const reducer = (state: SpendControlStateType, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case `categoryToggle`: {
      const { categoryTypes } = state;
      const idx = categoryTypes.findIndex((x) => x.key === payload.key);
      categoryTypes[idx].enabled = payload.enabled;

      return {
        ...state,
        categoryTypes,
      };
    }
    case `allCategoriesToggle`: {
      const { categoryTypes } = state;
      return {
        ...state,
        categoryTypes: categoryTypes.map((x) => ({ ...x, enabled: payload })),
      };
    }
    case `paymentToggle`: {
      const { paymentTypes } = state;
      const idx = paymentTypes.findIndex((x) => x.key === payload.key);
      paymentTypes[idx].enabled = payload.enabled;

      return {
        ...state,
        paymentTypes,
      };
    }
    case `allPaymentsToggle`: {
      const { paymentTypes } = state;
      return {
        ...state,
        paymentTypes: paymentTypes.map((x) => ({ ...x, enabled: payload })),
      };
    }
    case `limitUpdate`: {
      const { limits } = state;
      return {
        ...state,
        limits: {
          ...limits,
          ...payload,
        },
      };
    }
    default:
      return state;
  }
};

const SpendControlContent = ({
  allocationData,
  onSpendControlChanged,
}: {
  allocationData: AllocationDetailsResponse;
  onSpendControlChanged: (state: SpendControlStateType) => void;
}) => {
  const {
    disabledMccGroups,
    disabledPaymentTypes,
    limits: allocationLimits,
    allocation,
  } = allocationData;
  const {
    account: { ledgerBalance },
  } = allocation!;

  const [allocationLimit] = allocationLimits!;
  const {
    currency,
    typeMap: { PURCHASE },
  } = allocationLimit;

  const dailyAmount = PURCHASE?.DAILY ? PURCHASE!.DAILY!.amount! : 0;
  const monthlyAmount = PURCHASE?.MONTHLY ? PURCHASE!.MONTHLY!.amount! : 0;
  const instantAmount = PURCHASE?.INSTANT ? PURCHASE!.INSTANT!.amount! : 0;

  const initialState = {
    maxAmount: ledgerBalance!.amount!,
    paymentTypes: PaymentTypes.map((x) => ({
      ...x,
      enabled: disabledPaymentTypes?.find((dp) => dp === x.key) === undefined,
    })),
    categoryTypes: Object.keys(MerchantCategoryTypes).map((x) => ({
      key: x,
      enabled: disabledMccGroups?.find((dg) => dg === x) === undefined,
    })),
    limits: {
      currency,
      daily: { amount: dailyAmount, enabled: dailyAmount > 0 },
      monthly: { amount: monthlyAmount, enabled: monthlyAmount > 0 },
      instant: { amount: instantAmount, enabled: instantAmount > 0 },
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isEqual(state, initialState)) {
      onSpendControlChanged(state);
    }
    // not interesting either initialState and onSpendControlChanged triggering this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <SpendControl
      categoryTypes={state.categoryTypes}
      limits={state.limits}
      maxAmount={state.maxAmount}
      paymentTypes={state.paymentTypes}
      onLimitUpdated={(limit) => {
        dispatch({ type: 'limitUpdate', payload: limit });
      }}
      onAllCategoriesToggle={(enabled) => {
        dispatch({ type: 'allCategoriesToggle', payload: enabled });
      }}
      onCategoryUpdated={(category) => {
        dispatch({ type: 'categoryToggle', payload: category });
      }}
      onAllPaymentTypesToggle={(enabled) => {
        dispatch({ type: 'allPaymentsToggle', payload: enabled });
      }}
      onPaymentTypeUpdated={(payment) => {
        dispatch({ type: 'paymentToggle', payload: payment });
      }}
    />
  );
};

const SpendControlsScreen = () => {
  const { selectedAllocationId, setSpendControl } = useIssueCardContext();

  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.SpendControls>>();

  const {
    data: allocationData,
    isFetching,
    error: allocationError,
  } = useAllocation(selectedAllocationId!);

  const onSpendControlChanged = (state: SpendControlStateType) => {
    const { categoryTypes, limits: sLimits, paymentTypes } = state;
    const disabledMccGroups = categoryTypes.filter((x) => !x.enabled).map((x) => x.key);
    const disabledPaymentTypes = paymentTypes.filter((x) => !x.enabled).map((x) => x.key);

    const typeMap = {
      PURCHASE: {} as any,
    };

    if (sLimits.daily.enabled) {
      typeMap.PURCHASE.DAILY = { amount: sLimits.daily.amount };
    }
    if (sLimits.monthly.enabled) {
      typeMap.PURCHASE.MONTHLY = { amount: sLimits.monthly.amount };
    }
    if (sLimits.instant.enabled) {
      typeMap.PURCHASE.INSTANT = { amount: sLimits.instant.amount };
    }

    setSpendControl({
      disabledMccGroups,
      disabledPaymentTypes,
      limits: {
        currency: sLimits.currency,
        typeMap,
      },
    });
  };

  return (
    <AdminScreenWrapper
      title={t('adminFlows.issueCard.spendControlsTitle')}
      text={t('adminFlows.issueCard.spendControlsText')}
      onPrimaryAction={() => {
        navigate(IssueCardScreens.CardConfirmation);
      }}
      onPrimaryActionLabel="Issue new card"
      primaryActionDisabled={isFetching}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {allocationError ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <CSText>{t('error.generic')}</CSText>
          </View>
        ) : isFetching && !allocationData ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator />
          </View>
        ) : (
          <SpendControlContent
            allocationData={allocationData!}
            onSpendControlChanged={onSpendControlChanged}
          />
        )}
      </ScrollView>
    </AdminScreenWrapper>
  );
};

export default SpendControlsScreen;
