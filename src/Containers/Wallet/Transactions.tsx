import React from 'react';
import { View, Text, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import { chain } from 'lodash';
import { parse, format } from 'date-fns';
import { TransactionRow } from '@/Containers/Wallet/Components/TransactionRow';
import { NoTransactionsSvg } from '@/Components/Svg/NoTransactions';
import { TWSearchInput } from '@/Components/SearchInput';
import { FilterIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';

const TRANSACTIONS_QUERY = gql`
  query TransactionsQuery($cardId: ID!) {
    transactions(cardId: $cardId) {
      transactionId
      merchantName
      merchantId
      merchantCategory
      merchantLogoUrl
      amount
      status
      date
      time
      isReceiptLinked
    }
  }
`;

const { height: windowHeight } = Dimensions.get('window');
const sliderThreshold = (windowHeight / 100) * 10;

type ContextInterfaceForTranslateY = {
  translateY: number;
  initialAbsoluteY: number;
};

type Props = {
  cardId: string;
};

const Transactions = ({ cardId }: Props) => {
  const safeAreInset = useSafeAreaInsets();
  const { t } = useTranslation();

  const translateY = useSharedValue(0);
  const isViewExpanded = useSharedValue(false);

  const { data, loading, error } = useQuery(TRANSACTIONS_QUERY, {
    variables: { cardId },
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterfaceForTranslateY
  >({
    onStart: (event, context) => {
      context.translateY = translateY.value;
      if (!context.initialAbsoluteY) {
        context.initialAbsoluteY = event.absoluteY;
      }
    },
    onActive: (event, context) => {
      if (event.absoluteY > context.initialAbsoluteY) return;

      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      if (Math.abs(event.translationY) > sliderThreshold) {
        if (isViewExpanded.value && event.translationY > 0) {
          translateY.value = withSpring(0);
          isViewExpanded.value = false;
        } else if (event.translationY < 0) {
          translateY.value = withSpring(-(context.initialAbsoluteY - safeAreInset.top - 10));
          isViewExpanded.value = true;
        }
        return;
      }

      // otherwise, bounce back
      translateY.value = withSpring(context.translateY);
    },
  });
  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: translateY.value }],
    }),
    [translateY],
  );

  // as fontSize interpolation does not use native driver,
  // transform scale combined with translateX achieve the same effect
  const transactionsTitleAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { scale: interpolate(Math.abs(translateY.value), [0, windowHeight / 2], [1, 1.25]) },
        { translateX: interpolate(Math.abs(translateY.value), [0, windowHeight / 2], [1, 16]) },
      ],
    }),
    [translateY],
  );

  const inputSearchAnimatedStyle = useAnimatedStyle(
    () => ({
      marginBottom: interpolate(Math.abs(translateY.value), [0, windowHeight / 2], [-55, 0]),
    }),
    [translateY],
  );

  const transactionsGroupedByDate =
    data?.transactions.length > 0
      ? chain(data.transactions)
          .groupBy('date')
          .map((value, key) => ({
            date: key,
            transactions: value,
          }))
          .orderBy((x) => parse(x.date, 'MM-dd-yyyy', new Date()))
          .reverse()
          .value()
      : [];

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[tw`flex-grow bg-white pb-6 shadow-xl rounded-t-3xl`, containerAnimatedStyle]}
      >
        <View
          style={tw.style('flex self-center bg-gray90 w-12 rounded-full my-3', {
            height: 6,
          })}
        />

        <View style={[tw`flex m-6 mb-4 content-start`]}>
          <Animated.Text
            style={[
              tw`text-base text-copyDark font-bold self-start`,
              transactionsTitleAnimatedStyle,
            ]}
          >
            {t('wallet.transactions.recentTransactions')}
          </Animated.Text>

          <Animated.View style={[tw`flex-row mt-4 justify-between`, inputSearchAnimatedStyle]}>
            <View style={tw`flex-grow pr-2`}>
              <TWSearchInput placeholder={t('wallet.transactions.searchTransactions')} />
            </View>
            <View style={tw`flex-none self-center rounded-lg bg-gray95 w-8 py-1 items-center`}>
              <FilterIcon color="black" />
            </View>
          </Animated.View>
        </View>

        <View style={tw`flex h-full bg-white`}>
          {loading ? (
            <View style={tw`items-center justify-center`}>
              <ActivityIndicator style={tw`w-5`} />
            </View>
          ) : error ? (
            <View style={tw`items-center justify-center`}>
              <Text>{error?.message}</Text>
            </View>
          ) : transactionsGroupedByDate.length > 0 ? (
            <FlatList
              scrollEnabled
              decelerationRate="fast"
              data={transactionsGroupedByDate}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const { date, transactions } = item;
                const dateParsed = parse(date, 'MM-dd-yyyy', new Date());

                return (
                  <View style={tw`pb-2`}>
                    <View style={tw`flex-row justify-between bg-gray95 px-6 py-2 mb-2`}>
                      <Text style={tw`text-sm text-gray50`}>
                        {format(dateParsed, 'MMM dd, yyyy')}
                      </Text>
                      <Text style={tw`text-sm text-gray50`}>
                        {t('wallet.transactions.balance')}
                        $123.00
                      </Text>
                    </View>
                    {transactions.map((transaction) => (
                      <TransactionRow
                        key={transaction.transactionId}
                        cardId={cardId}
                        transactionId={transaction.transactionId}
                        merchantName={transaction.merchantName}
                        amount={transaction.amount}
                        status={transaction.status}
                        isReceiptLinked={transaction.isReceiptLinked}
                        time={transaction.time}
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
              <Text style={tw`mt-3 font-semibold`}>{t('wallet.transactions.noRecent')}</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Transactions;
