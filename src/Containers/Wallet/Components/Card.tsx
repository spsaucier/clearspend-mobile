import React from 'react';
import { StyleProp, View, ViewStyle, Text, TouchableOpacity, ImageBackground } from 'react-native';

import { useTranslation } from 'react-i18next';
import { parse, format } from 'date-fns';

import { Logo } from '@/Components/Svg/Logo';
import { Visa } from '@/Components/Svg/Visa';

import tw from '@/Styles/tailwind';

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

const cardBGImageLight = require('@/Assets/Images/card-bg-light.png');
const cardBGImageDark = require('@/Assets/Images/card-bg-dark.png');

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

  const darkContent = !isDisposable;

  const expirationDateFormatted =
    showSensitiveInformation &&
    expirationDate &&
    format(parse(expirationDate!, 'yyyy-MM-dd', new Date()), 'MM/yy');

  return (
    <TouchableOpacity
      key={cardId}
      style={[
        tw.style(
          'flex bg-card-primary w-full rounded-2xl shadow-xl overflow-hidden',
          isVirtual && 'bg-card-light',
          isDisposable && 'bg-card-dark',
        ),
        { aspectRatio: 328 / 208, width },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <ImageBackground
        source={isDisposable ? cardBGImageLight : cardBGImageDark}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        <View
          style={tw.style(
            'flex-1 justify-between px-5 pt-3 pb-2',
            showSensitiveInformation ? 'pb-5' : 'pb-2',
          )}
        >
          {/* Top Row */}
          <View style={tw`flex flex-row`}>
            <View style={tw`flex`}>
              <Logo
                style={tw`w-28 mt-1 mb-2`}
                color={darkContent ? tw.color('black') : tw.color('white')}
                iconColor={darkContent ? tw.color('black') : tw.color('primary-new')}
              />
              {/* Card Type */}
              <View style={tw`flex flex-row`}>
                <Text
                  style={tw.style('text-xs xxs:text-sm', darkContent ? 'text-black' : 'text-white')}
                >
                  {isVirtual && t('card.virtual').toUpperCase()}
                  {isDisposable && t('card.disposable').toUpperCase()}
                  {t('card.card').toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={tw`flex-1 items-end`}>
              <Text
                style={tw.style(
                  'text-lg xxs:text-2xl font-card mt-3',
                  darkContent ? 'text-black' : 'text-white',
                )}
              >
                {`$${balance}`}
              </Text>
              <Text
                style={tw.style('text-2xs xxs:text-xs', darkContent ? 'text-black' : 'text-white')}
              >
                {t('card.balance').toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Bottom Row */}
          <View>
            <View style={tw`flex flex-row items-end `}>
              <View style={tw`flex `}>
                <Text
                  style={tw.style(
                    'text-lg xxs:text-2xl font-card',
                    darkContent ? 'text-black' : 'text-white',
                  )}
                >
                  {showSensitiveInformation ? `${cardNumber}` : `**** ${lastDigits}`}
                </Text>
                {!!cardTitle && (
                  <Text
                    style={tw.style(
                      'text-xs xxs:text-sm mt-0 xxs:mt-1',
                      darkContent ? 'text-black' : 'text-white',
                    )}
                  >
                    {cardTitle}
                  </Text>
                )}

                {showSensitiveInformation && (
                  <View style={tw`flex-row mt-4`}>
                    <View>
                      <Text
                        style={tw.style(
                          'text-white font-spacegrotesk text-opacity-60',
                          darkContent ? 'text-black' : 'text-white',
                        )}
                      >
                        {t('card.validThru').toUpperCase()}
                      </Text>
                      <Text
                        style={tw.style(
                          'mt-1 font-card',
                          darkContent ? 'text-black' : 'text-white',
                        )}
                      >
                        {expirationDateFormatted}
                      </Text>
                    </View>
                    <View style={tw`ml-4`}>
                      <Text
                        style={tw.style(
                          'font-spacegrotesk text-opacity-60',
                          darkContent ? 'text-black' : 'text-white',
                        )}
                      >
                        {t('card.cvv').toUpperCase()}
                      </Text>
                      <Text
                        style={tw.style(
                          'text-white mt-1 font-card',
                          darkContent ? 'text-black' : 'text-white',
                        )}
                      >
                        {cvv}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <View style={tw`flex-1 items-end`}>
                {isFrozen && (
                  <View
                    style={tw.style(
                      'border py-1 px-2 rounded-full',
                      darkContent
                        ? 'border-black bg-black bg-opacity-5'
                        : 'border-white bg-white bg-opacity-10',
                    )}
                  >
                    <Text style={tw.style('text-xs', darkContent ? 'text-black' : 'text-white')}>
                      {t('card.frozen').toUpperCase()}
                    </Text>
                  </View>
                )}
                <Visa
                  style={tw`h-8 mt-1`}
                  color={darkContent ? tw.color('black') : tw.color('white')}
                />
              </View>
            </View>
            {!disabled && (
              <Text
                style={tw.style('text-xs text-center', darkContent ? 'text-black' : 'text-white')}
              >
                {t('card.viewControls')}
              </Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
