import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { Card } from '@/Components/Card';

const CardsContainer = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <View style={tw`px-9 py-5`}>
        <Text style={tw`text-3xl font-bold text-copy`}>{t('wallet.header', { name: 'John' })}</Text>
      </View>
      <View style={tw`flex px-5 pt-4 pb-8`}>
        <View style={tw`flex flex-col items-center justify-around`}>
          <Card
            id="1"
            balance="$123"
            isFrozen={false}
            isDisposable={false}
            isVirtual={false}
            lastDigits="1234"
            cardTitle="Sales Card"
          />
        </View>
      </View>

      {/* Bottom white area */}
      <View style={tw`flex-1 bg-white pb-6 shadow-xl rounded-t-3xl`}>
        <View
          style={tw.style('flex self-center bg-gray90 w-12 rounded-full my-3', {
            height: 6,
          })}
        />

        <Text style={tw`text-xl font-bold text-copy px-6 py-4`}>
          {t('wallet.recentTransactions')}
        </Text>

        <View style={tw`flex-row justify-between bg-gray90 px-6 py-2`}>
          <Text style={tw`text-sm text-gray50`}>Jun 30, 2021</Text>
          <Text style={tw`text-sm text-gray50`}>
            {t('wallet.balance')}
            $123.00
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CardsContainer;
