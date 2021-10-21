import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { ChevronIcon, NoReceiptIcon, ReceiptIcon } from '@/Components/Icons';
import { EyeIcon } from '@/Components/Icons/eyeIcon';
import { sentenceCase } from '@/Helpers/StringHelpers';

export type Status = 'PENDING' | 'DECLINED' | 'APPROVED';

type Props = {
  cardId: string;
  transactionId: string;
  merchantName: string;
  amount: string;
  merchantImage?: string;
  category?: string;
  onPress: () => void;
  status: Status;
  isReceiptLinked: boolean;
  time: string;
};

export const TransactionRow = ({
  cardId,
  transactionId,
  merchantName,
  amount,
  merchantImage,
  category,
  status,
  isReceiptLinked = false,
  time = '',
  onPress,
}: Props) => {
  const navigation = useNavigation<any>(); // TODO Add type
  const handleOnPress = () => {
    if (onPress) {
      onPress();
    }
    navigation.navigate('Transaction Details', { transactionId, cardId });
  };
  const statusPending = status === 'PENDING';
  const statusDeclined = status === 'DECLINED';
  return (
    <TouchableOpacity
      style={tw`flex-row justify-between pl-6 pr-3 py-2`}
      key={transactionId}
      onPress={handleOnPress}
    >
      <View style={tw`flex-row items-center`}>
        {merchantImage || category ? (
          <View style={tw`p-1 bg-secondary rounded-lg h-10 w-10`} />
        ) : (
          <View style={tw`p-1 bg-secondary rounded-lg h-10 w-10 items-center justify-center`}>
            <EyeIcon color={tw.color('white')} />
          </View>
        )}
        <View>
          <Text style={tw`text-sm text-copyDark ml-3 font-semibold`}>{merchantName}</Text>
          <Text style={tw`text-xs text-gray50 ml-3`}>{time}</Text>
        </View>
      </View>
      <View style={tw`flex-row items-center`}>
        <View style={tw`items-end`}>
          <Text
            style={tw.style(
              'text-sm text-black font-bold',
              (statusPending || statusDeclined) && 'text-gray60',
              statusDeclined && 'line-through',
            )}
          >
            -$
            {amount}
          </Text>
          <Text style={tw`text-xs text-gray40 ml-3`}>{sentenceCase(status)}</Text>
        </View>

        <View
          style={tw.style(
            'h-9 w-9 items-center justify-center rounded-lg ml-3 mr-2 border border-gray95',
            isReceiptLinked ? 'bg-white' : 'bg-gray95',
          )}
        >
          {isReceiptLinked ? (
            <ReceiptIcon color={tw.color('secondary')} size={28} />
          ) : (
            <NoReceiptIcon color={tw.color('gray70')} size={26} />
          )}
        </View>
        <ChevronIcon color={tw.color('gray70')} />
      </View>
    </TouchableOpacity>
  );
};
