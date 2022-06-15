import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Dimensions, StatusBar, LayoutChangeEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, useRoute } from '@react-navigation/core';

import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import {
  WalletScreens,
  WalletStackParamTypes,
  WalletStackProps,
} from '@/Navigators/Wallet/WalletNavigatorTypes';

import tw from '@/Styles/tailwind';
import { Button, ActivityIndicator, CSText, InfoPanel, AnimatedCSText } from '@/Components';
import { Card } from '@/Containers/Wallet/Components/Card';
import { useUser, useUserCards } from '@/Queries';
import { HeaderIcons } from './Components/HeaderIcons';
import { CardDetailsResponse, User } from '@/generated/capital';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { CardOptionsBottomSheet } from '@/Containers/Wallet/CardOptionsBottomSheet';
import { invalidateTransactions } from '@/Queries/transaction';
import { ArrowUpIcon } from '@/Components/Icons';
import { lightFeedback } from '@/Helpers/HapticFeedback';
import { TransactionsContainer } from '@/Containers/Wallet/TransactionsContainer';
import { AddToDigitalWalletButton } from '@/Containers/Wallet/Components/AddToDigitalWalletButton';
import { invalidateCardQueries, useEmployeeCards } from '@/Queries/card';
import { AdminScreens, AdminStackParamTypes } from '@/Navigators/Admin/AdminNavigatorTypes';
import { formatUserName } from '@/Helpers/UserNameHelper';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import { getNormalizedSnapPoint } from '@/Helpers/LayoutHelpers';
import FadeOutGradient from '@/Components/FadeOutGradient';

const { width: screenWidth, height: screenHeight, scale } = Dimensions.get('screen');
const pullToRefreshThreshold = screenHeight * (0.45 / scale);
const CARD_SCALE_CONSTANT = 0.88;

type WalletScreenNavigationProps = NativeStackScreenProps<
  WalletStackParamTypes,
  WalletScreens.Home
>;
type WalletScreenRouteProp = WalletScreenNavigationProps['route'];

const LoadingWallet = () => (
  <View style={tw`flex-1 justify-center items-center bg-secondary`}>
    <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
    <ActivityIndicator />
  </View>
);

const LoadingError = ({ cardsError, refetchCards, isEmployeeWallet }: any) => {
  const { t } = useTranslation();
  const { logout } = useAuthentication();
  return (
    <View style={tw`flex-1 justify-center items-center bg-secondary p-6`}>
      <CSText style={tw`text-base text-white mb-4`}>
        {cardsError?.message || t('error.generic')}
      </CSText>
      <Button
        onPress={() => {
          refetchCards();
        }}
        small
      >
        {t('general.reload')}
      </Button>
      <View style={{ marginTop: 10 }}>
        {!isEmployeeWallet ? (
          <Button onPress={logout} small>
            {t('profile.profileMenu.logOut')}
          </Button>
        ) : null}
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
  isRefetching,
  cardsLoading,
  activeCards,
  headerIconsHeight,
  isEmployeeWallet,
  employee,
}: {
  isRefetching: boolean;
  cardsLoading: boolean;
  activeCards: CardDetailsResponse[];
  headerIconsHeight: number;
  isEmployeeWallet: boolean;
  employee: User;
}) => {
  const { navigate, setParams } = useNavigation<WalletStackProps>();
  const route = useRoute<WalletScreenRouteProp>();
  const { params } = route;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { data: user } = useUser();
  const [selectedCard, setSelectedCard] = useState<CardDetailsResponse>();
  const [isScrolling, setIsScrolling] = useState(false);
  const [carouselHeight, setCarouselHeight] = useState<number>();
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [nextIndex, setNextIndex] = useState<number>();

  const carouselRef = useRef<ICarouselInstance>(null);
  const balanceInfoPanelRef = useRef<BottomSheetModal>(null);
  const cardOptionsPanelRef = useRef<BottomSheetModal>(null);

  const initialCardDisplayIndex = useMemo(
    () =>
      params?.initialFocusCardIdx !== undefined && params?.initialFocusCardIdx >= 0
        ? params?.initialFocusCardIdx
        : activeCards.findIndex((card) => card.card.cardId === params?.initialFocusedCardId),
    [activeCards, params?.initialFocusCardIdx, params?.initialFocusedCardId],
  );

  const onCardBalanceInfoPress = useCallback(() => {
    balanceInfoPanelRef.current?.present();
  }, []);

  const onCardOptionsPress = useCallback(() => {
    cardOptionsPanelRef.current?.present();
  }, []);

  useEffect(() => {
    if (activeCards.length && !isRefetching && !cardsLoading) {
      if (initialCardDisplayIndex !== -1) {
        // if there is an initial index to display, scroll to it,
        // update the selected card and clear the relevant navigation param
        setSelectedCard(activeCards[initialCardDisplayIndex]);
        carouselRef?.current?.scrollTo({
          index: initialCardDisplayIndex,
          animated: true,
        });
        setParams({ initialFocusedCardId: undefined, initialFocusCardIdx: undefined });
      } else if (!selectedCard) {
        const [first] = activeCards;
        setSelectedCard(first);
      } else {
        const card = activeCards.find((x: any) => x.card.cardId === selectedCard?.card?.cardId);
        setSelectedCard(card);
      }
    }
  }, [activeCards, initialCardDisplayIndex, selectedCard, setParams, isRefetching, cardsLoading]);

  useEffect(() => {
    const idx = carouselRef?.current?.getCurrentIndex() ?? 0;
    if (idx === activeCards.length - 1 && idx !== 0) {
      setNextIndex(idx - 1);
    } else {
      setNextIndex(idx);
    }
  }, [activeCards.length, selectedCard]);

  const { selectedCardId, selectedCardFrozen } = useMemo(
    () => ({
      selectedCardId: selectedCard?.card?.cardId,
      selectedCardFrozen: selectedCard?.card?.status === 'INACTIVE',
    }),
    [selectedCard],
  );

  const initialSnapPoint = useMemo(
    () => getNormalizedSnapPoint() - headerIconsHeight - (carouselHeight || 0) - insets.bottom,
    [carouselHeight, headerIconsHeight, insets.bottom],
  );

  return (
    <View style={tw`flex-1`}>
      <View onLayout={(e) => setCarouselHeight(e.nativeEvent.layout.height)}>
        <Carousel
          data={activeCards}
          testID="walletScreen-cardCarousel"
          ref={carouselRef}
          width={screenWidth}
          onScrollBegin={() => setIsScrolling(true)}
          onScrollEnd={() => setIsScrolling(false)}
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
            const { card, availableBalance, linkedAllocationName } = item;
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
                allocation={linkedAllocationName}
                onCardPress={() => {
                  if (isEmployeeWallet) {
                    return;
                  }

                  if (isFrozen) {
                    Toast.show({
                      type: 'success',
                      text1: t('toasts.cantAccessCardScreenIfFrozenToast'),
                    });
                  } else {
                    navigate(WalletScreens.CardDetails, { cardId });
                  }
                }}
                cardPressDisabled={isEmployeeWallet}
                onCardBalanceInfoPress={onCardBalanceInfoPress}
                onCardOptionsPress={onCardOptionsPress}
              />
            );
          }}
        />
        {/* Slider dots */}
        {activeCards.length > 1 ? (
          <View style={tw`flex-row justify-center pb-5`}>
            {activeCards.map(({ card }: any) => {
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
        ) : null}

        {!isEmployeeWallet ? (
          <AddToDigitalWalletButton
            card={selectedCard?.card}
            cardHolderName={`${user?.firstName} ${user?.lastName}`}
            disabled={isScrolling}
          />
        ) : null}
      </View>

      {selectedCardId ? (
        <>
          <TransactionsContainer
            selectedCardId={selectedCardId}
            initialSnapPoint={initialSnapPoint}
            title={
              isEmployeeWallet
                ? t('wallet.transactions.employeeRecentTransactions', {
                    userFirstName: formatUserName(employee).firstName,
                    interpolation: { escapeValue: false },
                  })
                : undefined
            }
          />
          <FadeOutGradient />
        </>
      ) : null}

      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        style={tw`h-20 w-full absolute bottom-0`}
        pointerEvents="none"
      />
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
        setIsCancelling={setIsCancelling}
        nextIndex={nextIndex}
        hideCardInfoButton={isEmployeeWallet}
      />
      <ActivityOverlay
        visible={isCancelling}
        message={t('card.options.cancelCardAlert.cancelling')}
      />
    </View>
  );
};

const WalletScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<AdminStackParamTypes, AdminScreens.EmployeeWallet>>();
  const queryClient = useQueryClient();

  const [headerIconsHeight, setHeaderIconsHeight] = useState<number>(0);

  const translationYSV = useSharedValue(0);

  const employee = route?.params?.employee;
  const isEmployeeWallet = Boolean(employee);

  const {
    data: userCardsData,
    isLoading: userCardsLoading,
    isRefetching: isRefetchingUserCards,
    refetch: refetchUserCards,
    error: userCardsError,
  } = useUserCards(!isEmployeeWallet);

  const {
    data: employeeCards,
    isLoading: employeeCardsLoading,
    isRefetching: isRefetchingEmployeeCards,
    refetch: refetchEmployeeCards,
    isError: employeeCardsError,
  } = useEmployeeCards(employee);

  const cardData = isEmployeeWallet ? employeeCards : userCardsData;
  const isRefetching = isEmployeeWallet ? isRefetchingEmployeeCards : isRefetchingUserCards;

  const activeCards = useMemo(
    () =>
      cardData?.filter(
        (cardDetails) =>
          !(
            cardDetails.card.status === 'CANCELLED' ||
            (cardDetails.card.type === 'PHYSICAL' && cardDetails.card.activated === false)
          ),
      ) ?? [],
    [cardData],
  );

  const refetchCards = useCallback(() => {
    if (isEmployeeWallet) {
      refetchEmployeeCards();
    } else {
      refetchUserCards();
    }
  }, [isEmployeeWallet, refetchEmployeeCards, refetchUserCards]);

  useEffect(() => {
    if (!isRefetching) {
      translationYSV.value = withTiming(0);
    } else {
      invalidateTransactions(queryClient);
      invalidateCardQueries(queryClient);
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

  const showLoading = isEmployeeWallet ? employeeCardsLoading : userCardsLoading;
  const showError = (isEmployeeWallet ? employeeCardsError : userCardsError) && !showLoading;
  const showCardsEmpty = !showLoading && !showError && (!activeCards || activeCards.length === 0);
  const showContent = !showError && !showLoading && !showCardsEmpty;

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
        <StatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" translucent />
        {employee && (
          <HeaderIcons
            onLayout={(e: LayoutChangeEvent) => setHeaderIconsHeight(e.nativeEvent.layout.height)}
            employee={employee}
          />
        )}
        <View style={tw`flex-1`}>
          {showLoading && <LoadingWallet />}
          {showError && (
            <LoadingError
              cardsError={userCardsError}
              refetchCards={refetchCards}
              isEmployeeWallet={isEmployeeWallet}
            />
          )}
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
              <View style={tw`flex-1 absolute h-full w-full`}>
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
                        isRefetching={isRefetching}
                        cardsLoading={showLoading}
                        isEmployeeWallet={isEmployeeWallet}
                        employee={employee}
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
