import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { UseInfiniteQueryResult } from 'react-query';
import { useTranslation } from 'react-i18next';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { chain } from 'lodash';
import { parse, format, parseISO } from 'date-fns';
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { TransactionRow } from '@/Containers/Wallet/Components/TransactionRow';
import tw from '@/Styles/tailwind';
import { ActivityIndicator, AnimatedCSText, CloseIconButton, CSText } from '@/Components';
import { FilterIcon } from '@/Components/Icons';
import { TransactionFilterOption } from '@/Containers/Wallet/Components/FilterTransactionsBottomSheet';
import { PagedDataAccountActivityResponse, AccountActivityResponse } from '@/generated/capital';

type SharedProps = {
  presentFiltersModal: () => void;
  selectedFilters: TransactionFilterOption[];
  toggleFilter: (filter: TransactionFilterOption) => void;
  searchInputComponent: ReactElement;
  cardTransactionsQuery: UseInfiniteQueryResult<PagedDataAccountActivityResponse, Error>;
  displayResultCount: boolean;
};

type TransactionsContentProps = {
  expanded: boolean;
  title: string;
  isAdmin?: boolean;
} & SharedProps;

const TransactionsContent = ({
  expanded,
  presentFiltersModal,
  selectedFilters,
  toggleFilter,
  searchInputComponent,
  cardTransactionsQuery,
  displayResultCount,
  title,
  isAdmin,
}: TransactionsContentProps) => {
  const { t } = useTranslation();
  const { animatedPosition, animatedIndex } = useBottomSheetInternal();
  const transactionsListRef = useRef<any>(null);
  const [searchYOffset, setSearchYOffset] = useState(0);

  const { data, isFetching, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    cardTransactionsQuery;

  const onFilterTransactionModalPress = () => {
    presentFiltersModal();
  };

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
      marginTop: interpolate(animatedIndex.value, [0, 1], [-searchYOffset, 0]),
    }),
    [animatedPosition, searchYOffset],
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={tw`h-full`}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[tw`flex mx-6 content-start`]}>
          <AnimatedCSText style={[tw`text-base self-start`, transactionsTitleScaleAnimatedStyle]}>
            {title}
          </AnimatedCSText>

          <View
            onLayout={({
              nativeEvent: {
                layout: { height },
              },
            }) => setSearchYOffset(height)}
          >
            <View style={tw`flex-row justify-between py-5`}>
              <View style={tw`flex-1`}>{searchInputComponent}</View>
              <View
                style={tw`items-center justify-center w-10 border border-gray-10 ml-2 rounded-lg`}
              >
                <TouchableOpacity
                  onPress={onFilterTransactionModalPress}
                  style={tw`items-center justify-center`}
                >
                  <FilterIcon style={tw`mx-2`} />
                </TouchableOpacity>
                {selectedFilters.length > 0 ? (
                  <View
                    style={tw`rounded-full absolute top--2 right--2 w-5 h-5 items-center justify-center bg-secondary`}
                    pointerEvents="box-none"
                  >
                    <CSText style={tw`text-white text-xs text-center`}>
                      {selectedFilters.length}
                    </CSText>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={tw`flex-row`}>
              {selectedFilters.length > 0
                ? selectedFilters.map((filter) => (
                    <TouchableOpacity
                      style={[
                        tw`flex-row rounded-full mr-4 pl-3 pr-2 pt-1 pb-1 bg-secondary items-center`,
                      ]}
                      onPress={() => toggleFilter(filter)}
                      key={filter}
                    >
                      <CSText style={tw`text-xs text-white`}>
                        {t(`wallet.filterTransactions.${filter}`)}
                      </CSText>
                      <CloseIconButton color={tw.color('bg-white')} style={tw`ml-1`} />
                    </TouchableOpacity>
                  ))
                : null}
            </View>
            {displayResultCount ? (
              <View style={[selectedFilters.length > 0 && tw`mt-5`]}>
                {/* TODO improve pluralization */}
                <CSText style={tw`pb-2 text-sm`}>{`${data?.pages[0].totalElements} result${
                  data?.pages[0].totalElements === 1 ? '' : 's'
                }`}</CSText>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Animated.View style={[tw`flex-1 bg-white`, transactionsContainerAnimatedStyle]}>
        {isFetching && !isFetchingNextPage ? (
          <View style={tw`items-center justify-center mt-10`}>
            <ActivityIndicator style={tw`w-5`} color={tw.color('black')} />
          </View>
        ) : error ? (
          <View style={tw`h-full items-center`}>
            <CSText>{error?.message}</CSText>
          </View>
        ) : transactionsGroupedByDate.length > 0 ? (
          <>
            <FlatList<any>
              scrollEnabled={expanded}
              data={transactionsGroupedByDate}
              showsVerticalScrollIndicator={false}
              ref={transactionsListRef}
              onEndReached={loadMore}
              onEndReachedThreshold={0.1}
              contentContainerStyle={tw.style(
                'pb-2',
                !isFetchingNextPage && !hasNextPage ? 'pb-20' : 'pb-2',
              )}
              renderItem={({ item, index }) => {
                const { date, transactions } = item;
                const dateParsed = parse(date, 'yyyy-MM-dd', new Date());
                return (
                  <View style={tw.style(`pb-2`, index === 0 ? 'mt-2' : '')}>
                    <View style={tw`flex-row justify-between bg-tan px-5 py-2 mb-2`}>
                      <CSText style={tw`text-xs text-gray-75 uppercase tracking-widest`}>
                        {format(dateParsed, 'MMM dd, yyyy')}
                      </CSText>
                    </View>
                    {transactions.map((transaction: AccountActivityResponse) => (
                      <TransactionRow
                        key={transaction.accountActivityId}
                        isAdmin={isAdmin}
                        transaction={transaction}
                        animatedIndex={animatedIndex}
                        animatedPosition={animatedPosition}
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
  initialSnapPoint: number;
  animateOnMount?: boolean;
  isAdmin?: boolean;
  title: string;
} & SharedProps;

const Transactions = ({
  initialSnapPoint,
  presentFiltersModal,
  selectedFilters,
  toggleFilter,
  searchInputComponent,
  cardTransactionsQuery,
  displayResultCount,
  animateOnMount,
  isAdmin,
  title,
}: TransactionProps) => {
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
      style={{
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 10,
      }}
      snapPoints={snapPointMemo}
      handleStyle={[tw`flex self-center bg-transparent w-12 rounded-full mt-1 mb-3`]}
      handleIndicatorStyle={tw`bg-black-20 w-14 h-1`}
      onChange={(e) => setExpanded(e === 1)}
      animateOnMount={animateOnMount}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        <TransactionsContent
          expanded={expanded}
          title={title}
          presentFiltersModal={presentFiltersModal}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          searchInputComponent={searchInputComponent}
          cardTransactionsQuery={cardTransactionsQuery}
          displayResultCount={displayResultCount}
          isAdmin={isAdmin}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Transactions;
