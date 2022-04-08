import { View } from 'react-native';
import React from 'react';

import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { CSText, LinearProgressBar } from '@/Components';
import { formatCurrency } from '@/Helpers/StringHelpers';

type Props = {
  label: string;
  limit: number;
  amountUsed: number;
};

export const LimitSection = ({ label, limit = 1, amountUsed = 1 }: Props) => {
  const { t } = useTranslation();
  // const remaining = Math.abs(limit - amountUsed);
  return (
    <View style={tw`mb-5`}>
      <View style={tw`flex-row justify-between mt-2`}>
        <CSText style={tw`text-xs text-white uppercase tracking-widest`}>{label}</CSText>
        <CSText style={tw`text-sm text-white`}>
          {t('cardProfile.limit', { amount: `${formatCurrency(limit)}` })}
        </CSText>
      </View>
      <LinearProgressBar progressValue={amountUsed} maxValue={limit} />
      { /* <View style={tw`flex-row justify-between items-start mt-1`}>
        <CSText style={tw`text-sm mt-1 text-white`}>{formatCurrency(amountUsed)}</CSText>
        <CSText style={tw`text-sm text-white mt-1`}>
          {t('cardProfile.remaining', { amount: `${formatCurrency(remaining)}` })}
        </CSText>
      </View> */}
    </View>
  );
};
