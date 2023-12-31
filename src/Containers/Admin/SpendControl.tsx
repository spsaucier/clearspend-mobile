import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import i18next from 'i18next';
import CurrencyInput from 'react-native-currency-input';
import { CSText, ToggleSwitch } from '@/Components';
import { GlobeStandIcon, KeyboardIcon, PointOfSaleIcon, TrolleyIcon } from '@/Components/Icons';
import {
  MERCHANT_CATEGORY_ICON_NAME_MAP,
  UtilitiesIcon,
} from '@/Components/Icons/MerchantCategories';
import { MerchantCategoryIcon } from '@/Components/MerchantCategoryIcon';
import tw from '@/Styles/tailwind';

type LimitAmountProps = {
  value: number;
  onChangeValue: (value: number) => void;
  testID?: string;
};

const LimitAmount = ({ value = 0, onChangeValue, testID }: LimitAmountProps) => {
  const { t } = useTranslation();

  return (
    <View style={tw`flex-row rounded-sm bg-white w-full p-2 py-3 items-center`}>
      <View style={tw`flex-1`}>
        <CSText>{t('spendControl.amount')}</CSText>
      </View>
      <View style={tw`flex-1`}>
        <CurrencyInput
          testID={testID}
          prefix="$"
          delimiter=","
          separator="."
          style={tw`rounded-sm border-gray-10 border-1 pr-1 text-base`}
          textAlign="right"
          onChangeValue={onChangeValue}
          value={value}
        />
      </View>
    </View>
  );
};

export type Limit = {
  enabled: boolean;
  amount: number;
};

export type MerchantCategoryType = {
  key: string;
  enabled: boolean;
};

export type PaymentType = {
  key: string;
  icon: any;
  name: string;
  enabled: boolean;
};

export enum MerchantCategoryTypes {
  CHILD_CARE = 'CHILD_CARE',
  DIGITAL_GOODS = 'DIGITAL_GOODS',
  EDUCATION = 'EDUCATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  FOOD_BEVERAGE = 'FOOD_BEVERAGE',
  GAMBLING = 'GAMBLING',
  GOVERNMENT = 'GOVERNMENT',
  HEALTH = 'HEALTH',
  MEMBERSHIPS = 'MEMBERSHIPS',
  MONEY_TRANSFER = 'MONEY_TRANSFER',
  SERVICES = 'SERVICES',
  SHOPPING = 'SHOPPING',
  TRAVEL = 'TRAVEL',
  UTILITIES = 'UTILITIES',
  OTHER = 'OTHER',
}

export const PaymentTypes = [
  {
    key: 'POS',
    icon: PointOfSaleIcon,
    name: i18next.t('paymentTypes.pointOfSales'),
  },
  {
    key: 'MANUAL_ENTRY',
    icon: KeyboardIcon,
    name: i18next.t('paymentTypes.manualEntry'),
  },
  {
    key: 'ONLINE',
    icon: TrolleyIcon,
    name: i18next.t('paymentTypes.online'),
  },
];

type SpendControlProps = {
  onLimitUpdated: (newLimit: any) => void;
  onCategoryUpdated: (categoriesUpdated: { key: string; enabled: boolean }) => void;
  onPaymentTypeUpdated: (paymentTypes: { key: string; enabled: boolean }) => void;
  onAllCategoriesToggle: (enabled: boolean) => void;
  onAllPaymentTypesToggle: (enabled: boolean) => void;
  onInternationalToggle: (disabled: boolean) => void;
  categoryTypes: MerchantCategoryType[];
  paymentTypes: PaymentType[];
  limits: {
    daily: Limit;
    monthly: Limit;
    instant: Limit;
  };
  disableForeign: boolean;
};

const SpendControl = ({
  categoryTypes,
  paymentTypes,
  limits,
  disableForeign,
  onLimitUpdated,
  onCategoryUpdated,
  onPaymentTypeUpdated,
  onAllCategoriesToggle,
  onAllPaymentTypesToggle,
  onInternationalToggle,
}: SpendControlProps) => {
  const { t } = useTranslation();
  const { daily, monthly, instant } = limits;

  const allCategoriesEnabled = categoryTypes.every((x) => x.enabled);
  const allPaymentsEnabled = paymentTypes.every((x) => x.enabled);

  return (
    <View>
      <View style={tw`mt-3`}>
        <CSText style={tw`text-lg`}>{t('spendControl.purchasing')}</CSText>
        <View style={tw`mt-2 rounded bg-tan p-3`}>
          <View>
            <View style={tw`flex-row justify-between items-center p-2`}>
              <CSText>{t('spendControl.dailyLimit')}</CSText>
              <ToggleSwitch
                value={daily.enabled}
                toggleSwitch={(newValue) => {
                  onLimitUpdated({ daily: { amount: 0, enabled: newValue } });
                }}
              />
            </View>
            {daily.enabled ? (
              <View style={tw`p-2`}>
                <LimitAmount
                  value={daily.amount}
                  onChangeValue={(newValue) => {
                    onLimitUpdated({ daily: { amount: newValue, enabled: true } });
                  }}
                  testID="dailyLimitAmount"
                />
              </View>
            ) : null}
          </View>

          <View style={tw`w-full`}>
            <View style={tw`flex-row justify-between items-center p-2`}>
              <CSText>{t('spendControl.monthyLimit')}</CSText>
              <ToggleSwitch
                value={monthly.enabled}
                toggleSwitch={(newValue) => {
                  onLimitUpdated({ monthly: { amount: 0, enabled: newValue } });
                }}
              />
            </View>
            {monthly.enabled ? (
              <View style={tw`p-2`}>
                <LimitAmount
                  value={monthly.amount}
                  onChangeValue={(newValue) => {
                    onLimitUpdated({ monthly: { amount: newValue, enabled: true } });
                  }}
                  testID="monthlyLimitAmount"
                />
              </View>
            ) : null}
          </View>
          <View style={tw`w-full`}>
            <View style={tw`flex-row w-full justify-between items-center p-2`}>
              <CSText>{t('spendControl.transactionLimit')}</CSText>
              <ToggleSwitch
                value={instant.enabled}
                toggleSwitch={(newValue) => {
                  onLimitUpdated({ instant: { amount: 0, enabled: newValue } });
                }}
              />
            </View>
            {instant.enabled ? (
              <View style={tw`p-2`}>
                <LimitAmount
                  value={instant.amount}
                  onChangeValue={(newValue) => {
                    onLimitUpdated({ instant: { amount: newValue, enabled: true } });
                  }}
                  testID="instantLimitAmount"
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View style={tw`mt-6`}>
        <CSText style={tw`text-lg`}>{t('spendControl.categories')}</CSText>
        <View style={tw`mt-3 rounded-t bg-tan p-3`}>
          <View style={tw`flex-row w-full`}>
            <View style={tw`bg-white rounded items-center justify-center w-8 h-8`}>
              <UtilitiesIcon size={22} />
            </View>
            <View style={tw`flex-row flex-1 justify-between items-center p-2`}>
              <CSText>{t('spendControl.allCategories')}</CSText>
              <ToggleSwitch value={allCategoriesEnabled} toggleSwitch={onAllCategoriesToggle} />
            </View>
          </View>
        </View>
        <View style={tw`rounded-b bg-tan px-3 py-2 border-t-1 border-gray-10`}>
          {categoryTypes.map((category) => (
            <View key={category.key} style={tw`rounded flex-row my-2 items-center`}>
              <View style={tw`bg-white rounded w-8 h-8 items-center justify-center`}>
                <MerchantCategoryIcon merchantCategoryGroup={category.key} size={23} />
              </View>
              <View style={tw`flex-1 mx-2 flex-row justify-between`}>
                <CSText>{MERCHANT_CATEGORY_ICON_NAME_MAP[category.key].name}</CSText>
                <ToggleSwitch
                  value={category.enabled}
                  toggleSwitch={(toggleValue) => {
                    onCategoryUpdated({
                      enabled: toggleValue,
                      key: category.key,
                    });
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={tw`mt-6`}>
        <CSText style={tw`text-lg`}>{t('spendControl.paymentTypes')}</CSText>
        <View style={tw`mt-3 rounded-t bg-tan p-3`}>
          <View style={tw`flex-row w-full`}>
            <View style={tw`bg-white rounded items-center justify-center w-8 h-8`}>
              <UtilitiesIcon size={22} />
            </View>
            <View style={tw`flex-row flex-1 justify-between items-center p-2`}>
              <CSText>{t('spendControl.allPaymentTypes')}</CSText>
              <ToggleSwitch value={allPaymentsEnabled} toggleSwitch={onAllPaymentTypesToggle} />
            </View>
          </View>
        </View>
        <View style={tw`rounded-b bg-tan px-3 py-2 border-t-1 border-gray-10`}>
          {paymentTypes.map((pt) => {
            const { key, icon: PaymentTypeIcon, enabled, name } = pt;

            return (
              <View style={tw`flex-row w-full py-2`} key={key}>
                <View style={tw`bg-white rounded items-center justify-center w-8 h-8`}>
                  <PaymentTypeIcon size={22} />
                </View>
                <View style={tw`flex-row flex-1 justify-between items-center p-2`}>
                  <CSText>{name}</CSText>
                  <ToggleSwitch
                    value={enabled}
                    toggleSwitch={(toggleValue) => {
                      onPaymentTypeUpdated({ enabled: toggleValue, key });
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View style={tw`mt-1 rounded bg-tan p-3`}>
          <View style={tw`flex-row w-full`}>
            <View style={tw`bg-white rounded items-center justify-center w-8 h-8`}>
              <GlobeStandIcon size={22} />
            </View>
            <View style={tw`flex-row flex-1 justify-between items-center p-2`}>
              <CSText>{t('spendControl.international')}</CSText>
              <ToggleSwitch
                value={!disableForeign}
                toggleSwitch={(toggleValue) => {
                  onInternationalToggle(!toggleValue);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SpendControl;
