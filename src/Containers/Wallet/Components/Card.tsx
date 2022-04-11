import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import tw from '@/Styles/tailwind';

import { Logo } from '@/Components/Svg/Logo';
import { Visa } from '@/Components/Svg/Visa';
import { InfoIcon, SnowflakeIcon } from '@/Components/Icons';
import { CSText, CSTextProps } from '@/Components/Text';
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

  const CardNameAndAllocation = ({
    className = '',
    titleProps,
    allocationProps,
  }: {
    className?: string;
    titleProps?: CSTextProps;
    allocationProps?: CSTextProps;
  }) => (
    <View style={tw.style(`mb-2`, className)}>
      <CSText
        style={tw.style('text-xl', darkContent ? 'text-black' : 'text-white')}
        {...titleProps}
      >
        {cardTitle}
      </CSText>
      {allocation ? (
        <CSText
          style={tw.style('text-base mt-0.5', darkContent ? 'text-black' : 'text-white')}
          {...allocationProps}
        >
          {allocation}
        </CSText>
      ) : null}
    </View>
  );

  return (
    <TouchableOpacity
      onLongPress={() => {}}
      activeOpacity={0.8}
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
            'flex-1 justify-between pr-5',
            showSensitiveInformation ? 'pb-3 pl-7 pt-2' : 'pb-4 pl-8 pt-3',
          )}
        >
          {/* Physical card chip */}
          {!showSensitiveInformation && !isVirtual && (
            <View style={tw`absolute inset-0`}>
              <View
                style={tw.style('w-12 h-8 my-auto ml-8', isFrozen ? 'opacity-20' : 'opacity-100')}
              >
                <Image style={[tw`w-full h-full`, { resizeMode: 'contain' }]} source={cardChip} />
              </View>
            </View>
          )}

          {/* Top Row */}
          <View style={tw`mt-2`}>
            <View style={tw`flex w-full flex-row`}>
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
              <View style={tw`ml-auto`}>
                {/* ClearSpend logo, card no, card type */}
                <View style={tw.style('flex-1 items-end', isFrozen && 'opacity-30')}>
                  <Logo
                    style={tw`w-28 mt-1 mb-1`}
                    color={tw.color(darkContent ? 'black' : 'white')}
                    iconColor={darkContent ? tw.color('black') : tw.color('primary')}
                  />
                  {!showSensitiveInformation && (
                    <View style={tw`flex-row items-center my-1`}>
                      <Dots />
                      <CSText
                        style={tw.style('mr-2', darkContent ? 'text-black' : 'text-white')}
                        allowFontScaling={false}
                      >
                        {lastDigits}
                      </CSText>
                    </View>
                  )}
                  {isVirtual && (
                    <CSText
                      style={tw.style(
                        'text-xs xxs:text-sm mr-2 text-right',
                        darkContent ? 'text-black' : 'text-white',
                      )}
                      allowFontScaling={false}
                      numberOfLines={1}
                    >
                      {t('card.virtual')}
                    </CSText>
                  )}
                </View>
              </View>
            </View>
            {showSensitiveInformation && (
              <CardNameAndAllocation
                className="mt-4"
                titleProps={{ numberOfLines: 1 }}
                allocationProps={{ numberOfLines: 1, allowFontScaling: false }}
              />
            )}
          </View>

          {/* Bottom Row */}
          <View style={tw.style('flex flex-row items-end', isFrozen && 'opacity-30')}>
            {!showSensitiveInformation && (
              <CardNameAndAllocation
                className="flex-shrink-1"
                titleProps={{ numberOfLines: 1 }}
                allocationProps={{ allowFontScaling: false }}
              />
            )}

            <View style={tw`flex-grow-1 items-end`}>
              {showSensitiveInformation ? (
                <Visa style={tw`h-8 mt-1 mr-2`} color={tw.color(darkContent ? 'black' : 'white')} />
              ) : (
                <View style={tw`flex-row items-center pl-2 ml-auto mb-2`}>
                  <CSText
                    style={tw.style('text-2xl', darkContent ? 'text-black' : 'text-white')}
                    numberOfLines={1}
                    allowFontScaling={false}
                  >
                    {formatCurrency(balance)}
                  </CSText>
                  <TouchableOpacity onPress={onCardBalanceInfoPress}>
                    <InfoIcon color={darkContent ? 'black' : 'white'} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </CardBackground>
    </TouchableOpacity>
  );
};
