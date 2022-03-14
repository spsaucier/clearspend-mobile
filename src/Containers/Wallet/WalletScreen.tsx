import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  Platform,
  NativeModules,
  LayoutChangeEvent,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQueryClient } from 'react-query';

import tw from '@/Styles/tailwind';
import { Button, ActivityIndicator, CSText, InfoPanel, AnimatedCSText } from '@/Components';
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
import { ArrowUpIcon } from '@/Components/Icons';
import { invalidateTransactions } from '@/Queries/transaction';

const { width: screenWidth, height: screenHeight, scale } = Dimensions.get('screen');
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const LoadingWallet = () => (
  <View style={tw`flex-1 items-center justify-center`}>
    <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
    <ActivityIndicator />
  </View>
);

const ErrorWallet = ({ cardsError, refetchCards }: any) => {
  const { logout } = useAuthentication();
  const { t } = useTranslation();
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <CSText style={tw`text-base text-white mb-4`}>{cardsError?.message}</CSText>
      <Button onPress={refetchCards} small>
        {t('general.reload')}
      </Button>
      <View style={{ marginTop: 10 }}>
        <Button onPress={logout} small>
          {t('profile.profileMenu.logOut')}
        </Button>
      </View>
    </View>
  );
};

const EmptyWallet = () => {
  const { t } = useTranslation();

  return (
    <View style={tw`flex-1`}>
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
    </View>
  );
};

const ContentWallet = ({
  activeCards,
  headerIconsHeight,
}: {
  activeCards: any[];
  headerIconsHeight: number;
}) => {
  const [selectedCard, setSelectedCard] = useState<CardDetailsResponse>();
  const cardStatus = selectedCard?.card?.status;
  const isFrozen = cardStatus === 'INACTIVE';

  const cardWidth = 0.95 * screenWidth;
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const balanceInfoPanelRef = useRef<BottomSheetModal>(null);
  const cardOptionsPanelRef = useRef<BottomSheetModal>(null);

  const onCardBalanceInfoPress = () => {
    balanceInfoPanelRef.current?.present();
  };
  const onCardOptionsPress = () => {
    cardOptionsPanelRef.current?.present();
  };

  useEffect(() => {
    if (activeCards.length) {
      if (!selectedCard) {
        const [first] = activeCards;
        setSelectedCard(first);
      } else {
        const card = activeCards.find((x: any) => x.card.cardId === selectedCard?.card?.cardId);
        setSelectedCard(card);
      }
    }
  }, [activeCards, selectedCard]);

  const showAddToWalletBtn = true && Platform.OS === 'ios';

  // transaction bottom sheet initialSnapPoint value takes into account:
  // + statusbar height (plus additional for android)
  // + header icons height * device scale
  // + carousel height can roughly inferred by screen width (which includes margins/paddings)
  //    divided by 1.6 (see Card component)
  // + estimate slider dots height * device scale
  let initialSnapPoint =
    screenHeight -
    (STATUSBAR_HEIGHT +
      (StatusBar.currentHeight || 0) +
      headerIconsHeight * scale +
      screenWidth / 1.6 +
      10 * scale);

  // if Add To Wallet btn is present, push the transaction bottom sheet little bit down
  if (showAddToWalletBtn) {
    initialSnapPoint -= 20 * scale; // improve this estimation
  }

  return (
    <View style={tw`flex-1`}>
      <View>
        <Carousel
          data={activeCards}
          layout="default"
          sliderWidth={screenWidth}
          itemWidth={cardWidth}
          inactiveSlideScale={1}
          extraData={activeCards}
          inactiveSlideOpacity={1.0}
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
                    onPress={() => navigate(MainScreens.CardDetails, { cardId })}
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

      <View style={tw`flex-row justify-center my-1`}>
        {activeCards.length > 1 &&
          activeCards.map(({ card }: any) => {
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

      <AddToWalletButton show={showAddToWalletBtn} />

      {selectedCard?.card?.cardId && (
        <Transactions cardId={selectedCard?.card?.cardId} initialSnapPoint={initialSnapPoint} />
      )}

      <LinearGradientWithOpacity style={tw`h-20 w-full absolute bottom-0`} />
      <InfoPanel
        ref={balanceInfoPanelRef}
        title={t('cardProfile.availableToSpendMeans')}
        description={t('cardProfile.availableToSpendMeansDescription')}
        okButtonText={t('cardProfile.okGotIt')}
      />
      <CardOptionsBottomSheet ref={cardOptionsPanelRef} cardId={selectedCard?.card?.cardId} />
    </View>
  );
};

const WalletScreen = () => {
  useRequireOnboarding();
  const { t } = useTranslation();
  const [headerIconsHeight, setHeaderIconsHeight] = useState<number>(0);
  const translationYSV = useSharedValue(0);
  const pullToRefreshThreshold = screenHeight * 0.15;
  const queryClient = useQueryClient();

  const {
    data: allCardsData,
    isLoading: cardsLoading,
    isRefetching,
    refetch: refetchCards,
    error: cardsError,
  } = useUserCards();

  const activeCards = useMemo(
    () =>
      allCardsData?.filter((cardDetails) => {
        if (
          cardDetails.card.status === 'CANCELLED' ||
          (cardDetails.card.type === 'PHYSICAL' && cardDetails.card.activated === false)
        ) {
          return false;
        }
        return true;
      }) ?? [],
    [allCardsData],
  );

  const handler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number; startedAt: number }) => {
      ctx.startY = translationYSV.value;
      ctx.startedAt = Date.now();
    },
    onActive: (event, ctx) => {
      if (event.translationY < 0) return;
      if (event.translationY > pullToRefreshThreshold) return;
      translationYSV.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const halfThreshold = pullToRefreshThreshold * 0.5;
      if (event.translationY > halfThreshold) {
        translationYSV.value = withTiming(halfThreshold, { easing: Easing.linear });
      } else translationYSV.value = withTiming(0, { easing: Easing.linear });
    },
  });

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translationYSV.value,
      },
    ],
  }));

  const pullToRefreshTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translationYSV.value, [0, pullToRefreshThreshold / 2], [0, 1]),
  }));

  const arrowRotateAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationYSV.value,
      [0, pullToRefreshThreshold / 2],
      [0, 180],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
      opacity: interpolate(translationYSV.value, [0, pullToRefreshThreshold / 2], [0, 1]),
    };
  });

  useEffect(() => {
    if (!isRefetching) {
      translationYSV.value = withTiming(0);
    } else {
      // invalidate sub queries
      invalidateTransactions(queryClient);
    }
  }, [isRefetching, translationYSV, queryClient]);

  const showError = !cardsLoading && cardsError;
  const showCardsEmpty = !cardsLoading && !cardsError && (!activeCards || activeCards.length === 0);
  const showContent = !cardsLoading && !cardsError && !showCardsEmpty;

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
      <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" translucent />
      <HeaderIcons
        onLayout={(e: LayoutChangeEvent) => {
          setHeaderIconsHeight(e.nativeEvent.layout.height);
        }}
      />
      <View style={tw`flex-1`}>
        {cardsLoading && <LoadingWallet />}
        {showError && <ErrorWallet cardsError={cardsError} refetchCards={refetchCards} />}

        {showCardsEmpty ||
          (showContent && (
            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center h-20 justify-center`}>
                <Animated.View style={arrowRotateAnimatedStyle}>
                  {isRefetching ? (
                    <ActivityIndicator style={{ width: 24, height: 24 }} />
                  ) : (
                    <ArrowUpIcon />
                  )}
                </Animated.View>
                <AnimatedCSText
                  style={[tw`text-white ml-2 opacity-0`, pullToRefreshTextAnimatedStyle]}
                >
                  {t('wallet.refreshCardAndTransactions')}
                </AnimatedCSText>
              </View>
              <View style={[tw`flex-1 absolute h-full`]}>
                <PanGestureHandler
                  onGestureEvent={handler}
                  activeOffsetY={50}
                  onEnded={() => {
                    if (translationYSV.value > pullToRefreshThreshold / 2) {
                      refetchCards();
                    }
                  }}
                >
                  <Animated.View style={[tw`flex-1`, containerAnimatedStyle]}>
                    {showCardsEmpty && <EmptyWallet />}
                    {showContent && (
                      <ContentWallet
                        activeCards={activeCards}
                        headerIconsHeight={headerIconsHeight}
                      />
                    )}
                  </Animated.View>
                </PanGestureHandler>
              </View>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
