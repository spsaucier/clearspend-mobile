import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import i18next from 'i18next';
import { CSText, ToggleSwitch } from '@/Components';
import { KeyboardIcon, PointOfSaleIcon, TrolleyIcon } from '@/Components/Icons';
import {
  MERCHANT_CATEGORY_ICON_NAME_MAP,
  UtilitiesIcon,
} from '@/Components/Icons/MerchantCategories';
import { MerchantCategoryIcon } from '@/Components/MerchantCategoryIcon';
import tw from '@/Styles/tailwind';

const LimitAmount = ({ maxValue, value }: { maxValue: number; value: number }) => {
  const { t } = useTranslation();
  const [currentValue] = useState<number>(value);

  return (
    <View style={tw`flex-row rounded bg-white w-full p-2 items-center`}>
      <View style={tw`flex-2`}>
        <CSText>{t('spendControl.amount')}</CSText>
        <CSText style={tw`text-gray-50 text-sm pt-1`}>{`Max value: $${maxValue.toFixed(
          2,
        )}`}</CSText>
      </View>
      <View style={tw`flex-1`}>
        <TextInput
          style={tw`rounded border-gray-10 border-1 pr-1`}
          textAlign="right"
          value={currentValue.toFixed(2)}
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
  maxAmount: number;
  categoryTypes: MerchantCategoryType[];
  paymentTypes: PaymentType[];
  limits: {
    daily: Limit;
    monthly: Limit;
    instant: Limit;
  };
};

const SpendControl = ({
  maxAmount,
  categoryTypes,
  paymentTypes,
  limits,
  onLimitUpdated,
  onCategoryUpdated,
  onPaymentTypeUpdated,
  onAllCategoriesToggle,
  onAllPaymentTypesToggle,
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
          <View style={tw``}>
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
                <LimitAmount maxValue={maxAmount} value={daily.amount} />
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
                <LimitAmount maxValue={maxAmount} value={monthly.amount} />
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
                <LimitAmount maxValue={maxAmount} value={instant.amount} />
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View style={tw`mt-3`}>
        <CSText style={tw`text-lg`}>{t('spendControl.categories')}</CSText>
        <View style={tw`mt-3 rounded bg-tan p-3`}>
          <View style={tw`flex-row w-full`}>
            <View style={tw`bg-white rounded items-center justify-center w-8 h-8`}>
              <UtilitiesIcon size={24} />
            </View>
            <View style={tw`flex-row flex-1 justify-between items-center p-2`}>
              <CSText>{t('spendControl.allCategories')}</CSText>
              <ToggleSwitch value={allCategoriesEnabled} toggleSwitch={onAllCategoriesToggle} />
            </View>
          </View>
        </View>

        <View style={tw`mt-1 rounded bg-tan p-3`}>
          {categoryTypes.map((category) => (
            <View key={category.key} style={tw`rounded flex-row my-2 items-center`}>
              <View style={tw`bg-white rounded`}>
                <MerchantCategoryIcon merchantCategoryGroup={category.key} />
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
      <View style={tw`mt-3`}>
        <CSText style={tw`text-lg`}>{t('spendControl.paymentTypes')}</CSText>
        <View style={tw`mt-3 rounded bg-tan p-3`}>
          <View style={tw`flex-row w-full py-2`}>
            <View style={tw`bg-white rounded items-center justify-center w-8 h-8`}>
              <UtilitiesIcon size={24} />
            </View>
            <View style={tw`flex-row flex-1 justify-between items-center p-2`}>
              <CSText>{t('spendControl.allPaymentTypes')}</CSText>
              <ToggleSwitch value={allPaymentsEnabled} toggleSwitch={onAllPaymentTypesToggle} />
            </View>
          </View>
        </View>
        <View style={tw`mt-1 rounded bg-tan p-3`}>
          {paymentTypes.map((pt) => {
            const { key, icon: PaymentTypeIcon, enabled, name } = pt;

            return (
              <View style={tw`flex-row w-full py-2`} key={key}>
                <View style={tw`bg-white rounded items-center justify-center w-8 h-8`}>
                  <PaymentTypeIcon />
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
      </View>
    </View>
  );
};

export default SpendControl;
