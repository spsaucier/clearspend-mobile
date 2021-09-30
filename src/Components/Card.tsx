import { StyleProp, View, ViewStyle, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { Logo } from '@/Assets/Svg/Logo';
import { Visa } from '@/Assets/Svg/Visa';

type Props = {
  id: string;
  balance: string;
  lastDigits: string;
  isFrozen: boolean;
  cardTitle: string;
  isVirtual: boolean;
  isDisposable: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({
  id,
  balance,
  lastDigits,
  isFrozen,
  cardTitle,
  isVirtual,
  isDisposable,
  style,
}: Props) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      key={id}
      style={[
        tw.style(
          'flex justify-between bg-primary w-11/12 rounded-3xl shadow-xl px-5 pt-7 pb-2',
          isVirtual && 'bg-tertiary',
          isDisposable && 'bg-black',
          isFrozen && 'bg-gray40',
        ),
        { aspectRatio: 328 / 208 },
        style,
      ]}
      onPress={() => {}}
    >
      {/* Top Row */}
      <View style={tw`flex flex-row`}>
        <View style={tw`flex`}>
          <Logo style={tw`w-28 mt-1`} />
          <View style={tw`flex flex-row`}>
            {isVirtual && <Text style={tw`text-white`}>{t('card.virtual').toUpperCase()}</Text>}
            {isDisposable && (
              <Text style={tw`text-white`}>{t('card.disposable').toUpperCase()}</Text>
            )}
            <Text style={tw`text-white`}>{t('card.card').toUpperCase()}</Text>
          </View>
        </View>
        <View style={tw`flex-1 items-end`}>
          <Text style={tw`text-white text-2xl font-bold`}>{balance}</Text>
          <Text style={tw`text-white text-xs`}>{t('card.balance').toUpperCase()}</Text>
        </View>
      </View>

      {/* Bottom Row */}
      <View>
        <View style={tw`flex flex-row items-end`}>
          <View style={tw`flex font-card`}>
            <Text style={tw`text-white text-2xl font-card`}>
              ****
              {lastDigits}
            </Text>
            {!!cardTitle && <Text style={tw`text-white text-base`}>{cardTitle}</Text>}
          </View>
          <View style={tw`flex-1 items-end`}>
            {isFrozen && (
              <View style={tw`border py-1 px-2 rounded-full border-white bg-white bg-opacity-10`}>
                <Text style={tw`text-white text-xs`}>{t('card.frozen').toUpperCase()}</Text>
              </View>
            )}
            <Visa style={tw`h-10 mt-1`} />
          </View>
        </View>
        <Text style={tw`text-white text-xs text-center`}>{t('card.viewControls')}</Text>
      </View>
    </TouchableOpacity>
  );
};
