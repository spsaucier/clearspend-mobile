import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
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

  const isAddressEmpty = Object.keys(address).length === 0;
  const isFrozen = status === 'BLOCKED';
  const isVirtual = type === 'VIRTUAL';
  const cardTitle = cardLine3 || allocationName;

  const copyCardNumberToClipboard = () => {
    mixpanel.track('Copy Card Number');
    Clipboard.setString(cardNumber);
  };

  const cardNumberFormatted = formatCardNumber(cardNumber);

  return (
    <View style={tw`flex-1 justify-center m-4 mt-12`}>
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
      <View>
        <View style={tw`flex-col justify-between py-8 items-start border-gray60`}>
          <CSText style={tw`text-white`}>{t('cardInfo.cardNumber')}</CSText>
          <TouchableOpacity
            style={tw`mt-5 w-90 h-18 bg-white rounded-md`}
            onPress={copyCardNumberToClipboard}
          >
            <View style={tw`flex-row py-5 justify-between items-center`}>
              <CSText style={tw`mt-2 text-center ml-5 text-base`}>{cardNumberFormatted}</CSText>
              <CopyIconLeft style={tw`mr-5`} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw` py-2 border-gray60`}>
          <CSText style={tw`text-white`}>{t('cardInfo.billingAddress')}</CSText>
          <TouchableOpacity style={tw`mt-5 w-90 h-18 bg-white rounded-md`}>
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`flex-col py-4 justify-between`}>
                {!isAddressEmpty && (
                  <View>
                    <CSText style={tw`ml-5`}>{`${streetLine1} ${streetLine2}`}</CSText>
                    <CSText style={tw`ml-5 mt-1`}>
                      {`${locality}, ${region} ${postalCode}, ${country}`}
                    </CSText>
                  </View>
                )}
              </View>
              <CopyIconLeft style={tw`mr-5`} />
            </View>
          </TouchableOpacity>
        </View>
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
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <FocusAwareStatusBar backgroundColor={tw.color('gray50')} barStyle="light-content" />
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
      <View style={tw`flex-initial m-6 pb-6`}>
        <TouchableOpacity
          style={tw`flex flex-row items-center justify-center`}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <CloseIcon
            style={tw`mr-2 rounded-full border-1 border-white`}
            color={tw.color('white')}
          />
          <CSText style={tw`text-base text-white`}>{t('cardInfo.dismiss')}</CSText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CardInfoScreen;
