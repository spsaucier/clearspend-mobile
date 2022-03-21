import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  NativeModules,
  Platform,
  LayoutChangeEvent,
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
import Carousel from 'react-native-reanimated-carousel';

import { useSelector } from 'react-redux';
import tw from '@/Styles/tailwind';
import { Button, ActivityIndicator, CSText, InfoPanel, AnimatedCSText } from '@/Components';
import { Card } from '@/Containers/Wallet/Components/Card';
import Transactions from './Transactions';
import { useUser, useUserCards } from '@/Queries';
import { HeaderIcons } from './Components/HeaderIcons';
import { CardDetailsResponse } from '@/generated/capital';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { useAuthentication } from '@/Hooks/useAuthentication';
import useRequireOnboarding from '@/Hooks/useRequireOnboarding';
import LinearGradientWithOpacity from '@/Components/Svg/LinearGradientWithOpacity';
import { AddToWalletButton } from '@/Containers/Wallet/Components/AddToWalletButton';
import { CardOptionsBottomSheet } from '@/Containers/Wallet/CardOptionsBottomSheet';
import { invalidateTransactions } from '@/Queries/transaction';
import { ArrowUpIcon } from '@/Components/Icons';
import { AppleWallet } from '@/NativeModules/AppleWallet/AppleWallet';
import { Session } from '@/Store/Session';
import { lightFeedback } from '@/Helpers/HapticFeedback';

const { width: screenWidth, height: screenHeight, scale } = Dimensions.get('screen');
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

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
  headerIconsHeight,
}: {
  activeCards: any[];
  headerIconsHeight: number;
}) => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const { data: user } = useUser();
  const [selectedCard, setSelectedCard] = useState<CardDetailsResponse>();
  const balanceInfoPanelRef = useRef<BottomSheetModal>(null);
  const cardOptionsPanelRef = useRef<BottomSheetModal>(null);
  const [carouselHeight, setCarouselHeight] = useState<number>();

  const accessToken = useSelector((state: { session: Session }) => state.session.accessToken);

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

  const cardStatus = selectedCard?.card?.status;
  const isFrozen = cardStatus === 'INACTIVE';

  const initialSnapPoint =
    screenHeight -
    STATUSBAR_HEIGHT * scale -
    StatusBar.currentHeight! -
    headerIconsHeight -
    (carouselHeight || 0) -
    8 * scale;

  return (
    <View style={tw`flex-1`}>
      <View onLayout={(e) => setCarouselHeight(e.nativeEvent.layout.height)}>
        <Carousel
          data={activeCards}
          width={screenWidth}
          mode="parallax"
          loop={false}
          height={screenWidth / 1.6}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          modeConfig={{
            parallaxScrollingScale: 0.88,
            parallaxScrollingOffset: 50,
          }}
          onSnapToItem={(index: any) => setSelectedCard(activeCards[index])}
          renderItem={({ item }: any) => {
            const { card, availableBalance, allocationName } = item;
            const { cardId, lastFour, cardLine3, type } = card;
            const isVirtual = type === 'VIRTUAL';
            const { amount } = availableBalance;

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

        <AddToWalletButton
          hide={Platform.OS !== 'ios'}
          onPress={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            if (
              Platform.OS === 'ios' &&
              user &&
              selectedCard?.card?.cardId &&
              selectedCard?.card?.lastFour
            ) {
              AppleWallet.beginPushProvisioning(
                // TODO what values?
                {
                  withName: `${user?.firstName} ${user?.lastName}`,
                  description: 'ClearSpend Card',
                  last4: selectedCard?.card?.lastFour,
                },
                accessToken ?? '',
                selectedCard?.card?.cardId,
              );
            }
            // GooglePay.test('name', 'description');
          }}
        />
      </View>

      {selectedCard?.card?.cardId && carouselHeight && (
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

  const [headerIconsHeight, setHeaderIconsHeight] = useState<number>();
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
