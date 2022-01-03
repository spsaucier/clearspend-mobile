import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { formatCurrency, sentenceCase } from '@/Helpers/StringHelpers';
import { CSText } from '@/Components';
import { CategoryIcon } from '@/Components/CategoryIcon';
import { MainScreens } from '@/Navigators/NavigatorTypes';

export type Status = 'PENDING' | 'DECLINED' | 'APPROVED';

type Props = {
  cardId: string;
  transactionId: string;
  merchantName: string;
  amount: number;
  merchantLogoUrl?: string;
  merchantCategoryCode: number;
  status: Status;
  receiptId: string;
  time: string;
};

export const TransactionRow = ({
  cardId,
  transactionId,
  merchantName,
  amount,
  merchantLogoUrl,
  merchantCategoryCode,
  status,
  receiptId,
  time = '',
}: Props) => {
  const { navigate } = useNavigation();
  const handleItemOnPress = () => {
    navigate(MainScreens.TransactionDetails, { cardId, transactionId });
  };

  const handleAddReceiptOnPress = () => {
    navigate(MainScreens.AddReceipt, { accountActivityId: transactionId, cardId });
  };

  const { t } = useTranslation();
  const statusDeclined = status === 'DECLINED';
  const statusFormatted = sentenceCase(status);

  const formatTime = format(parseISO(time), 'hh:mm a');
  return (
    <TouchableOpacity
      style={tw`flex-row justify-between px-6 py-3`}
      key={transactionId}
      onPress={handleItemOnPress}
    >
      <View style={tw`flex-row`}>
        <View
          style={[tw`bg-primary h-8 w-8 rounded-full overflow-hidden items-center justify-center`]}
        >
          {merchantLogoUrl ? (
            <Image
              source={{
                uri: merchantLogoUrl,
              }}
              style={tw`w-full h-full rounded-full`}
              resizeMode="cover"
            />
          ) : (
            <CategoryIcon style={tw`w-5 h-5`} code={merchantCategoryCode} />
          )}
        </View>

        <View>
          <CSText style={tw`text-base text-black ml-3 mb-1`}>{merchantName}</CSText>
          <CSText style={tw`text-xs text-black ml-3`}>{formatTime}</CSText>
        </View>
      </View>

      <View style={tw`flex-row`}>
        <View>
          {!receiptId && (
            <TouchableOpacity
              style={tw`bg-black py-1 px-2 rounded-1`}
              onPress={handleAddReceiptOnPress}
            >
              <CSText style={tw`text-primary text-xs`}>
                {t('wallet.transactions.addReceipt')}
              </CSText>
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`w-20 items-end`}>
          <CSText style={tw.style('text-base text-black', statusDeclined && 'text-error')}>
            {formatCurrency(amount)}
          </CSText>
          <CSText style={tw`text-xs text-black ml-3`}>{statusFormatted}</CSText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
