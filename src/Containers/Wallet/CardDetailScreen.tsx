import React, { useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import MultitaskBlur from "react-native-multitask-blur";
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import {
  ActivityIndicator,
  CSText,
  FocusAwareStatusBar,
  InfoPanel,
} from '@/Components';
import { useBusiness, useCard } from '@/Queries';
import { CardWebView } from '@/Containers/Wallet/Components/CardWebView';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { ProfileIcon } from '@/Components/Icons';
import { CardOptionsBottomSheet } from '@/Containers/Wallet/CardOptionsBottomSheet';

type Props = {
  route: any;
};

const CardDetailScreen = ({ route }: Props) => {
  const balanceInfoPanelRef = useRef<BottomSheetModal>(null);
  const cardOptionsPanelRef = useRef<BottomSheetModal>(null);

  const { navigate } = useNavigation();
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
    return (
      <SafeAreaView style={tw`bg-secondary flex-1`}>
        <FocusAwareStatusBar translucent backgroundColor="transparent" />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Back button & Profile Icon */}
          <View style={tw`flex flex-row items-center justify-between px-5 mt-4`}>
            <BackButtonNavigator theme="dark" />
            <TouchableOpacity onPress={() => navigate(MainScreens.Profile)}>
              <ProfileIcon color={tw.color('white')} size={26} />
            </TouchableOpacity>
          </View>

          {/* Card */}
          <View style={tw`flex-1 p-5`}>
            <CardWebView cardData={data} onCardOptionsPress={onCardOptionsPress} />
          </View>

          {/* Address */}
          {business?.address?.streetLine1 ? (
            <View style={tw`mt-6 px-5`}>
              <CSText style={tw`text-white text-xs`}>{t('cardInfo.billingAddress')}</CSText>
              <View style={tw`mt-2 bg-white rounded-md flex`}>
                <View style={tw`flex p-5`}>
                  <CSText style={tw`font-montreal`}>
                    {`${business.address.streetLine1} ${business.address.streetLine2}`}
                  </CSText>
                  <CSText style={tw`mt-1 font-montreal`}>
                    {`${business.address.locality}, ${business.address.region} ${business.address.postalCode}, ${business.address.country}`}
                  </CSText>
                </View>
                <View style={tw`border-b-1 border-black-10`} />
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
        <CardOptionsBottomSheet ref={cardOptionsPanelRef} cardId={cardId} hideCardInfoButton />
      </SafeAreaView>
    );
  }
  return null;
};

export default CardDetailScreen;
