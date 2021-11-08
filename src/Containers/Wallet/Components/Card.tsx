import React from 'react';
import { StyleProp, View, ViewStyle, Text, TouchableOpacity, ImageBackground } from 'react-native';

import { useTranslation } from 'react-i18next';
import { parse, format } from 'date-fns';

import tw from '@/Styles/tailwind';
import { Logo } from '@/Components/Svg/Logo';
import { Visa } from '@/Components/Svg/Visa';

export type CardType = {
  cardId: string;
  cardNumber?: string;
  lastDigits: string;
  cardTitle: string;
  expirationDate?: string;
  cvv?: string;
  balance: string;
  isFrozen: boolean;
  isVirtual: boolean;
  isDisposable: boolean;
  showSensitiveInformation?: boolean;
};

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: any;
} & CardType;

const cardBGImageOverlay = require('@/Assets/Images/cardPattern.png');

export const Card = ({
  cardId,
  cardNumber,
  lastDigits,
  cardTitle,
  expirationDate,
  cvv,
  balance,
  isFrozen,
  isVirtual,
  isDisposable,
  style,
  onPress,
  width,
  showSensitiveInformation = false,
}: Props) => {
  const { t } = useTranslation();

  const disabled = !onPress;

  const expirationDateFormatted =
    showSensitiveInformation &&
    expirationDate &&
    format(parse(expirationDate!, 'yyyy-MM-dd', new Date()), 'MM/yy');

  return (
    <TouchableOpacity
      key={cardId}
      style={[
        tw.style(
          'flex bg-primary w-full rounded-3xl shadow-xl overflow-hidden',
          isVirtual && 'bg-tertiary',
          isDisposable && 'bg-black',
          isFrozen && 'bg-gray40',
        ),
        { aspectRatio: 328 / 208, width },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <ImageBackground
        imageStyle={tw`opacity-30`}
        source={cardBGImageOverlay}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 justify-between px-5 pt-7 pb-2`}>
          {/* Top Row */}
          <View style={tw`flex flex-row`}>
            <View style={tw`flex`}>
              <Logo style={tw`w-28 mt-1`} />
              <View style={tw`flex flex-row`}>
                {isVirtual && (
                  <Text style={tw`text-white `}>{t('card.virtual').toUpperCase()}</Text>
                )}
                {isDisposable && (
                  <Text style={tw`text-white`}>{t('card.disposable').toUpperCase()}</Text>
                )}
                <Text style={tw`text-white`}>{t('card.card').toUpperCase()}</Text>
              </View>
            </View>
            <View style={tw`flex-1 items-end`}>
              <Text style={tw`text-white text-2xl font-card`}>{`$${balance}`}</Text>
              <Text style={tw`text-white text-xs`}>{t('card.balance').toUpperCase()}</Text>
            </View>
          </View>

          {/* Bottom Row */}
          <View>
            <View style={tw`flex flex-row items-end `}>
              <View style={tw`flex `}>
                <Text style={tw`text-white text-2xl font-card`}>
                  {showSensitiveInformation ? `${cardNumber}` : `**** ${lastDigits}`}
                </Text>
                {!!cardTitle && (
                  <Text style={tw`text-white text-base font-card mt-1`}>{cardTitle}</Text>
                )}

                {showSensitiveInformation && (
                  <View style={tw`flex-row mt-4`}>
                    <View>
                      <Text style={tw`text-white font-spacegrotesk text-opacity-60`}>
                        {t('card.validThru').toUpperCase()}
                      </Text>
                      <Text style={tw`text-white mt-1`}>{expirationDateFormatted}</Text>
                    </View>
                    <View style={tw`ml-4`}>
                      <Text style={tw`text-white font-spacegrotesk text-opacity-60`}>
                        {t('card.cvv').toUpperCase()}
                      </Text>
                      <Text style={tw`text-white mt-1`}>{cvv}</Text>
                    </View>
                  </View>
                )}
              </View>

              <View style={tw`flex-1 items-end`}>
                {isFrozen && (
                  <View
                    style={tw`border py-1 px-2 rounded-full border-white bg-white bg-opacity-10`}
                  >
                    <Text style={tw`text-white text-xs`}>{t('card.frozen').toUpperCase()}</Text>
                  </View>
                )}
                <Visa style={tw`h-10 mt-1`} />
              </View>
            </View>
            {!disabled && (
              <Text style={tw`text-white text-xs text-center`}>{t('card.viewControls')}</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
