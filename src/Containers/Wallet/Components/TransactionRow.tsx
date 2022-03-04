import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import tw from '@/Styles/tailwind';
import { formatCurrency, sentenceCase } from '@/Helpers/StringHelpers';
import { AnimatedCSText } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { MerchantCategoryIcon } from '@/Components/MerchantCategoryIcon';
import { ExpenseIcon, PlusWithBorderIcon, ReceiptIcon } from '@/Components/Icons';

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

  const merchantAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(derivedAnimatedIndex.value, [0, 1], [8, -4]),
      },
    ],
  }));

  const timeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(derivedAnimatedIndex.value, [0.5, 1], [0, 1]),
  }));

  const amountAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(derivedAnimatedIndex.value, [0, 1], [8, -4]),
      },
    ],
  }));

  const statusAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(derivedAnimatedIndex.value, [0.5, 1], [0, 1]),
  }));

  const hasReceipts = receiptIds.length > 0;

  return (
    <TouchableOpacity
      style={tw`flex-row px-6 py-2`}
      key={transactionId}
      onPress={handleItemOnPress}
    >
      <View
        style={[
          tw`h-8 w-8 items-center justify-center ${
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
            resizeMode="cover"
          />
        ) : (
          <MerchantCategoryIcon style={tw`w-5 h-5`} merchantCategoryGroup={merchantCategoryGroup} />
        )}
      </View>
      <View style={tw`flex-1`}>
        <AnimatedCSText
          numberOfLines={1}
          style={[tw`text-base text-black pl-3 z-1 w-full`, merchantAnimatedStyle]}
        >
          {merchantName}
        </AnimatedCSText>

        <AnimatedCSText style={[tw`text-xs text-black pl-3`, timeAnimatedStyle]}>
          {formatTime}
        </AnimatedCSText>
      </View>

      <View style={tw`flex-row justify-end items-center w-10`}>
        {(!expenseDetails || !hasReceipts) && (
          <PlusWithBorderIcon
            style={{ marginRight: -4, zIndex: 2 }}
            color={tw.color('black')}
            size={14}
          />
        )}
        {!hasReceipts && (
          <ReceiptIcon
            style={{
              marginRight: !expenseDetails ? -6 : 0,
              zIndex: 1,
            }}
          />
        )}
        {!expenseDetails && <ExpenseIcon />}
      </View>

      <View style={tw`bg-white items-end w-18`}>
        <AnimatedCSText
          style={[
            tw`text-base text-black z-1`,
            tw.style(statusDeclined && 'text-error'),
            amountAnimatedStyle,
          ]}
        >
          {formatCurrency(amount)}
        </AnimatedCSText>
        <AnimatedCSText style={[tw`text-xs text-black ml-3`, statusAnimatedStyle]}>
          {statusFormatted}
        </AnimatedCSText>
      </View>
    </TouchableOpacity>
  );
};
