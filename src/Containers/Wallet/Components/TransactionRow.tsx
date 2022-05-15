import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import tw from '@/Styles/tailwind';
import { formatCurrency, sentenceCase } from '@/Helpers/StringHelpers';
import { AnimatedView, CSText } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { MerchantCategoryIcon } from '@/Components/MerchantCategoryIcon';
import { CategoryIcon, ReceiptIcon } from '@/Components/Icons';

export type Status = 'PENDING' | 'DECLINED' | 'APPROVED';

type Props = {
  cardId: string;
  transactionId: string;
  merchantName: string;
  amount: number;
  merchantLogoUrl?: string;
  merchantCategoryGroup: string;
  status: Status;
  receiptIds: string[];
  time: string;
  animatedIndex?: any;
  animatedPosition?: any;
  expenseDetails?: any;
};

export const TransactionRow = ({
  cardId,
  transactionId,
  merchantName,
  amount,
  merchantLogoUrl,
  merchantCategoryGroup,
  status,
  receiptIds,
  time = '',
  animatedIndex,
  animatedPosition,
  expenseDetails,
}: Props) => {
  const { navigate } = useNavigation();
  const handleItemOnPress = () => {
    navigate(MainScreens.TransactionDetails, { cardId, transactionId });
  };

  const statusDeclined = status === 'DECLINED';
  const statusFormatted = sentenceCase(status);

  const formatTime = format(parseISO(time), 'hh:mm a');

  // ANIMATIONS
  const derivedAnimatedIndex = useDerivedValue(() => animatedIndex.value, [animatedPosition.value]);

  const infoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(derivedAnimatedIndex.value, [0, 1], [0, 1]),
    height: interpolate(derivedAnimatedIndex.value, [0, 1], [0, 15]), // 15 = text-xs + leading-tight
  }));

  const hasReceipts = receiptIds && receiptIds.length > 0;
  const hasExpenseCategory = !!expenseDetails;

  return (
    <TouchableOpacity style={tw`px-6 py-2`} key={transactionId} onPress={handleItemOnPress}>
      <View style={tw`flex-row items-center`}>
        <View
          style={[
            tw`h-6 w-6 items-center justify-center ${
              !merchantLogoUrl ? 'bg-primary rounded-full' : ''
            }`,
            { aspectRatio: 1 },
          ]}
        >
          {merchantLogoUrl ? (
            <Image
              source={{
                uri: merchantLogoUrl,
              }}
              style={tw`w-full h-full rounded-1`}
              resizeMode="contain"
            />
          ) : (
            <MerchantCategoryIcon
              style={tw`w-4 h-4`}
              merchantCategoryGroup={merchantCategoryGroup}
            />
          )}
        </View>
        <View style={tw`flex-1 items-center`}>
          <CSText numberOfLines={1} style={[tw`text-sm text-black pl-3 z-1 w-full`]}>
            {merchantName}
          </CSText>
        </View>

        <View style={tw`flex-row h-4.5 mx-2`}>
          {!hasExpenseCategory && <CategoryIcon />}
          {!hasReceipts && <ReceiptIcon style={tw`ml-1.5`} />}
        </View>

        <View style={tw`w-17`}>
          <CSText
            style={[
              tw`text-sm text-black text-right leading-tight`,
              tw.style(statusDeclined && 'text-error'),
            ]}
          >
            {formatCurrency(amount)}
          </CSText>
        </View>
      </View>
      <AnimatedView style={[tw`flex-row justify-between w-full`, infoAnimatedStyle]}>
        <CSText style={[tw`text-xs leading-tight text-gray-75 ml-9`]} allowFontScaling={false}>
          {formatTime}
        </CSText>
        <CSText style={[tw`text-xs leading-tight text-gray-75`]} allowFontScaling={false}>
          {statusFormatted}
        </CSText>
      </AnimatedView>
    </TouchableOpacity>
  );
};
