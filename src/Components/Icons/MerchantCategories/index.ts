import { StyleProp, ViewStyle } from 'react-native';
import i18next from '@/Translations';

import { ChildCareIcon } from './childCareIcon';
import { DigitalGoodsIcon } from './digitalGoodsIcon';
import { EducationIcon } from './educationIcon';
import { EntertainmentIcon } from './entertainmentIcon';
import { FoodAndBeverageIcon } from './foodAndBeverageIcon';
import { GamblingIcon } from './gamblingIcon';
import { GovernmentIcon } from './governmentIcon';
import { HealthIcon } from './healthIcon';
import { MembershipsIcon } from './membershipsIcon';
import { MoneyTransferIcon } from './moneyTransferIcon';
import { OtherMiscIcon } from './otherMiscIcon';
import { ServicesIcon } from './servicesIcon';
import { ShoppingIcon } from './shoppingIcon';
import { TravelIcon } from './travelIcon';
import { UtilitiesIcon } from './utilitiesIcon';

export const MERCHANT_CATEGORY_ICON_NAME_MAP: {
  [groupCode: string]: {
    name: string;
    icon: (props: {
      color?: string;
      style?: StyleProp<ViewStyle>;
      testID?: string;
      size?: string | number;
    }) => JSX.Element;
  };
} = {
  CHILD_CARE: {
    name: i18next.t('categories.merchant.childCare'),
    icon: ChildCareIcon,
  },
  DIGITAL_GOODS: {
    name: i18next.t('categories.merchant.digitalGoods'),
    icon: DigitalGoodsIcon,
  },
  EDUCATION: {
    name: i18next.t('categories.merchant.education'),
    icon: EducationIcon,
  },
  ENTERTAINMENT: {
    name: i18next.t('categories.merchant.entertainment'),
    icon: EntertainmentIcon,
  },
  FOOD_BEVERAGE: {
    name: i18next.t('categories.merchant.foodAndBeverage'),
    icon: FoodAndBeverageIcon,
  },
  GAMBLING: {
    name: i18next.t('categories.merchant.gambling'),
    icon: GamblingIcon,
  },
  GOVERNMENT: {
    name: i18next.t('categories.merchant.government'),
    icon: GovernmentIcon,
  },
  HEALTH: {
    name: i18next.t('categories.merchant.health'),
    icon: HealthIcon,
  },
  MEMBERSHIPS: {
    name: i18next.t('categories.merchant.memberships'),
    icon: MembershipsIcon,
  },
  MONEY_TRANSFER: {
    name: i18next.t('categories.merchant.moneyTransfer'),
    icon: MoneyTransferIcon,
  },
  SERVICES: {
    name: i18next.t('categories.merchant.services'),
    icon: ServicesIcon,
  },
  SHOPPING: {
    name: i18next.t('categories.merchant.shopping'),
    icon: ShoppingIcon,
  },
  TRAVEL: {
    name: i18next.t('categories.merchant.travel'),
    icon: TravelIcon,
  },
  UTILITIES: {
    name: i18next.t('categories.merchant.utilities'),
    icon: UtilitiesIcon,
  },
  OTHER: {
    name: i18next.t('categories.merchant.other'),
    icon: OtherMiscIcon,
  },
};

export {
  ChildCareIcon,
  DigitalGoodsIcon,
  EducationIcon,
  EntertainmentIcon,
  FoodAndBeverageIcon,
  GamblingIcon,
  GovernmentIcon,
  HealthIcon,
  MembershipsIcon,
  MoneyTransferIcon,
  OtherMiscIcon,
  ServicesIcon,
  ShoppingIcon,
  TravelIcon,
  UtilitiesIcon,
};
