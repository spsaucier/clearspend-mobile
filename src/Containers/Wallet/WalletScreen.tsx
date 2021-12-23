import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import Carousel from 'react-native-snap-carousel';
import tw from '@/Styles/tailwind';
import { NotificationBell, Button, ActivityIndicator, CSText } from '@/Components';
import { SnowflakeIcon, ProfileIcon, EyeIcon } from '@/Components/Icons';
import { Card } from '@/Containers/Wallet/Components/Card';
import Transactions from './Transactions';
import { useFreezeCard } from '@/Hooks';
import { USER_CARDS_QUERY } from '@/Queries';

const { width: screenWidth } = Dimensions.get('screen');

const WalletScreen = ({ navigation }: { navigation: any }) => {
  const cardWidth = 0.95 * screenWidth;
  const [selectedCard, setSelectedCard] = useState<any>();
  const cardStatus = selectedCard?.card.status;
  const isFrozen = cardStatus === 'BLOCKED';

  const { t } = useTranslation();

  const {
    data: cardsData,
    loading: cardsLoading,
    refetch: refetchCards,
    error: cardsError,
  } = useQuery(USER_CARDS_QUERY, { fetchPolicy: 'cache-first' });

  const {
    freeze,
    unfreeze,
    loading: freezingOrUnfreezing,
  } = useFreezeCard({
    cardId: selectedCard?.card.cardId,
  });

  useEffect(() => {
    if (cardsData?.cards.length) {
      if (!selectedCard) {
        const [first] = cardsData.cards;
        setSelectedCard(first);
      } else {
        const card = cardsData.cards.find((x: any) => x.card.cardId === selectedCard?.card.cardId);
        setSelectedCard(card);
      }
    }
  }, [cardsData]);

  const HeaderIcons = () => (
    <View style={tw`w-full flex-row items-center justify-end my-3 mr-9`}>
      <View style={tw`flex-row`}>
        <NotificationBell onPress={() => navigation.navigate('Notifications')} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <ProfileIcon color={tw.color('white')} style={tw`ml-3`} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
  if (cardsLoading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-secondary`}>
        <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (cardsError) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-secondary p-6`}>
        <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
        <CSText style={tw`text-base text-white mb-4`}>{cardsError?.message}</CSText>
        <Button
          onPress={() => {
            refetchCards();
          }}
          small
        >
          {t('general.reload')}
        </Button>
      </SafeAreaView>
    );
  }

  if (!cardsData.cards || cardsData.cards.length === 0) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-secondary`} edges={['top']}>
        <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
        <HeaderIcons />
        <View style={tw`flex-1 justify-center items-center`}>
          <CSText style={tw`text-white text-lg text-center mb-5`}>{t('wallet.empty.title')}</CSText>
          <CSText style={tw`text-white text-base text-center w-70`}>
            {t('wallet.empty.subTitle')}
          </CSText>
        </View>
        <View
          style={tw.style('h-1/4 w-90 w-full absolute bottom-0 justify-center items-center -z-10')}
        >
          <Card
            style={tw.style('w-9/10 ml-3', { transform: [{ rotateZ: '-10deg' }] })}
            isVirtual={false}
            isFrozen={false}
            balance={0}
            lastDigits="1234"
            cardId="1234"
            cardTitle="John Smith"
          />
        </View>
        <SafeAreaView
          style={tw`shadow-xl bg-secondary-light h-1/5 w-full z-10`}
          edges={['bottom']}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
      <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" translucent />
      <HeaderIcons />

      {/* Card Carousel w. buttons */}
      <View>
        <Carousel
          // ref={(c) => { _carousel = c; }}
          data={cardsData.cards}
          layout="default"
          sliderWidth={screenWidth}
          itemWidth={cardWidth}
          inactiveSlideScale={1}
          extraData={cardsData.cards}
          inactiveSlideOpacity={0.1}
          removeClippedSubviews={false}
          lockScrollWhileSnapping
          onSnapToItem={(index: any) => setSelectedCard(cardsData.cards[index])}
          renderItem={({ item }: any) => {
            const { card, availableBalance, allocationName } = item;
            const { cardId, lastFour, cardLine3, type } = card;

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
                  lastDigits={lastFour}
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

        <Button
          containerStyle={tw.style('flex-1 ml-1', isFrozen && 'bg-white')}
          small
          disabled={freezingOrUnfreezing}
          theme="dark"
          onPress={() => {
            if (!isFrozen) freeze();
            else unfreeze();
          }}
        >
          {freezingOrUnfreezing ? (
            <ActivityIndicator style={tw`h-5 w-5`} />
          ) : (
            <View style={tw`flex-row`}>
              <SnowflakeIcon
                style={tw`mr-2`}
                color={isFrozen ? tw.color('black') : tw.color('primary')}
              />
              {!cardsLoading && isFrozen ? (
                <CSText style={tw`text-base text-black`}>{t('card.unfreezeCard')}</CSText>
              ) : (
                <CSText style={tw`text-base text-white`}>{t('card.freezeCard')}</CSText>
              )}
            </View>
          )}
        </Button>
      </View>

      {selectedCard?.card && <Transactions cardId={selectedCard?.card.cardId} />}
    </SafeAreaView>
  );
};

export default WalletScreen;
