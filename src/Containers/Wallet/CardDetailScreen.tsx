import React from 'react';
import { View, ScrollView, ImageBackground, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gql, useQuery } from '@apollo/client';
import tw from '@/Styles/tailwind';
import {
  ActivityIndicator,
  Button,
  CSText,
  FocusAwareStatusBar,
  LinearProgressBar,
} from '@/Components';
import {
  AlarmIcon,
  AppleWalletIcon,
  CardSettingsIcon,
  ChevronIcon,
  EyeIcon,
  SnowflakeIcon,
  SuspensionPointsIcon,
} from '@/Components/Icons';

const cardBGImageDark = require('@/Assets/Images/card-bg-dark.png');

const CARD_QUERY = gql`
  query CardDetailsQuery($cardId: String!) {
    cardDetails(cardId: $cardId) @rest(type: "Card", path: "/users/cards/{args.cardId}") {
      card {
        expirationDate
        cardNumber
        lastFour
        cardLine3
        cardLine4
        type
        address {
          streetLine1
          streetLine2
          locality
          region
          postalCode
          country
        }
        status
      }
      availableBalance {
        currency
        amount
      }
      allocationName
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

  const { card, availableBalance } = data?.cardDetails;
  const { type, status } = card;
  const { amount: balanceAmount } = availableBalance;

  const isVirtual = type === 'VIRTUAL';
  const isFrozen = status === 'BLOCKED';

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
      <FocusAwareStatusBar translucent backgroundColor="transparent" />
      <View
        style={[
          tw.style(
            'flex bg-primary-new w-full rounded-b-3xl overflow-hidden z-30',
            isVirtual && 'bg-card-light',
            isFrozen && 'bg-card-dark',
            { height: 120 },
          ),
        ]}
      >
        <ImageBackground source={cardBGImageDark} resizeMode="cover" style={tw`flex-1`}>
          <View style={tw`flex-1 items-start justify-around h-full p-6`}>
            <View
              style={[
                tw`flex self-center bg-white w-12 rounded-full my-3 opacity-40 mb-8`,
                {
                  height: 6,
                },
                Platform.select({ ios: tw`mt-8` }),
              ]}
            />
            <View style={tw`flex-row w-full items-end justify-end mb-4`}>
              {isFrozen && (
                <View style={tw.style('flex-row items-center mt-1')}>
                  <SnowflakeIcon color={tw.color('primary-new')} />
                  <CSText style={tw.style('text-sm ml-2 text-white font-semibold')}>
                    {t('card.frozen').toUpperCase()}
                  </CSText>
                </View>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>

      <ScrollView style={tw`bg-forest-green -mt-6`}>
        <View style={tw.style('bg-forest-green rounded-b-3xl z-10 p-6 pt-8')}>
          <View style={tw`flex-row items-center justify-evenly pt-3 pb-6`}>
            {/* Show Card Info Button */}
            <Button
              containerStyle={tw`flex-1 mr-1`}
              onPress={() => navigation.navigate('Card Info', { cardId })}
              small
              theme="dark"
            >
              <EyeIcon style={tw`mr-2`} color={tw.color('primary-new')} />
              <CSText style={tw`text-base text-white`}>{t('card.showCardInfo')}</CSText>
            </Button>

            {/* Freeze/Unfreeze Button */}
            <Button
              containerStyle={tw.style('flex-1 ml-1', isFrozen && 'bg-white')}
              small
              theme="dark"
            >
              <SnowflakeIcon
                style={tw`mr-2`}
                color={isFrozen ? tw.color('black') : tw.color('primary-new')}
              />
              {isFrozen ? (
                <CSText style={tw`text-base text-black`}>{t('card.unfreezeCard')}</CSText>
              ) : (
                <CSText style={tw`text-base text-white`}>{t('card.freezeCard')}</CSText>
              )}
            </Button>
          </View>

          <View>
            <CSText style={tw`text-base text-white mt-2 mb-2`}>
              {t('cardProfile.cardBalance')}
            </CSText>
            <CSText style={tw`text-2xl mt-1 mb-8 text-white`}>
              {`$${balanceAmount.toFixed(2)}`}
            </CSText>

            <TouchableOpacity
              style={tw`flex-row items-center pt-2 pb-2 mt-1 mb-1`}
              onPress={() => navigation.navigate('Card Spend Controls')}
            >
              <View style={tw`rounded p-2 bg-card-dark`}>
                <CardSettingsIcon color={tw.color('primary-new')} />
              </View>
              <CSText style={tw`flex-grow ml-2 text-sm font-medium text-white`}>
                {t('cardProfile.spendControls')}
              </CSText>
              <ChevronIcon color={tw.color('white')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center pt-2 pb-2 mt-1 mb-1`}
              onPress={() => navigation.navigate('Card Settings')}
            >
              <View style={tw`rounded p-2 bg-card-dark`}>
                <SuspensionPointsIcon color={tw.color('primary-new')} />
              </View>
              <View style={tw`flex-grow ml-2`}>
                <CSText style={tw`text-sm font-medium text-white`}>
                  {t('cardProfile.moreSettings')}
                </CSText>
                <CSText style={tw`text-xs text-white`}>
                  {t('cardProfile.moreSettingsSubtitle')}
                </CSText>
              </View>
              <ChevronIcon color={tw.color('white')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center pt-2 pb-2 mt-1 mb-1`}
              onPress={() => navigation.navigate('Card Lost Stolen')}
            >
              <View style={tw`rounded p-2 bg-card-dark`}>
                <AlarmIcon />
              </View>
              <CSText style={tw`flex-grow ml-2 text-sm font-medium text-white`}>
                {t('cardProfile.reportCardLostOrStolen')}
              </CSText>
              <ChevronIcon color={tw.color('white')} />
            </TouchableOpacity>

            {/* Apple Wallet Button */}
            {displayAppleWalletBtn && (
              <TouchableOpacity
                style={tw`flex-row bg-black rounded-lg p-1 w-full items-center justify-center border-black border-2 mt-5 mb-2`}
                onPress={() => {
                  navigation.navigate('Add Card To Apple Wallet', { cardId, termsAccepted: false });
                }}
              >
                <AppleWalletIcon style={tw`mr-1`} />
                <CSText style={tw`text-white ml-1 text-base`}>
                  {t('cardProfile.addToAppleWallet')}
                </CSText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={[tw`bg-white -mt-6 p-6 pt-8 h-full`]}>
          {/* Spent Today */}
          <View style={tw`mb-4 mt-4`}>
            <View style={tw`flex-row justify-between mt-2`}>
              <CSText style={tw`text-xs text-black uppercase`}>
                {t('cardProfile.spentToday')}
              </CSText>
              <View style={tw`flex-row`}>
                <CSText style={tw`text-sm`}>
                  {t('cardProfile.limit', { amount: `$${dailySpendLimit.toFixed(2)}` })}
                </CSText>
              </View>
            </View>
            <LinearProgressBar progress={(amountSpentToday / dailySpendLimit) * 100} />
            <View style={tw`flex-row justify-between items-start`}>
              <CSText style={tw`text-lg mt-1`}>{`$${amountSpentToday}`}</CSText>
              <CSText style={tw`text-sm text-black mt-1`}>
                {t('cardProfile.remaining', { amount: `$${dailyRemaining.toFixed(2)}` })}
              </CSText>
            </View>
          </View>

          {/* Spent this month */}
          <View style={tw`mb-4 mt-4`}>
            <View style={tw`flex-row justify-between mt-2`}>
              <CSText style={tw`text-xs text-black uppercase`}>
                {t('cardProfile.spentCurrentMonth')}
              </CSText>
              <View style={tw`flex-row`}>
                <CSText style={tw`text-sm`}>
                  {t('cardProfile.limit', { amount: `$${monthlySpendLimit.toFixed(2)}` })}
                </CSText>
              </View>
            </View>
            <LinearProgressBar progress={(amountSpentCurrentMonth / monthlySpendLimit) * 100} />
            <View style={tw`flex-row justify-between items-start`}>
              <CSText style={tw`text-lg mt-1`}>{`$${amountSpentCurrentMonth}`}</CSText>
              <CSText style={tw`text-sm text-black mt-1`}>
                {t('cardProfile.remaining', { amount: `$${monthlyRemaining.toFixed(2)}` })}
              </CSText>
            </View>
          </View>
          <View style={tw`h-20`} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CardDetailScreen;
