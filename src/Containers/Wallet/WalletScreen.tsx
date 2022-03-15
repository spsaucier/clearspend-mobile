import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import tw from '@/Styles/tailwind';
import { Button, ActivityIndicator, CSText, InfoPanel } from '@/Components';
import { Card } from '@/Containers/Wallet/Components/Card';
import Transactions from './Transactions';
import { useUserCards } from '@/Queries';
import { HeaderIcons } from './Components/HeaderIcons';
import { CardDetailsResponse } from '@/generated/capital';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { useAuthentication } from '@/Hooks/useAuthentication';
import useRequireOnboarding from '@/Hooks/useRequireOnboarding';
import LinearGradientWithOpacity from '@/Components/Svg/LinearGradientWithOpacity';
import { AddToWalletButton } from '@/Containers/Wallet/Components/AddToWalletButton';
import { CardOptionsBottomSheet } from '@/Containers/Wallet/CardOptionsBottomSheet';

const { width: screenWidth } = Dimensions.get('screen');

const WalletScreen = () => {
  useRequireOnboarding();
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const cardWidth = 0.95 * screenWidth;
  const [selectedCard, setSelectedCard] = useState<CardDetailsResponse>();
  const cardStatus = selectedCard?.card?.status;
  const isFrozen = cardStatus === 'INACTIVE';
  const { logout } = useAuthentication();
  const balanceInfoPanelRef = useRef<BottomSheetModal>(null);
  const cardOptionsPanelRef = useRef<BottomSheetModal>(null);
  const onCardBalanceInfoPress = () => {
    balanceInfoPanelRef.current?.present();
  };
  const onCardOptionsPress = () => {
    cardOptionsPanelRef.current?.present();
  };
  const {
    data: allCardsData,
    isLoading: cardsLoading,
    refetch: refetchCards,
    error: cardsError,
  } = useUserCards();

  const activeCards = useMemo(
    () =>
      allCardsData?.filter(
        (cardDetails) =>
          !(
            cardDetails.card.status === 'CANCELLED' ||
            (cardDetails.card.type === 'PHYSICAL' && cardDetails.card.activated === false)
          ),
      ) ?? [],
    [allCardsData],
  );

  useEffect(() => {
    if (activeCards.length) {
      if (!selectedCard) {
        const [first] = activeCards;
        setSelectedCard(first);
      } else {
        const card = activeCards.find((x) => x.card.cardId === selectedCard?.card?.cardId);
        setSelectedCard(card);
      }
    }
  }, [activeCards, selectedCard]);

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
        <View style={{ marginTop: 10 }}>
          <Button onPress={logout} small>
            {t('profile.profileMenu.logOut')}
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (!activeCards || activeCards.length === 0) {
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
          style={tw.style('h-1/6 w-90 w-full absolute bottom-0 justify-center items-center -z-10')}
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
        <SafeAreaView style={tw`bg-secondary-light w-full z-10 h-20`} edges={['bottom']} />
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
          data={activeCards}
          layout="default"
          sliderWidth={screenWidth}
          itemWidth={cardWidth}
          inactiveSlideScale={1}
          extraData={activeCards}
          inactiveSlideOpacity={0.1}
          removeClippedSubviews={false}
          lockScrollWhileSnapping
          onSnapToItem={(index: any) => setSelectedCard(activeCards[index])}
          renderItem={({ item }: any) => {
            const { card, availableBalance, allocationName } = item;
            if (card) {
              const { cardId, lastFour, cardLine3, type } = card;

              const isVirtual = type === 'VIRTUAL';

              const { amount } = availableBalance;

              return (
                <View style={[tw`p-2`, { width: cardWidth }]} key={cardId}>
                  <Card
                    key={cardId}
                    cardId={cardId}
                    balance={amount}
                    isFrozen={isFrozen}
                    isVirtual={isVirtual}
                    lastDigits={lastFour || ''}
                    cardTitle={cardLine3}
                    allocation={allocationName}
                    onPress={() => {
                      if (isFrozen) {
                        Toast.show({
                          type: 'success',
                          text1: t('toasts.cantAccessCardScreenIfFrozenToast'),
                        });
                      } else {
                        navigate(MainScreens.CardDetails, { cardId });
                      }
                    }}
                    onCardBalanceInfoPress={onCardBalanceInfoPress}
                    onCardOptionsPress={onCardOptionsPress}
                  />
                </View>
              );
            }
            return null;
          }}
        />
      </View>

      {/* Slider dots */}
      <View style={tw`flex-row justify-center my-1`}>
        {activeCards.length > 1 &&
          activeCards.map(({ card }) => {
            const cardId = card?.cardId;
            const selected = cardId === selectedCard?.card?.cardId;

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

      <AddToWalletButton hide />

      {selectedCard?.card?.cardId && <Transactions cardId={selectedCard?.card?.cardId} />}

      <LinearGradientWithOpacity style={tw`h-20 w-full absolute bottom-0`} />
      <InfoPanel
        ref={balanceInfoPanelRef}
        title={t('cardProfile.availableToSpendMeans')}
        description={t('cardProfile.availableToSpendMeansDescription')}
        okButtonText={t('cardProfile.okGotIt')}
      />
      <CardOptionsBottomSheet ref={cardOptionsPanelRef} cardId={selectedCard?.card?.cardId} />
    </SafeAreaView>
  );
};

export default WalletScreen;
