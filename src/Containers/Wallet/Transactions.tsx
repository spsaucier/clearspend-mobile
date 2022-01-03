import React, { useCallback, useMemo, useRef } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { chain } from 'lodash';
import { parse, format, parseISO } from 'date-fns';
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/core';

import { Status, TransactionRow } from '@/Containers/Wallet/Components/TransactionRow';
import { NoTransactionsSvg } from '@/Components/Svg/NoTransactions';
import { TWSearchInput } from '@/Components/SearchInput';
import { FilterIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import { useCardTransactions } from '@/Queries';

const dimensions = Dimensions.get('screen');

type TransactionType = {
  accountActivityId: string;
  merchant: { name: string; merchantLogoUrl: string | undefined; merchantCategoryCode: number };
  amount: { amount: number };
  status: Status;
  receipt: { receiptId: string };
  activityTime: string;
};

type Props = {
  cardId: string;
};

const TransactionsContent = ({ cardId }: Props) => {
  const { animatedPosition, animatedIndex } = useBottomSheetInternal();
  const searchContainerRef = useRef<View>(null);
  const { t } = useTranslation();

  const { data, isLoading, error, refetch } = useCardTransactions(cardId);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const content = data?.content;

  const transactionsWithDate = content?.map((x: any) => {
    const activityTimeISO = parseISO(x.activityTime);
    const activityDate = format(activityTimeISO, 'yyyy-MM-dd');
    return {
      ...x,
      activityDate,
    };
  });

  const transactionsGroupedByDate = transactionsWithDate
    ? chain(transactionsWithDate)
        .groupBy('activityDate')
        .map((value, key) => ({
          date: key,
          transactions: value,
        }))
        .orderBy((x) => parse(x.date, 'MM-dd-yyyy', new Date()))
        .value()
    : [];

  // animations
  // as fontSize interpolation does not use native driver,
  // transform scale combined with translateX achieve the same effect
  const transactionsTitleScaleAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { scale: interpolate(animatedIndex.value, [0, 1], [1, 1.25]) },
        {
          translateX: interpolate(Math.abs(animatedIndex.value), [0, 1], [1, 16]),
        },
      ],
    }),
    [animatedPosition],
  );

  const transactionsContainerAnimatedStyle = useAnimatedStyle(
    () => ({
      marginTop: interpolate(animatedIndex.value, [0, 1], [-70, 0]),
    }),
    [animatedPosition],
  );

  return (
    <View style={tw`h-full`}>
      <View style={[tw`flex m-6 mt-2 content-start`]}>
        <Animated.Text
          style={[tw`text-base font-bold self-start`, transactionsTitleScaleAnimatedStyle]}
        >
          {t('wallet.transactions.recentTransactions')}
        </Animated.Text>

        <View style={[tw`flex-row mt-4 justify-between`]} ref={searchContainerRef}>
          <View style={tw`flex-grow pr-2`}>
            <TWSearchInput placeholder={t('wallet.transactions.searchTransactions')} />
          </View>
          <View style={tw`flex-none self-center rounded-lg bg-gray95 w-8 py-1 items-center`}>
            <FilterIcon color="black" />
          </View>
        </View>
      </View>

      <Animated.View style={[tw`flex-1 bg-white`, transactionsContainerAnimatedStyle]}>
        {isLoading ? (
          <View style={tw`items-center justify-center`}>
            <ActivityIndicator style={tw`w-5`} />
          </View>
        ) : error ? (
          <View style={tw`h-full items-center`}>
            <CSText>{error?.message}</CSText>
          </View>
        ) : transactionsGroupedByDate.length > 0 ? (
          <FlatList
            // contentContainerStyle={tw`pb-6`}
            scrollEnabled
            data={transactionsGroupedByDate}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const { date, transactions } = item;
              const dateParsed = parse(date, 'yyyy-MM-dd', new Date());

              return (
                <View style={tw`pb-2`}>
                  <View style={tw`flex-row justify-between bg-gray95 px-6 py-2 mb-2`}>
                    <CSText style={tw`text-sm text-gray50`}>
                      {format(dateParsed, 'MMM dd, yyyy')}
                    </CSText>
                  </View>
                  {transactions.map((transaction: TransactionType) => (
                    <TransactionRow
                      key={transaction.accountActivityId}
                      cardId={cardId}
                      transactionId={transaction.accountActivityId}
                      merchantName={transaction.merchant.name}
                      amount={transaction.amount.amount}
                      status={transaction.status}
                      receiptId={transaction.receipt?.receiptId}
                      time={transaction.activityTime}
                      merchantLogoUrl={transaction.merchant.merchantLogoUrl}
                      merchantCategoryCode={transaction.merchant.merchantCategoryCode}
                    />
                  ))}
                </View>
              );
            }}
            keyExtractor={(item) => item.date}
          />
        ) : (
          <View style={tw`items-center justify-center`}>
            <NoTransactionsSvg />
            <CSText style={tw`mt-3 font-semibold`}>{t('wallet.transactions.noRecent')}</CSText>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const Transactions = ({ cardId }: Props) => {
  // (dimensions.height / dimensions.width) < 2 means the device is short and wider
  // like old devices Pixel 2, iphone 5
  const initialSnapPoint = dimensions.height / dimensions.width < 2 ? '40%' : '50%';
  const expandedSnapPoint = '95%';

  const snapPointMemo = useMemo(() => [initialSnapPoint, expandedSnapPoint], []);
  const { handleContentLayout } = useBottomSheetDynamicSnapPoints(snapPointMemo);
  return (
    <BottomSheet
      enableHandlePanningGesture
      snapPoints={snapPointMemo}
      handleStyle={[tw`flex self-center bg-transparent w-12 rounded-full mt-3`]}
      handleIndicatorStyle={tw`bg-gray80`}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <TransactionsContent cardId={cardId} />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Transactions;
