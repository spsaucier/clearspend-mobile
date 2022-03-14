import React from 'react';
import { StyleProp, View, ViewStyle, ImageBackground, Platform, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import tw from '@/Styles/tailwind';

import { Logo } from '@/Components/Svg/Logo';
import { Visa } from '@/Components/Svg/Visa';
import { InfoIcon, SnowflakeIcon } from '@/Components/Icons';
import { CSText } from '@/Components';
import { formatCurrency } from '@/Helpers/StringHelpers';
import { CardOptionsButton } from '@/Containers/Wallet/Components/CardOptionsButton';

export type CardType = {
  cardId: string;
  lastDigits: string;
  cardTitle?: string;
  allocation?: string;
  balance: number;
  isFrozen: boolean;
  isVirtual: boolean;
  showSensitiveInformation?: boolean;
};

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: any;
  onCardBalanceInfoPress?: () => void;
  onCardOptionsPress?: () => void;
} & CardType;

type CardBackgroundProps = {
  children: any;
  isFrozen: boolean;
  isVirtual: boolean;
};

const cardBGImagePhysical = require('@/Assets/Images/card-physical-bg.png');
const cardBGImageVirtual = require('@/Assets/Images/card-virtual-bg.png');
const cardChip = require('@/Assets/Images/chip.png');

const CardBackground = ({ children, isFrozen, isVirtual }: CardBackgroundProps) => {
  if (isFrozen) {
    return <View style={tw`flex-1`}>{children}</View>;
  }
  return (
    <ImageBackground
      source={isVirtual ? cardBGImageVirtual : cardBGImagePhysical}
      resizeMode="cover"
      style={tw.style('flex-1')}
    >
      {children}
    </ImageBackground>
  );
};

export const Card = ({
  cardId,
  lastDigits,
  cardTitle,
  allocation,
  balance,
  isFrozen,
  isVirtual,
  style,
  onPress,
  width,
  showSensitiveInformation = false,
  onCardBalanceInfoPress,
  onCardOptionsPress,
}: Props) => {
  const { t } = useTranslation();

  const disabled = !onPress;
  const darkContent = !isFrozen;

  const Dot = () => (
    <View style={tw.style('h-1 w-1 rounded-full mr-1', isFrozen ? 'bg-white' : 'bg-black')} />
  );
  const Dots = () => (
    <View style={tw`flex-row items-center mr-2`}>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </View>
  );

  const CardNameAndAllocation = () => (
    <View style={tw`mt-4`}>
      <CSText style={tw.style('text-xl', darkContent ? 'text-black' : 'text-white')}>
        {cardTitle}
      </CSText>
      {allocation ? (
        <CSText style={tw.style('text-base mb-2', darkContent ? 'text-black' : 'text-white')}>
          {allocation}
        </CSText>
      ) : null}
    </View>
  );

  return (
    <TouchableWithoutFeedback
      key={cardId}
      style={[
        tw.style(
          `flex bg-card-primary w-full rounded-2xl ${
            Platform.OS === 'ios' ? 'shadow-xl' : ''
          } overflow-hidden`,
          isVirtual && 'bg-card-light',
          isFrozen && 'bg-card-dark',
        ),
        { aspectRatio: 1.6, width },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <CardBackground isFrozen={isFrozen} isVirtual={isVirtual}>
        <View
          style={tw.style(
            'flex-1 justify-between pr-5 pl-8 pt-3',
            showSensitiveInformation ? 'pb-5' : 'pb-4',
          )}
        >
          {/* Top Row */}
          <View style={tw`flex flex-row mt-2`}>
            <View>
              <View style={tw`flex-row items-center mt-2`}>
                <CardOptionsButton
                  theme={isFrozen ? 'dark' : 'light'}
                  onPress={onCardOptionsPress}
                />
                {isFrozen && (
                  <View style={tw.style('flex-row items-center justify-center mt-1')}>
                    <SnowflakeIcon color={tw.color('primary')} />
                    <CSText style={tw.style('text-sm ml-2 text-white font-semibold')}>
                      {t('card.frozen').toUpperCase()}
                    </CSText>
                  </View>
                )}
              </View>

              {/* Physical card chip */}
              {!showSensitiveInformation && !isVirtual && (
                <View style={tw.style('w-12 h-8 mt-8', isFrozen ? 'opacity-20' : 'opacity-100')}>
                  <Image style={[tw`w-full h-full`, { resizeMode: 'contain' }]} source={cardChip} />
                </View>
              )}

              {showSensitiveInformation && <CardNameAndAllocation />}
            </View>

            {/* ClearSpend logo, card no, card type */}
            <View style={tw.style('flex-1 items-end', isFrozen && 'opacity-30')}>
              <Logo
                style={tw`w-28 mt-1 mb-2`}
                color={tw.color(darkContent ? 'black' : 'white')}
                iconColor={darkContent ? tw.color('black') : tw.color('primary')}
              />
              {!showSensitiveInformation && (
                <View style={tw`flex-row items-center`}>
                  <Dots />
                  <CSText
                    style={tw.style('text-base mr-2', darkContent ? 'text-black' : 'text-white')}
                  >
                    {lastDigits}
                  </CSText>
                </View>
              )}
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
            {!showSensitiveInformation && <CardNameAndAllocation />}

            <View style={tw`flex-1 items-end`}>
              {showSensitiveInformation ? (
                <Visa style={tw`h-8 mt-1 mr-2`} color={tw.color(darkContent ? 'black' : 'white')} />
              ) : (
                <View style={tw`flex-row items-center`}>
                  <CSText style={tw.style('text-2xl', darkContent ? 'text-black' : 'text-white')}>
                    {formatCurrency(balance)}
                  </CSText>
                  <TouchableOpacity style={tw`p-2`} onPress={onCardBalanceInfoPress}>
                    <InfoIcon color={darkContent ? 'black' : 'white'} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </CardBackground>
    </TouchableWithoutFeedback>
  );
};
