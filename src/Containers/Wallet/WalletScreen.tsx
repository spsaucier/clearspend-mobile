import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import Carousel from 'react-native-snap-carousel';
import tw from '@/Styles/tailwind';
import { NotificationBell, Button, FocusAwareStatusBar, ActivityIndicator } from '@/Components';
import { EyeIcon } from '@/Components/Icons/eyeIcon';
import { SnowflakeIcon } from '@/Components/Icons/snowflakeIcon';
import { TransactionRow } from '@/Containers/Wallet/Components/TransactionRow';
import { Card, CardType } from '@/Containers/Wallet/Components/Card';
import { ProfileIcon } from '@/Components/Icons';
import { NoTransactionsSvg } from '@/Components/Svg/NoTransactions';

const CARDS_QUERY = gql`
  query CardQuery {
    cards {
      cardId
      isVirtual
      isDisposable
      isFrozen
      currency
      balance
      cardTitle
      lastDigits
    }
  }
`;

const CARD_QUERY = gql`
  query CardQuery($cardId: ID!) {
    card(cardId: $cardId) {
      isFrozen
      transactions {
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
  }
`;

const { width: screenWidth } = Dimensions.get('screen');

const WalletScreen = ({ navigation }: { navigation: any }) => {
  const [selectedCardId, setSelectedCardId] = useState('1111');

  const { t } = useTranslation();

  const {
    data: cardsData,
    loading: cardsLoading,
    error: cardsError,
    refetch: refetchCards,
  } = useQuery(CARDS_QUERY);

  const {
    data: cardData,
    loading: cardLoading,
    error: cardError,
    refetch: refetchCard,
  } = useQuery(CARD_QUERY, {
    variables: { cardId: selectedCardId },
  });

  useEffect(() => {
    if (cardsData) setSelectedCardId(cardsData.cards[0].cardId);
    refetchCard({ cardId: selectedCardId });
  }, [cardsLoading, cardsData]);

  useEffect(() => {
    refetchCard({ cardId: selectedCardId });
  }, [selectedCardId]);

  if (cardsLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-lightBG`}>
        <ActivityIndicator />
      </View>
    );
  }

  if (cardsError) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <Text style={tw`text-base text-error mb-2`}>{cardsError?.message}</Text>
        <Button
          onPress={() => {
            refetchCards();
          }}
          small
        >
          {t('general.reload')}
        </Button>
      </View>
    );
  }

  const cardWidth = 0.9 * screenWidth;

  return (
    <SafeAreaView style={tw`flex-1 bg-lightBG`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('lightBG')} barStyle="dark-content" />

      {/* Header and icons */}
      <View style={tw`px-9 py-5`}>
        <View style={tw`flex-row items-center justify-between my-2`}>
          <Text style={tw`text-base font-bold text-copyDark`}>Company Name</Text>
          <View style={tw`flex-row items-center justify-center`}>
            <NotificationBell onPress={() => navigation.navigate('Notifications')} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <ProfileIcon color={tw.color('black')} style={tw`ml-3`} size={26} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={tw`text-3xl font-bold text-copyDark`}>
          {t('wallet.header', { name: 'John' })}
        </Text>
      </View>

      {/* Card Carousel w. buttons */}
      <View>
        <Carousel
          // ref={(c) => { _carousel = c; }}
          data={cardsData.cards}
          layout="default"
          sliderWidth={screenWidth}
          itemWidth={cardWidth}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.5}
          removeClippedSubviews={false}
          lockScrollWhileSnapping
          onSnapToItem={(index: any) => setSelectedCardId(cardsData.cards[index].cardId)}
          renderItem={({ item }: ListRenderItemInfo<CardType>) => (
            <View style={[tw`p-2`, { width: cardWidth }]}>
              <Card
                key={item.cardId}
                cardId={item.cardId}
                balance={item.balance}
                isFrozen={item.isFrozen}
                isDisposable={item.isDisposable}
                isVirtual={item.isVirtual}
                lastDigits={item.lastDigits}
                cardTitle={item.cardTitle}
                onPress={() => navigation.navigate('Card Details')}
              />
            </View>
          )}
        />
      </View>

      {/* Button Row */}
      <View style={tw`flex-row items-center justify-center pt-3 pb-4 px-9`}>
        <Button containerStyle={tw`flex-1`} onPress={() => navigation.navigate('Card Info')} small>
          <EyeIcon style={tw`mr-1`} />
          <Text style={tw`text-base font-bold text-primary`}>{t('card.showCardInfo')}</Text>
        </Button>
        <View style={tw`w-3 h-3`} />
        <Button containerStyle={tw`flex-1`} small>
          <SnowflakeIcon style={tw`mr-1`} />
          {!cardLoading && cardData.card.isFrozen ? (
            <Text style={tw`text-base font-bold text-primary`}>{t('card.unfreezeCard')}</Text>
          ) : (
            <Text style={tw`text-base font-bold text-primary`}>{t('card.freezeCard')}</Text>
          )}
        </Button>
      </View>

      {/* TODO Slider dots */}

      {/* Bottom white area */}
      <View style={tw`flex-1 bg-white pb-6 shadow-xl rounded-t-3xl`}>
        <View
          style={tw.style('flex self-center bg-gray90 w-12 rounded-full my-3', {
            height: 6,
          })}
        />
        {/* Recent Transactions */}
        <Text style={tw`text-xl font-bold text-copyDark px-6 py-4`}>
          {t('wallet.transactions.recentTransactions')}
        </Text>

        {/* Date and balance */}
        <View style={tw`flex-row justify-between bg-gray95 px-6 py-2 mb-4`}>
          <Text style={tw`text-sm text-gray50`}>Jun 30, 2021</Text>
          <Text style={tw`text-sm text-gray50`}>
            {t('wallet.transactions.balance')}
            $123.00
          </Text>
        </View>

        {cardLoading ? (
          <View style={tw`flex-1 items-center justify-center`}>
            <ActivityIndicator style={tw`w-5`} />
          </View>
        ) : cardError ? (
          <View style={tw`flex-1 items-center justify-center`}>
            <Text>{cardError?.message}</Text>
          </View>
        ) : cardData.card.transactions && cardData.card.transactions.length > 0 ? (
          <FlatList
            scrollEnabled
            decelerationRate="fast"
            data={cardData.card.transactions}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TransactionRow
                key={item.transactionId}
                cardId={item.cardId}
                transactionId={item.transactionId}
                merchantName={item.merchantName}
                amount={item.amount}
                onPress={() => {}}
                status={item.status}
                isReceiptLinked={item.isReceiptLinked}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.cardId}
          />
        ) : (
          <View style={tw`flex-1 items-center justify-center`}>
            <NoTransactionsSvg />
            <Text style={tw`mt-3 font-semibold`}>{t('wallet.transactions.noRecent')}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
