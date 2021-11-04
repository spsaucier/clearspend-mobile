import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ListRenderItemInfo } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import Carousel from 'react-native-snap-carousel';
import tw from '@/Styles/tailwind';
import { NotificationBell, Button, FocusAwareStatusBar, ActivityIndicator } from '@/Components';
import { EyeIcon } from '@/Components/Icons/eyeIcon';
import { SnowflakeIcon } from '@/Components/Icons/snowflakeIcon';
import { Card, CardType } from '@/Containers/Wallet/Components/Card';
import { ProfileIcon } from '@/Components/Icons';
import Transactions from './Transactions';

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

const { width: screenWidth } = Dimensions.get('screen');

const WalletScreen = ({ navigation }: { navigation: any }) => {
  const [selectedCard, setSelectedCard] = useState<any>();

  const { t } = useTranslation();

  const {
    data: cardsData,
    loading: cardsLoading,
    refetch: refetchCards,
    error: cardsError,
  } = useQuery(CARDS_QUERY);

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
          onSnapToItem={(index: any) => setSelectedCard(cardsData.cards[index])}
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
                onPress={() => navigation.navigate('Card Details', { cardId: item.cardId })}
              />
            </View>
          )}
        />
      </View>

      {/* Button Row */}
      <View style={tw`flex-row items-center justify-center pt-3 pb-4 px-9`}>
        <Button
          containerStyle={tw`flex-1`}
          onPress={() => navigation.navigate('Card Info', { cardId: selectedCard?.cardId })}
          small
        >
          <EyeIcon style={tw`mr-1`} />
          <Text style={tw`text-base font-bold text-primary`}>{t('card.showCardInfo')}</Text>
        </Button>
        <View style={tw`w-3 h-3`} />
        <Button containerStyle={tw`flex-1`} small>
          <SnowflakeIcon style={tw`mr-1`} />
          {!cardsLoading && selectedCard?.isFrozen ? (
            <Text style={tw`text-base font-bold text-primary`}>{t('card.unfreezeCard')}</Text>
          ) : (
            <Text style={tw`text-base font-bold text-primary`}>{t('card.freezeCard')}</Text>
          )}
        </Button>
      </View>

      {/* TODO Slider dots */}

      {selectedCard && <Transactions cardId={selectedCard!.cardId} />}
    </SafeAreaView>
  );
};

export default WalletScreen;
