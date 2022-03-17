import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { chain, debounce } from 'lodash';
import { parse, format, parseISO } from 'date-fns';
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';

import { Status, TransactionRow } from '@/Containers/Wallet/Components/TransactionRow';
import { TWSearchInput } from '@/Components/SearchInput';
import tw from '@/Styles/tailwind';
import { ActivityIndicator, AnimatedCSText, CSText } from '@/Components';
import { useCardTransactions } from '@/Queries';

type TransactionType = {
  accountActivityId: string;
  merchant: {
    name: string;
    merchantLogoUrl: string | undefined;
    merchantCategoryGroup: string;
  };
  amount: { amount: number };
  status: Status;
  receipt: { receiptId: string[] };
  activityTime: string;
  expenseDetails: { categoryName: string; iconRef: number };
};

type TransactionsContentProps = {
  cardId: string;
  expanded: boolean;
};

const TransactionsContent = ({ cardId, expanded }: TransactionsContentProps) => {
  const { t } = useTranslation();
  const { animatedPosition, animatedIndex } = useBottomSheetInternal();
  const transactionsListRef = useRef<any>(null);
  const [searchText, setSearchText] = useState('');
  const { data, isLoading, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCardTransactions({
      cardId,
      searchText,
    });

  useEffect(() => {
    if (!expanded) {
      transactionsListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [expanded]);

  useEffect(() => {
    if (animatedIndex.value === 0) {
      Keyboard.dismiss();
    }
  }, [animatedIndex.value]);

  const transactionsWithDate = data?.pages
    .map((page) => page.content)
    .flat()
    .map((x) => {
      const activityTimeISO = parseISO(x?.activityTime || '');
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

  const transactionsTitleScaleAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { scale: interpolate(animatedIndex.value, [0, 1], [1, 1.25]) },
        {
          translateX: interpolate(animatedIndex.value, [0, 1], [1, 16]),
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

  const onChangeSearch = debounce((newSearch) => {
    setSearchText(newSearch);
    setTimeout(() => refetch());
  }, 100);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={tw`h-full`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[tw`flex m-6 mt-2 content-start`]}>
          <AnimatedCSText style={[tw`text-base self-start`, transactionsTitleScaleAnimatedStyle]}>
            {t('wallet.transactions.recentTransactions')}
          </AnimatedCSText>

          <View style={[tw`flex-row mt-4 justify-between`]}>
            <View style={tw`flex-grow`}>
              <TWSearchInput
                onChangeText={onChangeSearch}
                placeholder={t('wallet.transactions.searchTransactions')}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

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
          <>
            <FlatList
              scrollEnabled={expanded}
              data={transactionsGroupedByDate}
              showsVerticalScrollIndicator={false}
              ref={transactionsListRef}
              onEndReached={loadMore}
              onEndReachedThreshold={0}
              contentContainerStyle={tw.style(
                'pb-2',
                !isFetchingNextPage && !hasNextPage ? 'pb-20' : 'pb-2',
              )}
              renderItem={({ item }) => {
                const { date, transactions } = item;
                const dateParsed = parse(date, 'yyyy-MM-dd', new Date());
                return (
                  <View style={tw`pb-2 mt-2`}>
                    <View style={tw`flex-row justify-between bg-tan px-6 py-2 mb-2`}>
                      <CSText style={tw`text-sm text-gray-50`}>
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
                        receiptIds={transaction.receipt?.receiptId}
                        time={transaction.activityTime}
                        merchantLogoUrl={transaction.merchant.merchantLogoUrl}
                        merchantCategoryGroup={transaction.merchant.merchantCategoryGroup}
                        animatedIndex={animatedIndex}
                        animatedPosition={animatedPosition}
                        expenseDetails={transaction.expenseDetails}
                      />
                    ))}
                  </View>
                );
              }}
              keyExtractor={(item) => item.date}
            />
            {isFetchingNextPage && (
              <View style={tw`flex-row justify-center items-center h-20 bg-white`}>
                <ActivityIndicator style={tw`w-6`} bgColor="black" />
              </View>
            )}
          </>
        ) : (
          <View style={tw`items-center justify-center m-12`}>
            <CSText style={tw`text-base text-center text-gray-50`}>
              {t('wallet.transactions.empty')}
            </CSText>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

type TransactionProps = {
  cardId: string;
  initialSnapPoint: number;
};

const Transactions = ({ cardId, initialSnapPoint }: TransactionProps) => {
  const expandedSnapPoint = '100%';

  const snapPointMemo = useMemo(
    () => [initialSnapPoint, expandedSnapPoint],
    [initialSnapPoint, expandedSnapPoint],
  );
  const { handleContentLayout } = useBottomSheetDynamicSnapPoints(snapPointMemo);
  const [expanded, setExpanded] = useState(false);

  return (
    <BottomSheet
      enableHandlePanningGesture
      snapPoints={snapPointMemo}
      handleStyle={[tw`flex self-center bg-transparent w-12 rounded-full mt-1 mb-3`]}
      handleIndicatorStyle={tw`bg-black-20 w-14 h-1`}
      onChange={(e) => setExpanded(e === 1)}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <TransactionsContent cardId={cardId} expanded={expanded} />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Transactions;
