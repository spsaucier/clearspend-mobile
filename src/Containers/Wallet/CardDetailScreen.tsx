import React from 'react';
import { View, ScrollView, ImageBackground, Text, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gql, useQuery } from '@apollo/client';
import tw from '@/Styles/tailwind';
import { ActivityIndicator, Button, FocusAwareStatusBar, LinearProgressBar } from '@/Components';
import {
  AlarmIcon,
  AppleWalletIcon,
  CardFrozenIcon,
  CardSettingsIcon,
  ChevronIcon,
  EyeIcon,
  SnowflakeIcon,
  SuspensionPointsIcon,
} from '@/Components/Icons';
import { Visa } from '@/Components/Svg/Visa';

const cardBGImageOverlay = require('@/Assets/Images/cardPattern.png');

const CARD_QUERY = gql`
  query CardQuery($cardId: ID!) {
    card(cardId: $cardId) {
      isFrozen
      isDisposable
      isVirtual
      lastDigits
      cardTitle
      balance
      transactions {
        transactionId
        merchantName
        merchantId
        merchantCategory
        merchantLogoUrl
        amount
        status
        date
        time
        isReceiptLinked
      }
    }
  }
`;

type Props = {
  route: any;
  navigation: any;
};

const CardDetailScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const { cardId } = route.params;

  const { data, loading } = useQuery(CARD_QUERY, {
    variables: { cardId },
  });

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-lightBG`}>
        <ActivityIndicator />
      </View>
    );
  }

  const { isVirtual, isDisposable, isFrozen, balance, lastDigits, cardTitle } = data.card;

  // TODO: CALCULATIONS WILL BE DONE PROPERLY WHEN API INTEGRATED
  const tempData = {
    amountSpentToday: 12.05,
    dailySpendLimit: 30.0,
    amountSpentCurrentMonth: 300.05,
    monthlySpendLimit: 500,
  };

  const { amountSpentToday, dailySpendLimit, amountSpentCurrentMonth, monthlySpendLimit } =
    tempData;
  const dailyRemaining = Math.abs(dailySpendLimit - amountSpentToday);
  const monthlyRemaining = Math.abs(monthlySpendLimit - amountSpentCurrentMonth);
  const displayAppleWalletBtn = Platform.OS === 'ios';

  return (
    <View style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar backgroundColor={tw.color('primary')} barStyle="light-content" />
      <View
        style={[
          tw.style(
            'flex bg-primary w-full rounded-b-3xl overflow-hidden z-30',
            isVirtual && 'bg-tertiary',
            isDisposable && 'bg-black',
            isFrozen && 'bg-gray40',
          ),
          { aspectRatio: 328 / 208 }, // WHY 1.57?
        ]}
      >
        <ImageBackground
          imageStyle={tw`opacity-30`}
          source={cardBGImageOverlay}
          resizeMode="cover"
          style={tw`flex-1`}
        >
          <View style={tw`flex-1 items-start justify-end h-full p-6`}>
            <View
              style={tw.style('flex self-center bg-white w-12 rounded-full my-3 opacity-40 mb-8', {
                height: 6,
              })}
            />
            <View style={tw`flex-row w-full justify-between mb-4`}>
              <View style={tw`flex font-card`}>
                <Text style={tw`text-white text-xl font-card`}>{`**** ${lastDigits}`}</Text>
                {!!cardTitle && <Text style={tw`text-white text-base`}>{cardTitle}</Text>}
              </View>
              <View>
                <Visa style={tw`h-10 mt-1`} />
              </View>
            </View>

            <View style={tw`flex-row items-center justify-evenly`}>
              <Button
                containerStyle={tw`flex-1 mr-1`}
                onPress={() => navigation.navigate('Card Info')}
                small
              >
                <EyeIcon style={tw`mr-1`} />
                <Text style={tw`text-base font-semibold text-primary`}>
                  {t('card.showCardInfo')}
                </Text>
              </Button>
              <Button containerStyle={tw`flex-1 ml-1`} small>
                <SnowflakeIcon style={tw`mr-1`} />
                {isFrozen ? (
                  <Text style={tw`text-base font-semibold text-primary`}>
                    {t('card.unfreezeCard')}
                  </Text>
                ) : (
                  <Text style={tw`text-base font-semibold text-primary`}>
                    {t('card.freezeCard')}
                  </Text>
                )}
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>

      {isFrozen && (
        <View
          style={tw`flex-row items-center -mt-4 rounded-b-3xl bg-warning border-1 border-warning-highlight overflow-hidden z-20 pl-6 pb-4 pt-8`}
        >
          <CardFrozenIcon />
          <Text style={tw`ml-1 text-error`}>{t('cardProfile.cardIsFrozenForSecurity')}</Text>
        </View>
      )}

      <ScrollView style={tw`bg-lightBG -mt-4`}>
        <View style={tw`bg-lightBG rounded-b-3xl overflow-hidden z-10 p-6`}>
          <View>
            <Text style={tw`font-spacegrotesk text-base mt-2 mb-2`}>
              {t('cardProfile.cardBalance')}
            </Text>
            <Text style={tw`text-2xl mt-1 mb-2`}>{`$${balance}`}</Text>
            {displayAppleWalletBtn && (
              <TouchableOpacity
                style={tw`flex-row bg-black rounded-lg p-1 w-full items-center justify-center border-gray80 border-2 mt-2 mb-2`}
              >
                <AppleWalletIcon style={tw`mr-1`} />
                <Text style={tw`text-white ml-1 text-base`}>
                  {t('cardProfile.addToAppleWallet')}
                </Text>
              </TouchableOpacity>
            )}

            {isFrozen && (
              <TouchableOpacity
                style={tw`flex-row items-center pt-2 pb-2 mt-1 mb-1`}
                onPress={() => navigation.navigate('Card Lost Stolen')}
              >
                <View style={tw`rounded-lg p-2 border-1 bg-warning border-warning-highlight`}>
                  <AlarmIcon />
                </View>
                <Text style={tw`flex-grow ml-2 text-sm font-medium`}>
                  {t('cardProfile.reportCardLostOrStolen')}
                </Text>
                <ChevronIcon />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={tw`flex-row items-center pt-2 pb-2 mt-1 mb-1`}
              onPress={() => navigation.navigate('Card Spend Controls')}
            >
              <View
                style={[
                  tw`rounded-lg p-2 border-1 bg-primary bg-opacity-10 border-primary border-opacity-10`,
                ]}
              >
                <CardSettingsIcon />
              </View>
              <Text style={tw`flex-grow ml-2 text-sm font-medium`}>
                {t('cardProfile.spendControls')}
              </Text>
              <ChevronIcon />
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center pt-2 pb-2 mt-1 mb-1`}
              onPress={() => navigation.navigate('Card Settings')}
            >
              <View
                style={tw`rounded-lg p-2 border-1 bg-primary bg-opacity-10 border-primary border-opacity-10`}
              >
                <SuspensionPointsIcon />
              </View>
              <View style={tw`flex-grow ml-2`}>
                <Text style={tw`text-sm font-medium`}>{t('cardProfile.moreSettings')}</Text>
                <Text style={tw`text-xs text-gray40`}>{t('cardProfile.moreSettingsSubtitle')}</Text>
              </View>
              <ChevronIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[tw`bg-white -mt-6 p-6 pt-8 h-full`]}>
          <View style={tw`mb-4`}>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`font-spacegrotesk text-sm uppercase`}>
                {t('cardProfile.spentToday')}
              </Text>
              <View style={tw`flex-row`}>
                <Text style={tw`text-sm`}>
                  {t('cardProfile.limit', { amount: `$${dailySpendLimit.toFixed(2)}` })}
                </Text>
              </View>
            </View>
            <LinearProgressBar progress={(amountSpentToday / dailySpendLimit) * 100} />
            <Text style={tw`text-lg mt-1`}>{`$${amountSpentToday}`}</Text>
            <Text style={tw`text-sm text-gray40 mt-1`}>
              {t('cardProfile.remaining', { amount: `$${dailyRemaining.toFixed(2)}` })}
            </Text>
          </View>
          <View style={tw`mb-4`}>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`font-spacegrotesk text-base uppercase`}>
                {t('cardProfile.spentCurrentMonth')}
              </Text>
              <View style={tw`flex-row`}>
                <Text style={tw`text-sm`}>
                  {t('cardProfile.limit', { amount: `$${monthlySpendLimit.toFixed(2)}` })}
                </Text>
              </View>
            </View>
            <LinearProgressBar progress={(amountSpentCurrentMonth / monthlySpendLimit) * 100} />
            <Text style={tw`text-lg mt-1`}>{`$${amountSpentCurrentMonth}`}</Text>
            <Text style={tw`text-sm text-gray40 mt-1`}>
              {t('cardProfile.remaining', { amount: `$${monthlyRemaining.toFixed(2)}` })}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CardDetailScreen;
