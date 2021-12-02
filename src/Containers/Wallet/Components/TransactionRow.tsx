import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { ReceiptIcon } from '@/Components/Icons';
import { sentenceCase } from '@/Helpers/StringHelpers';

export type Status = 'PENDING' | 'DECLINED' | 'APPROVED';

type Props = {
  cardId: string;
  transactionId: string;
  merchantName: string;
  amount: number;
  merchantIconUrl?: string;
  // category?: string;
  status: Status;
  isReceiptLinked: boolean;
  time: string;
};

export const TransactionRow = ({
  cardId,
  transactionId,
  merchantName,
  amount,
  merchantIconUrl,
  // category,
  status,
  isReceiptLinked = false,
  time = '',
}: Props) => {
  const navigation = useNavigation<any>(); // TODO Add type
  const handleOnPress = () => {
    navigation.navigate('Transaction Details', { cardId, transactionId });
  };
  const { t } = useTranslation();
  const statusDeclined = status === 'DECLINED';
  const statusFormatted = sentenceCase(status);

  const formatTime = format(parseISO(time), 'hh:mm a');
  return (
    <TouchableOpacity
      style={tw`flex-row justify-between px-6 py-3`}
      key={transactionId}
      onPress={handleOnPress}
    >
      <View style={tw`flex-row`}>
        <View
          style={[
            tw`bg-primary-new h-8 w-8 rounded-full overflow-hidden items-center justify-center`,
          ]}
        >
          {merchantIconUrl ? (
            <Image
              source={{
                uri: merchantIconUrl,
              }}
              style={tw`w-full h-full rounded-full`}
              resizeMode="cover"
            />
          ) : (
            // TODO Add Category Icons
            <ReceiptIcon color={tw.color('black')} size={16} />
          )}
        </View>

        <View>
          <Text style={tw`text-base text-black ml-3 mb-1`}>{merchantName}</Text>
          <Text style={tw`text-xs text-black ml-3`}>{formatTime}</Text>
        </View>
      </View>

      <View style={tw`flex-row`}>
        <View>
          {!isReceiptLinked && (
            <TouchableOpacity style={tw`bg-black py-1 px-2 rounded-1`} onPress={() => {}}>
              <Text style={tw`text-primary-new text-xs`}>
                {t('wallet.transactions.addReceipt')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`w-20 items-end`}>
          <Text style={tw.style('text-base text-black', statusDeclined && 'text-error')}>
            {`$${amount.toFixed(2)}`}
          </Text>
          <Text style={tw`text-xs text-black ml-3`}>{statusFormatted}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
