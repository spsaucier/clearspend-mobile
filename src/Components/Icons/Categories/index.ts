import { StyleProp, ViewStyle } from 'react-native';
import i18next from '@/Translations';

import { AssetsIcon } from './assetsIcon';
import { CarRentalIcon } from './carRentalIcon';
import { ChildCareIcon } from './childCareIcon';
import { DigitalGoodsIcon } from './digitalGoodsIcon';
import { EducationIcon } from './educationIcon';
import { EntertainmentIcon } from './entertainmentIcon';
import { FlightsIcon } from './flightsIcon';
import { FoodAndBeverageIcon } from './foodAndBeverageIcon';
import { FuelIcon } from './fuelIcon';
import { GamblingIcon } from './gamblingIcon';
import { GovernmentIcon } from './governmentIcon';
import { HealthIcon } from './healthIcon';
import { InsuranceIcon } from './insuranceIcon';
import { InterestIcon } from './interestIcon';
import { LodgingIcon } from './lodgingIcon';
import { MaintenanceIcon } from './maintenanceIcon';
import { MarketingIcon } from './marketingIcon';
import { MealsIcon } from './mealsIcon';
import { MeetingsIcon } from './meetingsIcon';
import { MembershipsIcon } from './membershipsIcon';
import { MoneyTransferIcon } from './moneyTransferIcon';
import { OtherMiscIcon } from './otherMiscIcon';
import { RentIcon } from './rentIcon';
import { ServicesIcon } from './servicesIcon';
import { ShippingIcon } from './shippingIcon';
import { ShoppingIcon } from './shoppingIcon';
import { SoftwareIcon } from './softwareIcon';
import { SubscriptionsIcon } from './subscriptionsIcon';
import { SuppliesIcon } from './suppliesIcon';
import { TaxesIcon } from './taxesIcon';
import { TrainingIcon } from './trainingIcon';
import { TransportationIcon } from './transportationIcon';
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

// exports
// TODO export all of these in an object where they can be referenced by id/code
export {
  AssetsIcon,
  CarRentalIcon,
  ChildCareIcon,
  DigitalGoodsIcon,
  EducationIcon,
  EntertainmentIcon,
  FlightsIcon,
  FoodAndBeverageIcon,
  FuelIcon,
  GamblingIcon,
  GovernmentIcon,
  HealthIcon,
  InsuranceIcon,
  InterestIcon,
  LodgingIcon,
  MaintenanceIcon,
  MarketingIcon,
  MealsIcon,
  MeetingsIcon,
  MembershipsIcon,
  MoneyTransferIcon,
  OtherMiscIcon,
  RentIcon,
  ServicesIcon,
  ShippingIcon,
  ShoppingIcon,
  SoftwareIcon,
  SubscriptionsIcon,
  SuppliesIcon,
  TaxesIcon,
  TrainingIcon,
  TransportationIcon,
  TravelIcon,
  UtilitiesIcon,
};
