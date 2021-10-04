import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { FocusAwareStatusBar } from '@/Components';
import { CloseIconButton } from '@/Components/CloseButton';

const TransactionDetailScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1 bg-lightBG`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('lightBG')} barStyle="dark-content" />

      <View style={tw`flex-row items-end justify-end px-4`}>
        <CloseIconButton />
      </View>

      <View style={tw`flex px-8 pt-4 pb-6`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tw`text-base font-bold text-primary`}>
            {t('wallet.transactionDetails.title')}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetailScreen;
