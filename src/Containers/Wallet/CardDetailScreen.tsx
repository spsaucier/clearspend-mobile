import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import MultitaskBlur from 'react-native-multitask-blur';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '@/Styles/tailwind';
import { ActivityIndicator, CSText, FocusAwareStatusBar, InfoPanel } from '@/Components';
import { useBusiness, useCard } from '@/Queries';
import { LimitSection } from '@/Containers/Wallet/Components/LimitSection';
import { CardWebView } from '@/Containers/Wallet/Components/CardWebView';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { ProfileScreens, ProfileStackParamTypes } from '@/Navigators/Profile/ProfileNavigatorTypes';
import { WalletScreens, WalletStackParamTypes } from '@/Navigators/Wallet/WalletNavigatorTypes';
import { ProfileIcon } from '@/Components/Icons';
import { CardOptionsBottomSheet } from '@/Containers/Wallet/CardOptionsBottomSheet';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { ToastDisplay } from '@/Components/ToastDisplay';
import { ActivityOverlay } from '@/Components/ActivityOverlay';

type Props = {
  route: any;
};

const CardDetailScreen = ({ route }: Props) => {
  const balanceInfoPanelRef = useRef<BottomSheetModal>(null);
  const cardOptionsPanelRef = useRef<BottomSheetModal>(null);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<
        WalletStackParamTypes & ProfileStackParamTypes,
        WalletScreens.CardDetails
      >
    >();
  const { t } = useTranslation();

  const { cardId } = route.params;

  const { data, error, isLoading } = useCard(cardId);
  const { data: business } = useBusiness();

  useEffect(() => {
    MultitaskBlur.blur(); // For blur on multitask switch mode
    return () => MultitaskBlur.unBlur();
  }, []);

  const onCardOptionsPress = () => {
    cardOptionsPanelRef.current?.present();
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-secondary`}>
        <ActivityIndicator />
      </View>
    );
  }
  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <CSText style={tw`text-base text-error mb-2`}>{error.message}</CSText>
      </View>
    );
  }
  if (data) {
    // TODO support multiple allocations/spend controls on cards
    // @ts-ignore
    const { limits, card } = data;
    // TODO Remove ts-ignore when limit backend types are ready
    // @ts-ignore
    const purchaseLimits = limits && limits[0].typeMap.PURCHASE;
    const showDailyLimit = purchaseLimits && purchaseLimits.DAILY && !!purchaseLimits.DAILY.amount;
    const showMonthlyLimit =
      purchaseLimits && purchaseLimits.MONTHLY && !!purchaseLimits.MONTHLY.amount;
    const showTransactionLimit =
      purchaseLimits && purchaseLimits.INSTANT && !!purchaseLimits.INSTANT.amount;
    const showLimitsSection = showDailyLimit || showMonthlyLimit || showTransactionLimit;

    const { status } = card;
    const isCardFrozen = status === 'INACTIVE';

    return (
      <BottomSheetModalProvider>
        <SafeAreaView style={tw`bg-secondary flex-1`}>
          <FocusAwareStatusBar translucent backgroundColor="transparent" />
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Back button & Profile Icon */}
            <View style={tw`flex flex-row items-center justify-between px-5 mt-4`}>
              <BackButtonNavigator theme="dark" />
              <TouchableOpacity onPress={() => navigate(ProfileScreens.Home)}>
                <ProfileIcon color={tw.color('white')} size={26} />
              </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={tw`flex-1 p-4`}>
              <CardWebView cardData={data} onCardOptionsPress={onCardOptionsPress} />
            </View>

            {showLimitsSection && (
              <View style={tw`mt-8 px-4`}>
                <CSText style={tw`text-white text-xs uppercase tracking-widest mb-4`}>
                  {t('cardProfile.cardLimits')}
                </CSText>
                <View style={tw`flex rounded-md bg-black-30 px-4 pt-5`}>
                  {showTransactionLimit && (
                    <View style={tw`flex-row items-center justify-between mb-5`}>
                      <CSText style={tw`text-xs text-white uppercase tracking-widest`}>
                        {t('cardProfile.singleTransaction')}
                      </CSText>
                      <CSText style={tw`text-sm text-white`}>
                        {formatCurrency(purchaseLimits.INSTANT?.amount)}
                      </CSText>
                    </View>
                  )}
                  {showDailyLimit && (
                    <LimitSection
                      label={t('cardProfile.spentToday')}
                      amountUsed={purchaseLimits.DAILY?.usedAmount || 0}
                      limit={purchaseLimits.DAILY?.amount || 0}
                    />
                  )}
                  {showMonthlyLimit && (
                    <LimitSection
                      label={t('cardProfile.spentCurrentMonth')}
                      amountUsed={purchaseLimits.MONTHLY?.usedAmount || 0}
                      limit={purchaseLimits.MONTHLY?.amount || 0}
                    />
                  )}
                </View>
              </View>
            )}

            {/* Address */}
            {business?.address?.streetLine1 ? (
              <View style={tw`mt-8 px-4`}>
                <CSText style={tw`text-white text-xs mb-5 tracking-widest`}>
                  {t('cardInfo.billingAddress')}
                </CSText>
                <View style={tw`bg-white rounded-md flex`}>
                  <View style={tw`flex p-5`}>
                    <CSText style={tw`font-montreal`}>
                      {`${business.address.streetLine1} ${business.address.streetLine2}`}
                    </CSText>
                    <CSText style={tw`mt-1 font-montreal`}>
                      {`${business.address.locality}, ${business.address.region} ${business.address.postalCode}, ${business.address.country}`}
                    </CSText>
                  </View>
                  <View style={tw`border-b-1 border-gray-10`} />
                  <CSText style={tw`text-sm p-5`}>{t('cardInfo.billingAddressInfo')}</CSText>
                </View>
              </View>
            ) : (
              <View />
            )}
            <View style={tw`h-30`} />
          </ScrollView>
          <InfoPanel
            ref={balanceInfoPanelRef}
            title={t('cardProfile.availableToSpendMeans')}
            description={t('cardProfile.availableToSpendMeansDescription')}
            okButtonText={t('cardProfile.okGotIt')}
          />
          <CardOptionsBottomSheet
            ref={cardOptionsPanelRef}
            cardId={cardId}
            hideCardInfoButton
            isCardFrozen={isCardFrozen}
            setIsCancelling={setIsCancelling}
            nextIndex={0}
          />
          <ActivityOverlay
            visible={isCancelling}
            message={t('card.options.cancelCardAlert.cancelling')}
          />
        </SafeAreaView>
        {Platform.OS === 'ios' ? <ToastDisplay /> : null}
      </BottomSheetModalProvider>
    );
  }
  return null;
};

export default CardDetailScreen;
