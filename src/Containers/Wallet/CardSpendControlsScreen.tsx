import React from 'react';
import { Text, View, FlatList, Switch, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { ChevronIconLeft, CoinIcon } from '@/Components/Icons';

const SpendControlCarousels = [
  {
    title: 'Channels',
  },
  {
    title: 'Limits',
  },
  {
    title: 'Foreign Travel',
  },
  {
    title: 'Custom Rules',
  },
  {
    title: 'Custom Rules',
  },
  {
    title: 'Custom Rules',
  },
];
const CardSpendControlsScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-6`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`flex-row items-center justify-center self-start mt-4 px-2 py-1 bg-gray98`}
        >
          <ChevronIconLeft />
          <Text style={tw`text-xs ml-2`}>{t('spendControls.back')}</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={tw`pt-4 pb-6 flex-row items-center`}>
          <CoinIcon />
          <Text style={tw`pl-5 text-xl`}>{t('spendControls.title')}</Text>
        </View>

        {/* Pill Carousel */}
        <FlatList
          horizontal
          data={SpendControlCarousels}
          renderItem={({ item }) => (
            <TouchableOpacity style={tw`py-1 px-3 rounded-full bg-gray98 mr-1`}>
              <Text style={tw`text-sm`}>{item.title}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <View style={tw`mt-12 mb-8`}>
          <Text style={tw`text-lg`}>{t('spendControls.limits')}</Text>
          <Text style={tw`pt-2 text-sm text-gray20`}>{t('spendControls.howMuchSpent')}</Text>
        </View>

        {/*  Limits box */}
        <View style={tw`bg-gray98 p-6`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`pt-2 text-sm`}>{t('spendControls.limitSection.dailyLimit')}</Text>
            <TouchableOpacity style={tw`p-2 bg-white`} onPress={() => {}}>
              <Text style={tw`text-base`}>$30.00</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row justify-between items-center mt-4`}>
            <Text style={tw`text-sm`}>{t('spendControls.limitSection.monthlyLimit')}</Text>
            <TouchableOpacity style={tw`p-2 bg-white`} onPress={() => {}}>
              <Text style={tw`text-base`}>$5000.00</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`mt-12 mb-8`}>
          <Text style={tw`text-lg`}>{t('spendControls.channelsTitle')}</Text>
          <Text style={tw`pt-2 text-sm text-gray20`}>{t('spendControls.howOftenCardUsed')}</Text>
        </View>

        {/* Channels box */}
        <View style={tw`bg-gray98 p-6`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-base`}>{t('spendControls.channelsSection.atm')}</Text>
            <Switch
              trackColor={{
                true: tw.color('secondary'),
                false: tw.color('gray80'),
              }}
              value
              ios_backgroundColor={tw.color('white')}
              thumbColor={tw.color('white')}
            />
          </View>

          <View style={tw`pt-2`}>
            <Text style={tw`text-sm`}>
              {t('spendControls.channelsSection.validUntil')}
              <Text style={tw`italic`}>
                {`${t('spendControls.channelsSection.cardValidity')} • ${t(
                  'spendControls.channelsSection.cardLimit',
                )}`}
              </Text>
            </Text>
          </View>

          <View style={tw`mt-4`}>
            <TouchableOpacity style={tw`rounded-3xl bg-secondary self-start`}>
              <Text style={tw`py-1 px-2 text-white text-sm`}>
                {t('spendControls.channelsSection.oneTimeUse')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CardSpendControlsScreen;
