import React from 'react';
import {
  MERCHANT_CATEGORY_ICON_NAME_MAP,
  OtherMiscIcon,
} from '@/Components/Icons/MerchantCategories';
import { IconBaseProps } from '@/Components/Icons/types';

type Props = {
  merchantCategoryGroup?: string;
} & IconBaseProps;

export const MerchantCategoryIcon = ({ merchantCategoryGroup = 'OTHER', ...iconProps }: Props) => {
  const Icon = MERCHANT_CATEGORY_ICON_NAME_MAP[merchantCategoryGroup]?.icon;

  if (!Icon) {
    return <OtherMiscIcon {...iconProps} />;
  }

  return <Icon {...iconProps} />;
};
