import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  NativeModules,
  Platform,
  LayoutChangeEvent,
  AppState,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useQueryClient } from 'react-query';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/core';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import tw from '@/Styles/tailwind';
import { Button, ActivityIndicator, CSText, InfoPanel, AnimatedCSText } from '@/Components';
import { Card } from '@/Containers/Wallet/Components/Card';
import Transactions from './Transactions';
import { useUser, useUserCards } from '@/Queries';
import { HeaderIcons } from './Components/HeaderIcons';
import { CardDetailsResponse } from '@/generated/capital';
import { MainScreens, MainStackParamTypes } from '@/Navigators/NavigatorTypes';
import { useAuthentication } from '@/Hooks/useAuthentication';
import LinearGradientWithOpacity from '@/Components/Svg/LinearGradientWithOpacity';
import { AddToWalletButton } from '@/Containers/Wallet/Components/AddToWalletButton';
import { CardOptionsBottomSheet } from '@/Containers/Wallet/CardOptionsBottomSheet';
import { invalidateTransactions } from '@/Queries/transaction';
import { ArrowUpIcon } from '@/Components/Icons';
import {
  AppleWallet,
  CardDigitalWalletStates,
  checkCardDigitalWalletStates,
  WalletEventEmitter,
} from '@/NativeModules/AppleWallet/AppleWallet';
import { Session } from '@/Store/Session';
import { lightFeedback } from '@/Helpers/HapticFeedback';
import useRequireUserAction from '@/Hooks/useRequireUserAction';

const { width: screenWidth, height: screenHeight, scale } = Dimensions.get('screen');
const { height: windowHeight } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;
const CARD_SCALE_CONSTANT = 0.88;

type WalletScreenNavigationProps = NativeStackScreenProps<MainStackParamTypes, MainScreens.Wallet>;
type WalletScreenRouteProp = WalletScreenNavigationProps['route'];

const LoadingWallet = () => (
  <View style={tw`flex-1 justify-center items-center bg-secondary`}>
    <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
    <ActivityIndicator />
  </View>
);

const LoadingError = ({ cardsError, refetchCards }: any) => {
  const { t } = useTranslation();
  const { logout } = useAuthentication();
  return (
    <View style={tw`flex-1 justify-center items-center bg-secondary p-6`}>
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
    </View>
  );
};

const EmptyWallet = () => {
  const { t } = useTranslation();
  return (
    <View style={tw`flex-1 justify-center items-center bg-secondary`}>
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
    </View>
  );
};

const ContentWallet = ({
  activeCards,
  cardDigitalWalletStates,
  headerIconsHeight,
}: {
  activeCards: CardDetailsResponse[];
  cardDigitalWalletStates: CardDigitalWalletStates;
  headerIconsHeight: number;
}) => {
  const { navigate, setParams } = useNavigation();
  const route = useRoute<WalletScreenRouteProp>();
  const { params } = route;
  const { t } = useTranslation();
  const accessToken = useSelector((state: { session: Session }) => state.session.accessToken);

  const { data: user } = useUser();
  const [selectedCard, setSelectedCard] = useState<CardDetailsResponse>();
  const [carouselHeight, setCarouselHeight] = useState<number>();

  const carouselRef = useRef<ICarouselInstance>(null);
  const balanceInfoPanelRef = useRef<BottomSheetModal>(null);
  const cardOptionsPanelRef = useRef<BottomSheetModal>(null);

  const initialCardDisplayIndex = activeCards.findIndex(
    (card) => card.card.cardId === params?.initialFocusedCardId,
  );

  const onCardBalanceInfoPress = () => {
    balanceInfoPanelRef.current?.present();
  };

  const onCardOptionsPress = () => {
    cardOptionsPanelRef.current?.present();
  };

  useEffect(() => {
    if (activeCards.length) {
      if (initialCardDisplayIndex !== -1) {
        // if there is an initial index to display, scroll to it,
        // update the selected card and clear the relevant navigation param
        setSelectedCard(activeCards[initialCardDisplayIndex]);
        const currentIdx = carouselRef?.current?.getCurrentIndex() ?? 0;
        carouselRef?.current?.scrollTo({
          count: initialCardDisplayIndex - currentIdx,
          animated: true,
        });
        setParams({ initialFocusedCardId: undefined });
      } else if (!selectedCard) {
        const [first] = activeCards;
        setSelectedCard(first);
      } else {
        const card = activeCards.find((x: any) => x.card.cardId === selectedCard?.card?.cardId);
        setSelectedCard(card);
      }
    }
  }, [activeCards, initialCardDisplayIndex, selectedCard, setParams]);

  const selectedCardId = selectedCard?.card?.cardId;
  const selectedCardFrozen = selectedCard?.card?.status === 'INACTIVE';

  /*
    On older Android devices `windowHeight` includes the status bar height

    screenHeight - windowHeight = 0 (iOS)
    screenHeight - windowHeight = bottom nav height (Android new)
    screenHeight - windowHeight - statusBarHeight = bottom nav height (Android old)
  */

  let bottomNav = screenHeight - windowHeight;

  // assume that if the value returned for bottom nav
  // is larger than twice the status bar height then
  // it's probably not including the status bar e.g. it's old
  if (bottomNav > 2 * STATUSBAR_HEIGHT) {
    bottomNav -= STATUSBAR_HEIGHT;
  }

  const initialSnapPoint =
    screenHeight - bottomNav - STATUSBAR_HEIGHT - headerIconsHeight - (carouselHeight || 0);

  return (
    <View style={tw`flex-1`}>
      <View onLayout={(e) => setCarouselHeight(e.nativeEvent.layout.height)}>
        <Carousel
          data={activeCards}
          ref={carouselRef}
          width={screenWidth}
          mode="parallax"
          loop={false}
          height={screenWidth / 1.6}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          modeConfig={{
            parallaxScrollingScale: CARD_SCALE_CONSTANT,
            parallaxScrollingOffset: 50,
          }}
          onSnapToItem={(index: any) => setSelectedCard(activeCards[index])}
          renderItem={({ item }: any) => {
            const { card, availableBalance, allocationName } = item;
            const { cardId, lastFour, cardLine3, type } = card;
            const isVirtual = type === 'VIRTUAL';
            const { amount } = availableBalance;

            const cardStatus = card?.status;
            const isFrozen = cardStatus === 'INACTIVE';

            return (
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
            );
          }}
        />
        {/* Slider dots */}
        <View style={tw`flex-row justify-center pb-5`}>
          {activeCards.length > 1 &&
            activeCards.map(({ card }: any) => {
              const cardId = card?.cardId;
              const selected = cardId === selectedCardId;

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

        <AddToWalletButton
          isVisible={
            Platform.OS === 'ios' &&
            cardDigitalWalletStates.some(
              (cardState) =>
                cardState.lastFour === selectedCard?.card?.lastFour && cardState.canAddPass,
            )
          }
          style={tw.style('mb-5 h-12', { width: screenWidth * CARD_SCALE_CONSTANT })}
          onPress={() => {
            if (Platform.OS === 'ios' && user && selectedCardId && selectedCard?.card?.lastFour) {
              AppleWallet.beginPushProvisioning(
                {
                  withName: `${user?.firstName} ${user?.lastName}`,
                  description: t('card.appleWalletDescription'),
                  last4: selectedCard?.card?.lastFour,
                },
                accessToken ?? '',
                selectedCardId,
              );
            }
            // GooglePay.test('name', 'description');
          }}
        />
      </View>

      {selectedCardId && carouselHeight ? (
        <Transactions cardId={selectedCardId} initialSnapPoint={initialSnapPoint} />
      ) : null}

      <LinearGradientWithOpacity style={tw`h-20 w-full absolute bottom-0`} />
      <InfoPanel
        ref={balanceInfoPanelRef}
        title={t('cardProfile.availableToSpendMeans')}
        description={t('cardProfile.availableToSpendMeansDescription')}
        okButtonText={t('cardProfile.okGotIt')}
      />
      <CardOptionsBottomSheet
        ref={cardOptionsPanelRef}
        cardId={selectedCardId}
        isCardFrozen={selectedCardFrozen}
      />
    </View>
  );
};

const WalletScreen = () => {
  useRequireUserAction();

  const { t } = useTranslation();
  const appState = useRef(AppState.currentState);

  const [headerIconsHeight, setHeaderIconsHeight] = useState<number>();
  const [cardDigitalWalletStates, setCardDigitalWalletStates] = useState<CardDigitalWalletStates>(
    [],
  );

  const translationYSV = useSharedValue(0);
  const pullToRefreshThreshold = screenHeight * (0.45 / scale);
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
    // Check digital wallet state of all cards
    if (activeCards.length > 0) {
      (async () => {
        const state = await checkCardDigitalWalletStates(activeCards);
        setCardDigitalWalletStates(state);
      })();
    }
  }, [activeCards]);

  useEffect(() => {
    // Recheck the digital wallet state of all cards when the app is returning from the background
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        (async () => {
          const state = await checkCardDigitalWalletStates(activeCards);
          setCardDigitalWalletStates(state);
        })();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [activeCards]);

  useEffect(() => {
    // Recheck the digital wallet state of all cards when a card is successfully added to the wallet
    const successSubscription = WalletEventEmitter.addListener('onProvisionSuccess', () => {
      (async () => {
        const state = await checkCardDigitalWalletStates(activeCards);
        setCardDigitalWalletStates(state);
        Toast.show({ text1: 'The card was added to the wallet successfully' });
      })();
    });
    const failureSubscription = WalletEventEmitter.addListener('onProvisionFailure', () => {
      Toast.show({ text1: 'There was an error adding the card to the wallet', type: 'error' });
    });

    return () => {
      successSubscription.remove();
      failureSubscription.remove();
    };
  }, [activeCards]);

  useEffect(() => {
    if (!isRefetching) {
      translationYSV.value = withTiming(0);
    } else {
      // invalidate sub queries
      invalidateTransactions(queryClient);
    }
  }, [isRefetching, translationYSV, queryClient]);

  const handler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number; hapticTriggered: boolean }) => {
      ctx.startY = translationYSV.value;
      ctx.hapticTriggered = false;
    },
    onActive: (event, ctx) => {
      if (event.translationY < 0) return;
      if (event.translationY > pullToRefreshThreshold) return;

      if (event.translationY > pullToRefreshThreshold / 2 && !ctx.hapticTriggered) {
        ctx.hapticTriggered = true;
        runOnJS(lightFeedback)();
      }
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

  const showError = !cardsLoading && cardsError;
  const showCardsEmpty = !cardsLoading && !cardsError && (!activeCards || activeCards.length === 0);
  const showContent = !showError && !cardsLoading && !cardsError && !showCardsEmpty;

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
        <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" translucent />
        <HeaderIcons
          onLayout={(e: LayoutChangeEvent) => setHeaderIconsHeight(e.nativeEvent.layout.height)}
        />
        <View style={tw`flex-1`}>
          {cardsLoading && <LoadingWallet />}
          {showError && <LoadingError cardsError={cardsError} refetchCards={refetchCards} />}
          {(showContent || showCardsEmpty) && (
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
              <View style={[tw`flex-1 absolute h-full w-full`]}>
                <PanGestureHandler
                  onGestureEvent={handler}
                  activeOffsetY={25}
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
                        cardDigitalWalletStates={cardDigitalWalletStates}
                        headerIconsHeight={headerIconsHeight || 0}
                      />
                    )}
                  </Animated.View>
                </PanGestureHandler>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default WalletScreen;
