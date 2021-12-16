import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';
import { ActivityIndicator, CSText, FocusAwareStatusBar } from '@/Components';
import { Card } from './Components/Card';
import { CopyIcon } from '@/Components/Icons';
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

  const copyCVV = () => {
    mixpanel.track('Copy CVV');
    // Clipboard.setString(cvv);
  };

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
      <View style={tw`m-2`}>
        <View style={tw`flex-row justify-between py-4  items-center  border-b-1 border-gray60`}>
          <CSText style={tw`text-white`}>{t('cardInfo.copyCardNumber')}</CSText>
          <TouchableOpacity onPress={copyCardNumberToClipboard}>
            <CopyIcon />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-between items-center py-4 border-b-1 border-gray60`}>
          <CSText style={tw`text-white`}>{t('cardInfo.copyCVV')}</CSText>
          <TouchableOpacity onPress={copyCVV}>
            <CopyIcon />
          </TouchableOpacity>
        </View>
        <View style={tw` py-4  border-b-1 border-gray60`}>
          <CSText style={tw`text-white`}>{t('cardInfo.billingAddress')}</CSText>
          <CSText style={tw`text-white mt-2`}>
            {`${address.streetLine1} ${address.streetLine2}`}
          </CSText>
          <CSText style={tw`text-white mt-2`}>
            {`${address.locality}, ${address.region} ${address.postalCode}`}
          </CSText>
          <CSText style={tw`text-white mt-2`}>{`${address.country}`}</CSText>
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
    <BlurView style={tw`flex-1`} blurAmount={50}>
      <SafeAreaView style={tw`flex-1`}>
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
            style={tw`flex w-full rounded-xl items-center justify-center h-12 bg-gray50 bg-opacity-90`}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CSText style={tw`text-white`}>{t('cardInfo.dismiss')}</CSText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </BlurView>
  );
};

export default CardInfoScreen;
