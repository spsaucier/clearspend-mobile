import React from 'react';
import { View, ScrollView, ImageBackground, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
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
  ChevronIcon,
  EyeIcon,
  SnowflakeIcon,
  SuspensionPointsIcon,
} from '@/Components/Icons';
import { useCard, useFreezeCard, useUnFreezeCard } from '@/Queries';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { MainScreens } from '../../Navigators/NavigatorTypes';

const cardBGImageDark = require('@/Assets/Images/card-bg-dark.png');

type Props = {
  route: any;
};

const CardDetailScreen = ({ route }: Props) => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const { cardId } = route.params;

  const { data, error, isLoading } = useCard(cardId);

  const { mutate: freeze, isLoading: isFreezing } = useFreezeCard(cardId);
  const { mutate: unfreeze, isLoading: isUnfreezing } = useUnFreezeCard(cardId);
  const freezingOrUnfreezing = isUnfreezing || isFreezing;

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-secondary`}>
        <ActivityIndicator color={tw.color('white')} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <CSText style={tw`text-base text-error mb-2`}>{error.message}</CSText>
      </View>
    );
  }
  if (data) {
    const { card, availableBalance } = data;
    const { type, status } = card;
    const { amount: balanceAmount } = availableBalance;

    const isVirtual = type === 'VIRTUAL';
    const isFrozen = status === 'INACTIVE';
    // const isCancelled = status === 'CANCELLED';

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
              'flex bg-card-primary w-full rounded-b-3xl overflow-hidden z-30',
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
                    <SnowflakeIcon color={tw.color('primary')} />
                    <CSText style={tw.style('text-sm ml-2 text-white font-semibold')}>
                      {t('card.frozen').toUpperCase()}
                    </CSText>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>

        <ScrollView style={tw`bg-secondary -mt-6`}>
          <View style={tw.style('bg-secondary rounded-b-3xl z-10 p-6 pt-8')}>
            <View style={tw`flex-row items-center justify-evenly pt-3 pb-6`}>
              {/* Show Card Info Button */}
              <Button
                containerStyle={tw`flex-1 mr-1`}
                onPress={() => navigate(MainScreens.CardInfo, { cardId })}
                small
                theme="dark"
              >
                <EyeIcon style={tw`mr-2`} color={tw.color('primary')} />
                <CSText style={tw`text-base text-white`}>{t('card.showCardInfo')}</CSText>
              </Button>

              {/* Freeze/Unfreeze Button */}
              <Button
                containerStyle={tw.style('flex-1 ml-1', isFrozen && 'bg-white')}
                small
                theme="dark"
                disabled={freezingOrUnfreezing}
                onPress={() => {
                  if (!isFrozen) freeze();
                  else unfreeze();
                }}
              >
                {freezingOrUnfreezing ? (
                  <ActivityIndicator style={tw`h-5 w-5`} />
                ) : (
                  <View style={tw`flex-row`}>
                    <SnowflakeIcon
                      style={tw`mr-2`}
                      color={isFrozen ? tw.color('black') : tw.color('primary')}
                    />
                    {isFrozen ? (
                      <CSText style={tw`text-base text-black`}>{t('card.unfreezeCard')}</CSText>
                    ) : (
                      <CSText style={tw`text-base text-white`}>{t('card.freezeCard')}</CSText>
                    )}
                  </View>
                )}
              </Button>
            </View>

            <View>
              <CSText style={tw`text-base text-white mt-2 mb-2`}>
                {t('cardProfile.cardBalance')}
              </CSText>
              <CSText style={tw`text-2xl mt-1 mb-8 text-white`}>
                {formatCurrency(balanceAmount)}
              </CSText>

              {/* <TouchableOpacity
                style={tw`flex-row items-center pt-2 pb-2 mt-1 mb-1`}
                onPress={() => navigate(MainScreens.CardSpendControls, { cardId })}
              >
                <View style={tw`rounded p-2 bg-secondary-light`}>
                  <CardSettingsIcon color={tw.color('primary')} />
                </View>
                <CSText style={tw`flex-grow ml-2 text-sm font-medium text-white`}>
                  {t('cardProfile.spendControls')}
                </CSText>
                <ChevronIcon color={tw.color('white')} />
              </TouchableOpacity> */}

              <TouchableOpacity
                style={tw`flex-row items-center pt-2 pb-2 mt-1 mb-1`}
                onPress={() => navigate(MainScreens.CardSettings, { cardId })}
              >
                <View style={tw`rounded p-2 bg-secondary-light`}>
                  <SuspensionPointsIcon color={tw.color('primary')} />
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
                onPress={() => navigate(MainScreens.CardLostStolen, { cardId })}
              >
                <View style={tw`rounded p-2 bg-secondary-light`}>
                  <AlarmIcon />
                </View>
                <CSText style={tw`flex-grow ml-2 text-sm font-medium text-white`}>
                  {t('cardProfile.reportCardLostOrStolen')}
                </CSText>
                <ChevronIcon color={tw.color('white')} />
              </TouchableOpacity>

              {/* Apple Wallet Button */}
              {displayAppleWalletBtn && false && (
                <TouchableOpacity
                  style={tw`flex-row bg-black rounded-lg p-1 w-full items-center justify-center border-black border-2 mt-5 mb-2`}
                  onPress={() => {
                    // eslint-disable-next-line no-console
                    console.log('Add to Apple Wallet Pressed');
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
                    {t('cardProfile.limit', { amount: `${formatCurrency(dailySpendLimit)}` })}
                  </CSText>
                </View>
              </View>
              <LinearProgressBar progress={(amountSpentToday / dailySpendLimit) * 100} />
              <View style={tw`flex-row justify-between items-start`}>
                <CSText style={tw`text-lg mt-1`}>{formatCurrency(amountSpentToday)}</CSText>
                <CSText style={tw`text-sm text-black mt-1`}>
                  {t('cardProfile.remaining', { amount: `${formatCurrency(dailyRemaining)}` })}
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
                    {t('cardProfile.limit', { amount: `${formatCurrency(monthlySpendLimit)}` })}
                  </CSText>
                </View>
              </View>
              <LinearProgressBar progress={(amountSpentCurrentMonth / monthlySpendLimit) * 100} />
              <View style={tw`flex-row justify-between items-start`}>
                <CSText style={tw`text-lg mt-1`}>{formatCurrency(amountSpentCurrentMonth)}</CSText>
                <CSText style={tw`text-sm text-black mt-1`}>
                  {t('cardProfile.remaining', { amount: `${formatCurrency(monthlyRemaining)}` })}
                </CSText>
              </View>
            </View>
            <View style={tw`h-20`} />
          </View>
        </ScrollView>
      </View>
    );
  }
  return null;
};

export default CardDetailScreen;
