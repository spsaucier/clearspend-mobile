import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { AccountActivityResponse } from 'generated/capital';
import tw from '@/Styles/tailwind';
import { formatCurrency, sentenceCase } from '@/Helpers/StringHelpers';
import { AnimatedView, CSText } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { MerchantCategoryIcon } from '@/Components/MerchantCategoryIcon';
import { CategoryIcon, ReceiptIcon } from '@/Components/Icons';

type Props = {
  isAdmin?: boolean;
  transaction: AccountActivityResponse;
  animatedIndex?: any;
  animatedPosition?: any;
  expenseDetails?: any;
};

export const TransactionRow = ({
  transaction: {
    accountActivityId,
    status,
    activityTime,
    receipt,
    expenseDetails,
    merchant,
    card,
    amount,
  },
  isAdmin,
  animatedIndex,
  animatedPosition,
}: Props) => {
  const { navigate } = useNavigation();
  const handleItemOnPress = () => {
    if (accountActivityId)
      navigate(MainScreens.TransactionDetails, { transactionId: accountActivityId });
  };

  const statusDeclined = status === 'DECLINED';
  const statusFormatted = sentenceCase(status || '');

  const formatTime = activityTime ? format(parseISO(activityTime), 'hh:mm a') : '';

  // ANIMATIONS
  const derivedAnimatedIndex = useDerivedValue(() => animatedIndex.value, [animatedPosition.value]);

  const infoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(derivedAnimatedIndex.value, [0, 1], [0, 1]),
    height: interpolate(derivedAnimatedIndex.value, [0, 1], [0, 15]), // 15 = text-xs + leading-tight
  }));

  const hasReceipts = receipt?.receiptId && receipt?.receiptId.length > 0;
  const hasExpenseCategory = !!expenseDetails;

  return (
    <TouchableOpacity style={tw`px-5 py-2`} onPress={handleItemOnPress}>
      <View style={tw`flex-row items-center`}>
        <View
          style={[
            tw`h-6 w-6 items-center justify-center rounded-full overflow-hidden bg-white border border-white z-10 ${
              !merchant?.merchantLogoUrl ? 'bg-primary' : ''
            }`,
            { aspectRatio: 1 },
          ]}
        >
          {merchant?.merchantLogoUrl ? (
            <Image
              source={{
                uri: merchant.merchantLogoUrl,
              }}
              style={tw`w-full h-full rounded-1`}
              resizeMode="contain"
            />
          ) : (
            <MerchantCategoryIcon
              style={tw`w-4 h-4`}
              merchantCategoryGroup={merchant?.merchantCategoryGroup}
            />
          )}
        </View>
        {isAdmin && (
          <View style={tw`flex justify-center items-center w-6 h-6 rounded-full bg-black -ml-1`}>
            <CSText allowFontScaling={false} style={tw`text-2xs text-white tracking-widest ml-0.5`}>
              {card?.ownerFirstName?.[0]}
              {card?.ownerLastName?.[0]}
            </CSText>
          </View>
        )}
        <View style={tw`flex-1 items-center`}>
          <CSText numberOfLines={1} style={tw`text-sm text-black z-1 w-full pl-3`}>
            {merchant?.name}
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
            {formatCurrency(amount?.amount)}
          </CSText>
        </View>
      </View>
      <AnimatedView style={[tw`flex-row justify-between w-full`, infoAnimatedStyle]}>
        <CSText
          style={tw.style(`text-xs leading-tight text-gray-75`, isAdmin ? 'ml-14' : 'ml-9')}
          allowFontScaling={false}
        >
          {formatTime}
        </CSText>
        <CSText style={[tw`text-xs leading-tight text-gray-75`]} allowFontScaling={false}>
          {statusFormatted}
        </CSText>
      </AnimatedView>
    </TouchableOpacity>
  );
};
