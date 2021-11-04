import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';
import tw from '@/Styles/tailwind';
import { ActivityIndicator, FocusAwareStatusBar } from '@/Components';
import { Card } from './Components/Card';
import { CopyIcon } from '@/Components/Icons';

const CARD_QUERY = gql`
  query CardInfoQuery($cardId: ID!) {
    card(cardId: $cardId) {
      cardId
      isVirtual
      isDisposable
      isFrozen
      currency
      balance
      cardTitle
      lastDigits
      cvv
      cardNumber
      expirationDate
      billingAddress {
        streetLine1
        streetLine2
        locality
        region
        postalCode
        country
      }
    }
  }
`;

const CardInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cardId } = route.params as any;

  const { loading, error, data } = useQuery(CARD_QUERY, {
    variables: { cardId },
  });
  const { t } = useTranslation();

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <Text style={tw`text-base text-error mb-2`}>{error?.message}</Text>
      </View>
    );
  }

  const {
    balance,
    cardTitle,
    isVirtual,
    isDisposable,
    isFrozen,
    lastDigits,
    cardNumber,
    cvv,
    expirationDate,
    billingAddress,
  } = data.card;

  const { streetLine1, streetLine2, locality, region, postalCode, country } = billingAddress;

  const copyCardNumberToClipboard = () => {
    Clipboard.setString(cardNumber);
  };

  const copyCVV = () => {
    Clipboard.setString(cvv);
  };

  return (
    <BlurView style={tw`flex-1`} blurType={Platform.select({ ios: 'chromeMaterialDark' })}>
      <SafeAreaView style={tw`flex-1`}>
        <FocusAwareStatusBar backgroundColor={tw.color('gray50')} barStyle="light-content" />
        <View style={tw`flex-1 justify-center m-4 mt-12`}>
          <Card
            cardId={cardId}
            cardNumber={cardNumber}
            expirationDate={expirationDate}
            cvv={cvv}
            cardTitle={cardTitle}
            balance={balance}
            lastDigits={lastDigits}
            isVirtual={isVirtual}
            isDisposable={isDisposable}
            isFrozen={isFrozen}
            showSensitiveInformation
          />
          <View style={tw`m-2`}>
            <View style={tw`flex-row justify-between py-4  items-center  border-b-1 border-gray60`}>
              <Text style={tw`text-white font-spacegrotesk`}>{t('cardInfo.copyCardNumber')}</Text>
              <TouchableOpacity onPress={copyCardNumberToClipboard}>
                <CopyIcon />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row justify-between items-center py-4 border-b-1 border-gray60`}>
              <Text style={tw`text-white font-spacegrotesk`}>{t('cardInfo.copyCVV')}</Text>
              <TouchableOpacity onPress={copyCVV}>
                <CopyIcon />
              </TouchableOpacity>
            </View>
            <View style={tw` py-4  border-b-1 border-gray60`}>
              <Text style={tw`text-white font-spacegrotesk`}>{t('cardInfo.billingAddress')}</Text>
              <Text style={tw`text-white mt-2`}>{`${streetLine1} ${streetLine2}`}</Text>
              <Text style={tw`text-white mt-2`}>{`${locality}, ${region} ${postalCode}`}</Text>
              <Text style={tw`text-white mt-2`}>{`${country}`}</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-initial m-6 pb-6`}>
          <TouchableOpacity
            style={tw`flex w-full rounded-xl items-center justify-center h-12 bg-gray50 bg-opacity-90`}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={tw`text-white`}>{t('cardInfo.dismiss')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </BlurView>
  );
};

export default CardInfoScreen;
