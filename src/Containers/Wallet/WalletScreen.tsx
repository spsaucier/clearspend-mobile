import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import Carousel from 'react-native-snap-carousel';
import tw from '@/Styles/tailwind';
import { NotificationBell, Button, FocusAwareStatusBar, ActivityIndicator } from '@/Components';
import { EyeIcon } from '@/Components/Icons/eyeIcon';
import { SnowflakeIcon } from '@/Components/Icons/snowflakeIcon';
import { Card } from '@/Containers/Wallet/Components/Card';
import { ProfileIcon } from '@/Components/Icons';
// import Transactions from './Transactions';

const USER_CARDS_QUERY = gql`
  query UserCardsQuery {
    cards @rest(type: "Card", path: "/users/cards") {
      card {
        cardId
        lastDigits: lastFour
        cardTitle: cardLine3
        cardType
      }
      availableBalance {
        currency
        amount
      }
    }
  }
`;

const { width: screenWidth } = Dimensions.get('screen');

const WalletScreen = ({ navigation }: { navigation: any }) => {
  const [selectedCard, setSelectedCard] = useState<any>();

  const { t } = useTranslation();

  const {
    data: cardsData,
    loading: cardsLoading,
    refetch: refetchCards,
    error: cardsError,
  } = useQuery(USER_CARDS_QUERY);

  useEffect(() => {
    if (cardsData?.cards.length > 0 && !selectedCard) {
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

  const cardWidth = 0.95 * screenWidth;

  return (
    <SafeAreaView style={tw`flex-1 bg-forest-green`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('forest-green')} barStyle="light-content" />

      {/* Header and icons */}
      <View style={tw`px-9 py-5`}>
        <View style={tw`flex-row items-center justify-end my-2`}>
          <View style={tw`flex-row`}>
            <NotificationBell onPress={() => navigation.navigate('Notifications')} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <ProfileIcon color={tw.color('white')} style={tw`ml-3`} size={26} />
            </TouchableOpacity>
          </View>
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
            const { card, availableBalance } = item;
            const { cardId, lastDigits, cardTitle, cardType } = card;

            const isFrozen = false;
            const isDisposable = false;
            const isVirtual = cardType === 'VIRTUAL'; // TODO: MAKE THIS A CONST?

            const { amount } = availableBalance;
            const balance = amount;

            return (
              <View style={[tw`p-2`, { width: cardWidth }]}>
                <Card
                  key={cardId}
                  cardId={cardId}
                  balance={balance}
                  isFrozen={isFrozen}
                  isDisposable={isDisposable}
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
      <View style={tw`flex-row justify-center my-3`}>
        {cardsData.cards.length > 1 &&
          cardsData.cards.map((card: { cardId: string }) => (
            <View
              style={tw.style(
                'rounded-full bg-white mx-1',
                card.cardId === selectedCard?.cardId ? 'opacity-90' : 'opacity-10',
                { height: 6, width: 6 },
              )}
            />
          ))}
      </View>

      {/* Buttons */}
      <View style={tw`flex-row items-center justify-center self-center pt-3 pb-4 w-90`}>
        <Button
          containerStyle={tw`flex-1 mr-1`}
          onPress={() => navigation.navigate('Card Info', { cardId: selectedCard?.cardId })}
          small
          theme="dark"
        >
          <EyeIcon style={tw`mr-2`} color={tw.color('primary-new')} />
          <Text style={tw`text-base text-white`}>{t('card.showCardInfo')}</Text>
        </Button>

        <Button containerStyle={tw`flex-1 ml-1`} small theme="dark">
          <SnowflakeIcon style={tw`mr-2`} color={tw.color('primary-new')} />
          {!cardsLoading && selectedCard?.isFrozen ? (
            <Text style={tw`text-base text-white`}>{t('card.unfreezeCard')}</Text>
          ) : (
            <Text style={tw`text-base text-white`}>{t('card.freezeCard')}</Text>
          )}
        </Button>
      </View>

      {/* {selectedCard && <Transactions cardId={selectedCard!.cardId} />} */}
    </SafeAreaView>
  );
};

export default WalletScreen;
