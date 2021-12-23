import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';
import { ActivityIndicator, CSText, FocusAwareStatusBar } from '@/Components';
import { Card, formatCardNumber } from './Components/Card';
import { CloseIcon, CopyIconLeft } from '@/Components/Icons';
import tw from '@/Styles/tailwind';
import { mixpanel } from '@/Services/utils/analytics';

const CARD_QUERY = gql`
  query CardInfoQuery($cardId: String!) {
    cardInfo(cardId: $cardId) @rest(type: "CardInfo", path: "/users/cards/{args.cardId}") {
      card {
        status
        cardLine3
        cardNumber
        expirationDate
        type
        address {
          streetLine1
          streetLine2
          locality
          region
          postalCode
          country
        }
      }
      availableBalance {
        amount
      }
      allocationName
    }
  }
`;

const CardInfoContent = ({ cardData }: any) => {
  const { t } = useTranslation();
  const { card, availableBalance, allocationName } = cardData;

  const { cardId, cardLine3, lastDigits, type, expirationDate, cardNumber, status, address } = card;
  const { amount: balanceAmount } = availableBalance;

  const isFrozen = status === 'BLOCKED';
  const isVirtual = type === 'VIRTUAL';
  const cardTitle = cardLine3 || allocationName;

  const copyCardNumberToClipboard = () => {
    mixpanel.track('Copy Card Number');
    Clipboard.setString(cardNumber);
  };

  const cardNumberFormatted = formatCardNumber(cardNumber);

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Card
        cardId={cardId}
        cardNumber={cardNumber}
        expirationDate={expirationDate}
        cardTitle={cardTitle}
        balance={balanceAmount}
        lastDigits={lastDigits}
        isVirtual={isVirtual}
        isFrozen={isFrozen}
        showSensitiveInformation
      />
      {/* Card Number Section */}
      <View style={tw`mt-6`}>
        <CSText style={tw`text-white text-xs`}>{t('cardInfo.cardNumber')}</CSText>
        <TouchableOpacity
          style={tw`mt-2 p-4 bg-white rounded-md flex flex-row justify-between items-center`}
          onPress={copyCardNumberToClipboard}
        >
          <CSText style={tw`text-center text-base font-montreal`}>{cardNumberFormatted}</CSText>
          <CopyIconLeft style={tw`h-8 w-8`} />
        </TouchableOpacity>
      </View>

      {/* Address Section */}
      <View style={tw`mt-6`}>
        <CSText style={tw`text-white text-xs`}>{t('cardInfo.billingAddress')}</CSText>
        <TouchableOpacity
          style={tw`mt-2 p-4 bg-white rounded-md flex flex-row justify-between items-center`}
        >
          {!!address && (
            <View style={tw`flex`}>
              <CSText style={tw`font-montreal`}>
                {`${address.streetLine1} ${address.streetLine2}`}
              </CSText>
              <CSText style={tw`mt-1 font-montreal`}>
                {`${address.locality}, ${address.region} ${address.postalCode}, ${address.country}`}
              </CSText>
            </View>
          )}
          <CopyIconLeft style={tw`h-8 w-8`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CardInfoScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const route = useRoute();
  const { cardId } = route.params as any;

  const { loading, error, data } = useQuery(CARD_QUERY, {
    variables: { cardId },
  });

  return (
    <BlurView style={tw`flex-1`} blurAmount={25} overlayColor={tw.color('black')} blurType="dark">
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView
        style={tw.style('flex-1 justify-between', { backgroundColor: 'rgba(0,0,0,0.5)' })}
      >
        {loading && (
          <View style={tw`flex-1 items-center justify-center p-6`}>
            <ActivityIndicator />
          </View>
        )}
        {!loading && error && (
          <View style={tw`flex-1 items-center justify-center p-6`}>
            <CSText style={tw`text-base text-error mb-2`}>{error?.message}</CSText>
          </View>
        )}
        {!loading && !error && data?.cardInfo && <CardInfoContent cardData={data?.cardInfo} />}

        {/* Dismiss button */}
        <View style={tw`flex-initial mb-6`}>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-center p-3`}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CloseIcon
              style={tw`rounded-full border-2 border-white w-7 h-7`}
              color={tw.color('white')}
            />
            <CSText style={tw`ml-3 text-lg text-white`}>{t('cardInfo.dismiss')}</CSText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </BlurView>
  );
};

export default CardInfoScreen;
