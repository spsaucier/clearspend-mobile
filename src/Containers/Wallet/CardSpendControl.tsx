import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useNavigation, useRoute } from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import { isEqual, cloneDeep } from 'lodash';

import tw from '@/Styles/tailwind';

import { WalletScreens, WalletStackParamTypes } from '@/Navigators/Wallet/WalletNavigatorTypes';

import {
  ActivityIndicator,
  BackButtonNavigator,
  Button,
  CSText,
  FocusAwareStatusBar,
} from '@/Components';
import { VerticalGradient } from '@/Components/Svg/VerticalGradient';
import SpendControl, {
  MerchantCategoryType,
  Limit,
  PaymentType,
  MerchantCategoryTypes,
  PaymentTypes,
} from '../Admin/SpendControl';
import { useCard } from '@/Queries';
import { useSaveCardSpendControl } from '@/Queries/card';
import { fetchAllocationData } from '@/Queries/allocation';

type CardSpendControlNavigationProps = NativeStackScreenProps<
  WalletStackParamTypes,
  WalletScreens.CardSpendControl
>;
type CardSpendControlRouteProp = CardSpendControlNavigationProps['route'];

type SpendControlState = {
  allocationId: string;
  limits: {
    currency: string;
    daily: Limit;
    monthly: Limit;
    instant: Limit;
  };
  categoryTypes: MerchantCategoryType[];
  paymentTypes: PaymentType[];
  disableForeign: boolean;
};

const SpendControlDefaultValues: SpendControlState = {
  allocationId: '',
  limits: {
    currency: 'USD',
    daily: { enabled: false, amount: 0 },
    monthly: { enabled: false, amount: 0 },
    instant: { enabled: false, amount: 0 },
  },
  categoryTypes: [],
  paymentTypes: [],
  disableForeign: false,
};

const CardSpendControl = () => {
  const nav = useNavigation();
  const scrollPositionYValue = useSharedValue(0);
  const { t } = useTranslation();

  const {
    params: { cardId },
  } = useRoute<CardSpendControlRouteProp>();

  const { data, isFetching } = useCard(cardId);

  const [loading, setLoading] = useState(true);
  const [currentSpendControl, setCurrentSpendControl] =
    useState<SpendControlState>(SpendControlDefaultValues);
  const [originalSpendControl, setOriginalSpendControl] = useState<SpendControlState>();
  const { mutateAsync: mutateSpendControl } = useSaveCardSpendControl(cardId);
  const [saving, setSaving] = useState(false);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(scrollPositionYValue.value, [0, 20], [0, 1]),
    }),
    [scrollPositionYValue.value],
  );

  const buildSpendControlState = ({
    allocationId,
    disabledMccGroups,
    disabledPaymentTypes,
    limits,
    disableForeign,
  }: {
    allocationId: string;
    disabledMccGroups: string[];
    disabledPaymentTypes: string[];
    limits: any[];
    disableForeign: boolean;
  }) => {
    const [firstLimit] = limits!;
    const {
      currency,
      typeMap: { PURCHASE },
    } = firstLimit;

    const daily = {
      enabled: PURCHASE?.DAILY !== undefined,
      amount: PURCHASE?.DAILY?.amount || 0,
    };

    const monthly = {
      enabled: PURCHASE?.MONTHLY !== undefined,
      amount: PURCHASE?.MONTHLY?.amount || 0,
    };

    const instant = {
      enabled: PURCHASE?.INSTANT !== undefined,
      amount: PURCHASE?.INSTANT?.amount || 0,
    };

    const categoryTypes = Object.keys(MerchantCategoryTypes).map((mt) => {
      const disabled = disabledMccGroups!.find((x) => x === mt);

      return {
        key: mt,
        enabled: !disabled,
      };
    });

    const paymentTypes = PaymentTypes.map((pt) => {
      const disabled = disabledPaymentTypes!.find((x) => x === pt.key);
      return {
        ...pt,
        enabled: !disabled,
      };
    });

    const controlState = {
      allocationId,
      categoryTypes,
      paymentTypes,
      limits: {
        currency,
        daily,
        monthly,
        instant,
      },
      disableForeign,
    };

    return controlState;
  };

  useEffect(() => {
    if (!isFetching && data) {
      // TODO support multiple allocations/spend controls on cards
      const {
        // @ts-expect-error
        disabledMccGroups,
        // @ts-expect-error
        disabledPaymentTypes,
        // @ts-expect-error
        limits,
        // @ts-expect-error
        disableForeign,
        card: { allocationId },
      } = data;

      const newState = buildSpendControlState({
        allocationId: allocationId!,
        disabledMccGroups: disabledMccGroups!,
        disabledPaymentTypes: disabledPaymentTypes!,
        limits: limits!,
        disableForeign: disableForeign!,
      });

      setCurrentSpendControl(newState);
      setOriginalSpendControl(cloneDeep(newState));

      setLoading(false);
    }
  }, [data, isFetching]);

  const {
    categoryTypes: currentCategoryTypes,
    limits: currentLimits,
    paymentTypes: currentPaymentTypes,
    disableForeign: currentDisableForeign,
  } = currentSpendControl;
  const formDirty =
    currentSpendControl &&
    originalSpendControl &&
    isEqual(currentSpendControl, originalSpendControl!) === false;

  const onLimitUpdated = (limitUpdated: any) => {
    const { limits } = currentSpendControl!;

    const newLimits = {
      ...limits,
      ...limitUpdated,
    };

    setCurrentSpendControl({
      ...currentSpendControl,
      limits: newLimits,
    });
  };

  const onCategoryUpdated = (categoryUpdated: any) => {
    const { categoryTypes } = currentSpendControl;
    const idx = categoryTypes.findIndex((x) => x.key === categoryUpdated.key);
    categoryTypes[idx] = {
      ...categoryTypes[idx],
      enabled: categoryUpdated.enabled,
    };

    setCurrentSpendControl({
      ...currentSpendControl,
      categoryTypes,
    });
  };
  const onPaymentUpdated = (paymentTypeUpdated: any) => {
    const { paymentTypes } = currentSpendControl;
    const idx = paymentTypes.findIndex((x) => x.key === paymentTypeUpdated.key);
    paymentTypes[idx] = {
      ...paymentTypes[idx],
      enabled: paymentTypeUpdated.enabled,
    };

    setCurrentSpendControl({
      ...currentSpendControl,
      paymentTypes,
    });
  };

  const onAllCategoriesToggle = (enabled: boolean) => {
    const { categoryTypes } = currentSpendControl;
    const categoryTypesUpdated = categoryTypes.map((x) => ({
      ...x,
      enabled,
    }));

    setCurrentSpendControl({
      ...currentSpendControl,
      categoryTypes: categoryTypesUpdated,
    });
  };

  const onAllPaymentTypesToggle = (enabled: boolean) => {
    const { paymentTypes } = currentSpendControl;
    const paymentTypesUpdated = paymentTypes.map((x) => ({
      ...x,
      enabled,
    }));

    setCurrentSpendControl({
      ...currentSpendControl,
      paymentTypes: paymentTypesUpdated,
    });
  };

  const onInternationalToggle = (disabled: boolean) => {
    setCurrentSpendControl({
      ...currentSpendControl,
      disableForeign: disabled,
    });
  };

  const onResetControlsPress = () => {
    const { allocationId: pAllocationId } = currentSpendControl;
    fetchAllocationData(pAllocationId).then((allocationData) => {
      const { disabledMccGroups, disabledPaymentTypes, limits, disableForeign } = allocationData;
      const newState = buildSpendControlState({
        allocationId: pAllocationId,
        disabledMccGroups: disabledMccGroups!,
        disabledPaymentTypes: disabledPaymentTypes!,
        limits: limits!,
        disableForeign: disableForeign!,
      });

      setCurrentSpendControl(newState);
    });
  };

  const onSavePress = () => {
    setSaving(true);
    const { limits, categoryTypes, paymentTypes, disableForeign } = currentSpendControl;

    const typeMap = {
      PURCHASE: {} as any,
    };

    if (limits.daily.enabled) {
      typeMap.PURCHASE.DAILY = { amount: limits.daily.amount };
    }
    if (limits.monthly.enabled) {
      typeMap.PURCHASE.MONTHLY = { amount: limits.monthly.amount };
    }
    if (limits.instant.enabled) {
      typeMap.PURCHASE.INSTANT = { amount: limits.instant.amount };
    }

    mutateSpendControl({
      disabledMccGroups: categoryTypes.filter((x) => !x.enabled).map((x) => x.key),
      disabledPaymentTypes: paymentTypes.filter((x) => !x.enabled).map((x) => x.key),
      limits: [
        {
          currency: currentLimits.currency,
          typeMap,
        },
      ],
      disableForeign,
    })
      .then(() => {
        Toast.show({ type: 'success', text1: t('cardSpendControl.success') });
        nav.goBack();
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: t('error.generic') });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1 pt-6 px-6 bg-white`} edges={['top']}>
        <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={tw`z-1`}>
          <View style={tw`flex-row items-center mb-2`}>
            <BackButtonNavigator />
            <CSText style={tw`pl-3`}>{t('cardSpendControl.title')}</CSText>
          </View>
        </View>
        <View style={tw`z-1`} pointerEvents="none">
          <Animated.View style={animatedStyle}>
            <VerticalGradient />
          </Animated.View>
        </View>

        {loading ? (
          <View style={tw`flex-1 items-center justify-center`}>
            <ActivityIndicator color={tw.color('black')} />
          </View>
        ) : null}

        {!loading ? (
          <View style={tw`flex-1`}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={(event) => {
                const {
                  nativeEvent: {
                    contentOffset: { y },
                  },
                } = event;

                scrollPositionYValue.value = y >= 0 ? y : 0;
              }}
              contentContainerStyle={[tw`pb-20 pt-6`]}
              style={{ marginTop: -80 }}
            >
              <SpendControl
                paymentTypes={currentPaymentTypes}
                categoryTypes={currentCategoryTypes}
                limits={currentLimits}
                disableForeign={currentDisableForeign}
                onLimitUpdated={onLimitUpdated}
                onCategoryUpdated={onCategoryUpdated}
                onPaymentTypeUpdated={onPaymentUpdated}
                onAllCategoriesToggle={onAllCategoriesToggle}
                onAllPaymentTypesToggle={onAllPaymentTypesToggle}
                onInternationalToggle={onInternationalToggle}
              />
              <View style={tw`mt-3`}>
                <CSText style={tw`my-2`}>{t('cardSpendControl.resetControlsHeadline')}</CSText>
                <TouchableOpacity style={tw`flex-1`} onPress={onResetControlsPress}>
                  <CSText style={tw`self-center text-error`}>
                    {t('cardSpendControl.resetControls')}
                  </CSText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        ) : null}
      </SafeAreaView>
      <View style={tw`absolute bottom-0 w-full`}>
        <VerticalGradient inverted />
      </View>

      {formDirty ? (
        <View
          style={tw.style(`w-full bg-white py-4 px-6`, {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
          })}
        >
          <SafeAreaView edges={['bottom']}>
            <Button onPress={onSavePress} small loading={saving}>
              {t('cardSpendControl.applyChanges')}
            </Button>
          </SafeAreaView>
        </View>
      ) : null}
    </View>
  );
};

export default CardSpendControl;
