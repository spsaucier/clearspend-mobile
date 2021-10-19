import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import tw from '@/Styles/tailwind';
import { ActivityIndicator, FocusAwareStatusBar } from '@/Components';
import { CloseIconButton } from '@/Components/CloseButton';

const CARD_QUERY = gql`
  query CardQuery($cardId: ID!) {
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
      transactions {
        merchantName
      }
    }
  }
`;

const CardInfoScreen = () => {
  const { loading, error, data } = useQuery(CARD_QUERY, {
    variables: { cardId: '1111' },
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

  return (
    <SafeAreaView style={tw`flex-1 bg-lightBG`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('lightBG')} barStyle="dark-content" />

      <View style={tw`flex-row items-end justify-end px-4`}>
        <CloseIconButton />
      </View>

      <View style={tw`flex px-8 pt-4 pb-6`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tw`text-base font-bold text-primary`}>{t('wallet.cardInfo.title')}</Text>
          <Text style={tw`text-base font-bold text-primary`}>{`$${data.card.balance}`}</Text>
          <Text style={tw`text-base font-bold text-primary`}>
            {data.card.transactions[0].merchantName}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CardInfoScreen;
