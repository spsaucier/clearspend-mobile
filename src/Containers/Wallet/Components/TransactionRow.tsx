import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { ChevronIcon } from '@/Assets/Icons';
import { EyeIcon } from '@/Assets/Icons/eyeIcon';

type Props = {
  transactionId: string;
  merchant: string;
  amount: string;
  merchantImage?: string;
  category?: string;
  onPress: () => void;
};

export const TransactionRow = ({
  transactionId,
  merchant,
  amount,
  merchantImage,
  category,
  onPress,
}: Props) => {
  const navigation = useNavigation<any>(); // TODO Add type
  const handleOnPress = () => {
    if (onPress) {
      onPress();
    }
    navigation.navigate('Transaction Details');
  };
  return (
    <TouchableOpacity
      style={tw`flex-row justify-between px-6 py-3`}
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
        <Text style={tw`text-sm text-copy ml-3`}>{merchant}</Text>
      </View>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-sm text-black font-bold`}>{amount}</Text>
        <View style={tw`p-1 bg-gray90 rounded-lg ml-3`}>
          <ChevronIcon color={tw.color('gray50')} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
