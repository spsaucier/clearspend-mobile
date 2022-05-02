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
import { MainScreens, MainStackParamTypes } from '@/Navigators/NavigatorTypes';
import { CheckMarkIcon } from '@/Components/Icons';
import { useSaveCardSpendControl } from '@/Queries/card';

type CardSpendControlNavigationProps = NativeStackScreenProps<
  MainStackParamTypes,
  MainScreens.CardSpendControl
>;
type CardSpendControlRouteProp = CardSpendControlNavigationProps['route'];

type SpendControlState = {
  maxAmount: number;
  categoryTypes: MerchantCategoryType[];
  paymentTypes: PaymentType[];
  limits: {
    daily: Limit;
    monthly: Limit;
    instant: Limit;
  };
};

const SpendControlDefaultValues: SpendControlState = {
  categoryTypes: [],
  limits: {
    daily: { enabled: false, amount: 0 },
    monthly: { enabled: false, amount: 0 },
    instant: { enabled: false, amount: 0 },
  },
  maxAmount: 0,
  paymentTypes: [],
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

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(scrollPositionYValue.value, [0, 20], [0, 1]),
    }),
    [scrollPositionYValue.value],
  );

  useEffect(() => {
    if (!isFetching && data) {
      const { availableBalance, disabledMccGroups, disabledPaymentTypes, limits } = data;
      const [firstLimit] = limits!;
      const {
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
        maxAmount: availableBalance.amount!,
        categoryTypes,
        paymentTypes,
        limits: {
          daily,
          monthly,
          instant,
        },
      };

      setCurrentSpendControl(controlState);
      setOriginalSpendControl(cloneDeep(controlState));
      setLoading(false);
    }
  }, [data, isFetching]);

  const { maxAmount, categoryTypes, limits, paymentTypes } = currentSpendControl;
  const formDirty =
    currentSpendControl &&
    originalSpendControl &&
    isEqual(currentSpendControl, originalSpendControl!) === false;

  const onLimitUpdated = (limitUpdated: any) => {
    const { limits: currentLimits } = currentSpendControl!;

    const newLimits = {
      ...currentLimits,
      ...limitUpdated,
    };

    setCurrentSpendControl({
      ...currentSpendControl,
      limits: newLimits,
    });
  };

  const onCategoryUpdated = (categoryUpdated: any) => {
    const { categoryTypes: currentCategoryTypes } = currentSpendControl;
    const idx = currentCategoryTypes.findIndex((x) => x.key === categoryUpdated.key);
    currentCategoryTypes[idx] = {
      ...currentCategoryTypes[idx],
      enabled: categoryUpdated.enabled,
    };

    setCurrentSpendControl({
      ...currentSpendControl,
      categoryTypes: currentCategoryTypes,
    });
  };
  const onPaymentUpdated = (paymentTypeUpdated: any) => {
    const { paymentTypes: currentPaymentTypes } = currentSpendControl;
    const idx = currentPaymentTypes.findIndex((x) => x.key === paymentTypeUpdated.key);
    currentPaymentTypes[idx] = {
      ...currentPaymentTypes[idx],
      enabled: paymentTypeUpdated.enabled,
    };

    setCurrentSpendControl({
      ...currentSpendControl,
      paymentTypes: currentPaymentTypes,
    });
  };

  const onAllCategoriesToggle = (enabled: boolean) => {
    const { categoryTypes: currentCategoryTypes } = currentSpendControl;
    const categoryTypesUpdated = currentCategoryTypes.map((x) => ({
      ...x,
      enabled,
    }));

    setCurrentSpendControl({
      ...currentSpendControl,
      categoryTypes: categoryTypesUpdated,
    });
  };

  const onAllPaymentTypesToggle = (enabled: boolean) => {
    const { paymentTypes: currentPaymentTypes } = currentSpendControl;
    const paymentTypesUpdated = currentPaymentTypes.map((x) => ({
      ...x,
      enabled,
    }));

    setCurrentSpendControl({
      ...currentSpendControl,
      paymentTypes: paymentTypesUpdated,
    });
  };

  const onResetControlsPress = () => {
    setCurrentSpendControl(cloneDeep(originalSpendControl!));
  };

  const onSavePress = () => {
    const {
      limits: currentLimits,
      categoryTypes: currentCategoryTypes,
      paymentTypes: currentPaymentTypes,
    } = currentSpendControl;

    const typeMap = {
      PURCHASE: {} as any,
    };

    if (currentLimits.daily.enabled) {
      typeMap.PURCHASE.DAILY = { amount: currentLimits.daily.amount };
    }
    if (currentLimits.monthly.enabled) {
      typeMap.PURCHASE.MONTHLY = { amount: currentLimits.monthly.amount };
    }
    if (currentLimits.instant.enabled) {
      typeMap.PURCHASE.INSTANT = { amount: currentLimits.instant.amount };
    }

    mutateSpendControl({
      disabledMccGroups: currentCategoryTypes.filter((x) => !x.enabled).map((x) => x.key),
      disabledPaymentTypes: currentPaymentTypes.filter((x) => !x.enabled).map((x) => x.key),
      limits: [
        {
          currency: 'USD',
          typeMap,
        },
      ],
    })
      .then(() => {
        Toast.show({ type: 'success', text1: t('cardSpendControl.success') });
        nav.goBack();
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: t('error.generic') });
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

            {formDirty ? (
              <View style={tw`flex-1`}>
                <TouchableOpacity
                  onPress={onSavePress}
                  style={tw`flex-row items-center justify-center self-end px-2 py-1 bg-primary`}
                >
                  <CSText style={tw`ml-2 my-1 text-2xs text-black pr-1`}>
                    {t('cardSpendControl.save').toUpperCase()}
                  </CSText>
                  <CheckMarkIcon color="black" size={12} />
                </TouchableOpacity>
              </View>
            ) : null}
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
                maxAmount={maxAmount}
                paymentTypes={paymentTypes}
                categoryTypes={categoryTypes}
                limits={limits}
                onLimitUpdated={onLimitUpdated}
                onCategoryUpdated={onCategoryUpdated}
                onPaymentTypeUpdated={onPaymentUpdated}
                onAllCategoriesToggle={onAllCategoriesToggle}
                onAllPaymentTypesToggle={onAllPaymentTypesToggle}
              />
              <View style={tw`mt-3`}>
                <CSText style={tw`my-2`}>{t('cardSpendControl.resetControlsHeadline')}</CSText>
                <Button onPress={onResetControlsPress}>
                  {t('cardSpendControl.resetControls')}
                </Button>
              </View>
            </ScrollView>
          </View>
        ) : null}
      </SafeAreaView>
      <View style={tw`absolute bottom-0 w-full`}>
        <VerticalGradient inverted />
      </View>
    </View>
  );
};

export default CardSpendControl;
