import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import Carousel from 'react-native-snap-carousel';
import tw from '@/Styles/tailwind';
import {
  NotificationBell,
  Button,
  FocusAwareStatusBar,
  ActivityIndicator,
  CSText,
} from '@/Components';
import { EyeIcon } from '@/Components/Icons/eyeIcon';
import { SnowflakeIcon } from '@/Components/Icons/snowflakeIcon';
import { Card } from '@/Containers/Wallet/Components/Card';
import { ProfileIcon } from '@/Components/Icons';
import Transactions from './Transactions';

const USER_CARDS_QUERY = gql`
  query UserCardsQuery {
    cards @rest(type: "Card", path: "/users/cards") {
      card {
        cardId
        lastDigits: lastFour
        cardLine3
        type
        status
      }
      availableBalance {
        currency
        amount
      }
      allocationName
    }
  }
`;

const { width: screenWidth } = Dimensions.get('screen');

const WalletScreen = ({ navigation }: { navigation: any }) => {
  const [selectedCard, setSelectedCard] = useState<any>();
  const isFrozen = selectedCard?.card.status === 'BLOCKED';

  const { t } = useTranslation();

  const {
    data: cardsData,
    loading: cardsLoading,
    refetch: refetchCards,
    error: cardsError,
  } = useQuery(USER_CARDS_QUERY);

  useEffect(() => {
    if (cardsData?.cards?.length > 0 && !selectedCard) {
      setSelectedCard(cardsData.cards[0]);
    }
  }, [cardsData, selectedCard]);

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
        <CSText style={tw`text-base text-error mb-2`}>{cardsError?.message}</CSText>
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

  const cardWidth = 0.95 * screenWidth;

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />

      {/* Header and icons */}
      <View style={tw`flex-row items-center justify-end my-3 mr-9 `}>
        <View style={tw`flex-row`}>
          <NotificationBell onPress={() => navigation.navigate('Notifications')} />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <ProfileIcon color={tw.color('white')} style={tw`ml-3`} size={26} />
          </TouchableOpacity>
        </View>
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
          inactiveSlideOpacity={0.1}
          removeClippedSubviews={false}
          lockScrollWhileSnapping
          onSnapToItem={(index: any) => setSelectedCard(cardsData.cards[index])}
          renderItem={({ item }: any) => {
            const { card, availableBalance, allocationName } = item;
            const { cardId, lastDigits, cardLine3, type } = card;

            const isVirtual = type === 'VIRTUAL';
            const cardTitle = cardLine3 || allocationName;

            const { amount } = availableBalance;

            return (
              <View style={[tw`p-2`, { width: cardWidth }]} key={cardId}>
                <Card
                  key={cardId}
                  cardId={cardId}
                  balance={amount}
                  isFrozen={isFrozen}
                  isVirtual={isVirtual}
                  lastDigits={lastDigits}
                  cardTitle={cardTitle}
                  onPress={() => navigation.navigate('Card Details', { cardId })}
                />
              </View>
            );
          }}
        />
      </View>

      {/* Slider dots */}
      <View style={tw`flex-row justify-center my-1`}>
        {cardsData.cards?.length > 1 &&
          cardsData.cards.map((item: { card: { cardId: any } }) => {
            const {
              card: { cardId },
            } = item;
            const selected = cardId === selectedCard?.card.cardId;

            return (
              <View
                key={cardId}
                style={tw.style(
                  'rounded-full bg-white mx-1',
                  selected ? 'opacity-90' : 'opacity-10',
                  { height: 6, width: 6 },
                )}
              />
            );
          })}
      </View>

      {/* Buttons */}
      <View style={tw`flex-1 flex-row items-start justify-center self-center py-2 px-4`}>
        <Button
          containerStyle={tw`flex-1 mr-1`}
          onPress={() => navigation.navigate('Card Info', { cardId: selectedCard?.card.cardId })}
          small
          theme="dark"
        >
          <EyeIcon style={tw`mr-2`} color={tw.color('primary')} />
          <CSText style={tw`text-base text-white`}>{t('card.showCardInfo')}</CSText>
        </Button>

        <Button containerStyle={tw.style('flex-1 ml-1', isFrozen && 'bg-white')} small theme="dark">
          <SnowflakeIcon
            style={tw`mr-2`}
            color={isFrozen ? tw.color('black') : tw.color('primary')}
          />
          {!cardsLoading && isFrozen ? (
            <CSText style={tw`text-base text-black`}>{t('card.unfreezeCard')}</CSText>
          ) : (
            <CSText style={tw`text-base text-white`}>{t('card.freezeCard')}</CSText>
          )}
        </Button>
      </View>

      {selectedCard?.card && <Transactions cardId={selectedCard?.card.cardId} />}
    </SafeAreaView>
  );
};

export default WalletScreen;
