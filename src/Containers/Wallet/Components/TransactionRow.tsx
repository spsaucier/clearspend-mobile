import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { formatCurrency, sentenceCase } from '@/Helpers/StringHelpers';
import { AnimatedCSText, CSText } from '@/Components';
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
  animatedIndex?: any;
  animatedPosition?: any;
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
  animatedIndex,
  animatedPosition,
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

  const addReceiptAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(derivedAnimatedIndex.value, [0.5, 1], [0, 1]),
  }));

  return (
    <TouchableOpacity
      style={tw`flex-row justify-between px-6 py-2`}
      key={transactionId}
      onPress={handleItemOnPress}
    >
      <View style={tw`flex-row`}>
        <View
          style={[
            tw`h-8 w-8 rounded-full overflow-hidden items-center justify-center ${
              !merchantLogoUrl ? 'bg-primary' : ''
            }`,
          ]}
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

        <View style={tw`flex justify-center`}>
          <AnimatedCSText style={[tw`text-base text-black ml-3 z-1`, merchantAnimatedStyle]}>
            {merchantName}
          </AnimatedCSText>
          <AnimatedCSText style={[tw`text-xs text-black ml-3`, timeAnimatedStyle]}>
            {formatTime}
          </AnimatedCSText>
        </View>
      </View>

      <View style={tw`flex-row`}>
        <Animated.View style={addReceiptAnimatedStyle}>
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
        </Animated.View>
        <View style={tw`w-20 items-end`}>
          <AnimatedCSText
            style={tw.style(
              'text-base text-black z-1',
              statusDeclined && 'text-error',
              amountAnimatedStyle,
            )}
          >
            {formatCurrency(amount)}
          </AnimatedCSText>
          <AnimatedCSText style={[tw`text-xs text-black ml-3`, statusAnimatedStyle]}>
            {statusFormatted}
          </AnimatedCSText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
