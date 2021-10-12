import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import tw from '@/Styles/tailwind';
import { NotificationBell, Button, FocusAwareStatusBar, ActivityIndicator } from '@/Components';
import { EyeIcon } from '@/Components/Icons/eyeIcon';
import { SnowflakeIcon } from '@/Components/Icons/snowflakeIcon';
import { TransactionRow } from '@/Containers/Wallet/Components/TransactionRow';
import { Card } from '@/Containers/Wallet/Components/Card';

const CARDS_QUERY = gql`
  query RootQuery {
    cards {
      cardId
      isVirtual
      isDisposable
      isFrozen
      currency
      balance
      cardTitle
      lastDigits
    }
  }
`;

const CardsScreen = ({ navigation }: { navigation: any }) => {
  const { data, loading } = useQuery(CARDS_QUERY);
  const { t } = useTranslation();

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-lightBG`} edges={['top']}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const card1 = data.cards[0];

  return (
    <SafeAreaView style={tw`flex-1 bg-lightBG`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('lightBG')} barStyle="dark-content" />
      <View style={tw`px-9 py-5`}>
        <View style={tw`flex-row justify-between my-2`}>
          <Text style={tw`text-base font-bold text-copyDark`}>Company Name</Text>
          <NotificationBell onPress={() => navigation.navigate('Notifications')} />
        </View>
        <Text style={tw`text-3xl font-bold text-copyDark`}>
          {t('wallet.header', { name: 'John' })}
        </Text>
      </View>

      {/* Card and buttons */}
      <View style={tw`flex px-8 pt-4 pb-6`}>
        <Card
          id={card1.cardId}
          balance={card1.balance}
          isFrozen={card1.isFrozen}
          isDisposable={card1.isDisposable}
          isVirtual={card1.isVirtual}
          lastDigits={card1.lastDigits}
          cardTitle={card1.cardTitle}
          onPress={() => navigation.navigate('Card Details')}
        />

        {/* Button Row */}
        <View style={tw`flex-row items-center justify-center pt-3`}>
          <Button
            containerStyle={tw`flex-1`}
            onPress={() => navigation.navigate('Card Info')}
            small
          >
            <EyeIcon style={tw`mr-1`} />
            <Text style={tw`text-base font-bold text-primary`}>{t('card.showCardInfo')}</Text>
          </Button>
          <View style={tw`w-3 h-3`} />
          <Button containerStyle={tw`flex-1`} small>
            <SnowflakeIcon style={tw`mr-1`} />
            <Text style={tw`text-base font-bold text-primary`}>{t('card.freezeCard')}</Text>
          </Button>
        </View>
      </View>

      {/* TODO Slider dots */}

      {/* Bottom white area */}
      <View style={tw`flex-1 bg-white pb-6 shadow-xl rounded-t-3xl`}>
        <View
          style={tw.style('flex self-center bg-gray90 w-12 rounded-full my-3', {
            height: 6,
          })}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Recent Transactions */}
          <Text style={tw`text-xl font-bold text-copyDark px-6 py-4`}>
            {t('wallet.transactions.recentTransactions')}
          </Text>

          {/* Date and balance */}
          <View style={tw`flex-row justify-between bg-gray90 px-6 py-2 mb-4`}>
            <Text style={tw`text-sm text-gray50`}>Jun 30, 2021</Text>
            <Text style={tw`text-sm text-gray50`}>
              {t('wallet.transactions.balance')}
              $123.00
            </Text>
          </View>

          {/* Transactions */}
          <TransactionRow
            transactionId="1234"
            merchant="Merchant name"
            amount="-$50.00"
            onPress={() => {}}
          />
          <TransactionRow
            transactionId="1235"
            merchant="Merchant name"
            amount="-$50.00"
            onPress={() => {}}
          />
          <TransactionRow
            transactionId="1236"
            merchant="Merchant name"
            amount="-$50.00"
            onPress={() => {}}
          />
          <TransactionRow
            transactionId="1237"
            merchant="Merchant name"
            amount="-$50.00"
            onPress={() => {}}
          />
          <TransactionRow
            transactionId="1238"
            merchant="Merchant name"
            amount="-$50.00"
            onPress={() => {}}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CardsScreen;
