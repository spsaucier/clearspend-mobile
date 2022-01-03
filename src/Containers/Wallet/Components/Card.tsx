import React from 'react';
import { StyleProp, View, ViewStyle, TouchableOpacity, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { parse, format } from 'date-fns';

import tw from '@/Styles/tailwind';

import { Logo } from '@/Components/Svg/Logo';
import { Visa } from '@/Components/Svg/Visa';
import { SnowflakeIcon } from '@/Components/Icons';
import { CSText } from '@/Components';
import { formatCurrency } from '@/Helpers/StringHelpers';

export type CardType = {
  cardId: string;
  cardNumber?: string;
  lastDigits: string;
  cardTitle: string;
  expirationDate?: string;
  balance: number;
  isFrozen: boolean;
  isVirtual: boolean;
  showSensitiveInformation?: boolean;
};

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: any;
} & CardType;

const cardBGImageDark = require('@/Assets/Images/card-bg-dark.png');

export const formatCardNumber = (cardNo: string | undefined) => {
  if (cardNo && cardNo.length > 0 && cardNo.length % 4 === 0) {
    return cardNo.replace(/(.{4})/g, '$1 ');
  }
  return '';
};

export const Card = ({
  cardId,
  cardNumber,
  lastDigits,
  cardTitle,
  expirationDate,
  balance,
  isFrozen,
  isVirtual,
  style,
  onPress,
  width,
  showSensitiveInformation = false,
}: Props) => {
  const { t } = useTranslation();

  const disabled = !onPress;
  const darkContent = !isFrozen;

  const expirationDateFormatted =
    showSensitiveInformation &&
    expirationDate &&
    format(parse(expirationDate!, 'yyyy-MM-dd', new Date()), 'MM/yy');

  const cardNumberFormatted = formatCardNumber(cardNumber);

  const cvv = '000'; // TODO Get from I2C

  return (
    <TouchableOpacity
      key={cardId}
      style={[
        tw.style(
          'flex bg-card-primary w-full rounded-2xl shadow-xl overflow-hidden',
          isVirtual && 'bg-card-light',
          isFrozen && 'bg-card-dark',
        ),
        { aspectRatio: 328 / 208, width },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <ImageBackground source={cardBGImageDark} resizeMode="cover" style={tw`flex-1`}>
        <View
          style={tw.style(
            'flex-1 justify-between px-5 pt-3',
            showSensitiveInformation ? 'pb-5' : 'pb-4',
          )}
        >
          {/* Top Row */}
          <View style={tw`flex flex-row`}>
            <View style={tw`flex mt-4`}>
              {isFrozen && (
                <View style={tw.style('flex-row items-center justify-center mt-1')}>
                  <SnowflakeIcon color={tw.color('primary')} />
                  <CSText style={tw.style('text-sm ml-2 text-white font-semibold')}>
                    {t('card.frozen').toUpperCase()}
                  </CSText>
                </View>
              )}
            </View>

            {/* ClearSpend logo, card no, card type */}
            <View style={tw.style('flex-1 items-end', isFrozen && 'opacity-30')}>
              <Logo
                style={tw`w-28 mt-1 mb-2`}
                color={tw.color(darkContent ? 'black' : 'white')}
                iconColor={darkContent ? tw.color('black') : tw.color('primary')}
              />
              <CSText style={tw.style('text-base mr-2', darkContent ? 'text-black' : 'text-white')}>
                {showSensitiveInformation ? cardNumberFormatted : `•••• ${lastDigits}`}
              </CSText>
              {isVirtual && (
                <CSText
                  style={tw.style(
                    'text-xs xxs:text-sm mr-2 mt-1',
                    darkContent ? 'text-black' : 'text-white',
                  )}
                >
                  {t('card.virtual')}
                </CSText>
              )}
            </View>
          </View>

          {/* Bottom Row */}
          <View style={tw.style('flex flex-row items-end', isFrozen && 'opacity-30')}>
            <View>
              <CSText style={tw.style('text-xl mb-2', darkContent ? 'text-black' : 'text-white')}>
                {cardTitle}
              </CSText>

              {!showSensitiveInformation && (
                <CSText style={tw.style('text-2xl', darkContent ? 'text-black' : 'text-white')}>
                  {formatCurrency(balance)}
                </CSText>
              )}

              {showSensitiveInformation && (
                <View style={tw`flex-row mt-4`}>
                  <View>
                    <CSText style={tw.style('text-2xs', darkContent ? 'text-black' : 'text-white')}>
                      {t('card.validThru').toUpperCase()}
                    </CSText>
                    <CSText style={tw.style('mt-1', darkContent ? 'text-black' : 'text-white')}>
                      {expirationDateFormatted}
                    </CSText>
                  </View>
                  <View style={tw`ml-4`}>
                    <CSText style={tw.style('text-2xs', darkContent ? 'text-black' : 'text-white')}>
                      {t('card.cvv').toUpperCase()}
                    </CSText>
                    <CSText
                      style={tw.style('text-white mt-1', darkContent ? 'text-black' : 'text-white')}
                    >
                      {cvv}
                    </CSText>
                  </View>
                </View>
              )}
            </View>

            <View style={tw`flex-1 items-end`}>
              <Visa style={tw`h-8 mt-1 mr-2`} color={tw.color(darkContent ? 'black' : 'white')} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
