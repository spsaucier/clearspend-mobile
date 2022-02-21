import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  AssetsIcon,
  CarRentalIcon,
  EntertainmentIcon,
  FlightsIcon,
  FuelIcon,
  InsuranceIcon,
  InterestIcon,
  LodgingIcon,
  MaintenanceIcon,
  MarketingIcon,
  MealsIcon,
  MeetingsIcon,
  OtherMiscIcon,
  RentIcon,
  ServicesIcon,
  ShippingIcon,
  SoftwareIcon,
  SubscriptionsIcon,
  SuppliesIcon,
  TaxesIcon,
  TrainingIcon,
  TransportationIcon,
  UtilitiesIcon,
} from '@/Components/Icons/Categories';
import { IconBaseProps } from '@/Components/Icons/types';

const EXPENSE_CATEGORY_ICON_MAP: {
  [iconRef: number]: (props: {
    color?: string;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    size?: string | number;
  }) => JSX.Element;
} = {
  1: AssetsIcon,
  2: CarRentalIcon,
  3: EntertainmentIcon,
  4: FlightsIcon,
  5: MealsIcon,
  6: FuelIcon,
  7: InsuranceIcon,
  8: InterestIcon,
  9: LodgingIcon,
  10: MaintenanceIcon,
  11: MarketingIcon,
  12: MeetingsIcon,
  13: RentIcon,
  14: ShippingIcon,
  15: ServicesIcon,
  16: SoftwareIcon,
  17: SubscriptionsIcon,
  18: SuppliesIcon,
  19: UtilitiesIcon,
  20: TaxesIcon,
  21: TrainingIcon,
  22: TransportationIcon,
  23: OtherMiscIcon,
};

const DEFAULT_OTHER_ICON = 23;

type Props = {
  iconRef?: number;
} & IconBaseProps;

export const ExpenseCategoryIcon = ({
  iconRef = DEFAULT_OTHER_ICON,
  size = 24,
  color,
  style,
  testID,
}: Props) => {
  const Icon = EXPENSE_CATEGORY_ICON_MAP[iconRef];

  if (!Icon) {
    return <OtherMiscIcon size={size} color={color} style={style} testID={testID} />;
  }

  return <Icon size={size} color={color} style={style} testID={testID} />;
};
