import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity } from 'react-native';
import { Card, formatCardNumber } from './Card';
import { CopyIconLeft } from '@/Components/Icons';
import { mixpanel } from '@/Services/utils/analytics';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { CardDetailsResponse } from '@/generated/capital';

export const CardInfoContent = ({ cardData }: { cardData: CardDetailsResponse }) => {
  const { t } = useTranslation();
  const { card, availableBalance, allocationName } = cardData;

  const { cardId, cardLine3, lastFour, type, expirationDate, cardNumber, status, address } = card;
  const { amount: balanceAmount } = availableBalance;

  const isFrozen = status === 'INACTIVE';
  const isVirtual = type === 'VIRTUAL';
  const cardTitle = cardLine3 || allocationName;

  const copyCardNumberToClipboard = () => {
    mixpanel.track('Copy Card Number');
    Clipboard.setString(cardNumber!);
  };

  const cardNumberFormatted = formatCardNumber(cardNumber);

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Card
        cardId={cardId!}
        cardNumber={cardNumber}
        expirationDate={expirationDate}
        cardTitle={cardTitle}
        balance={balanceAmount}
        lastDigits={lastFour!}
        isVirtual={isVirtual}
        isFrozen={isFrozen}
        showSensitiveInformation
      />
      {/* Card Number Section */}
      <View style={tw`mt-6`}>
        <CSText style={tw`text-white text-xs`}>{t('cardInfo.cardNumber')}</CSText>
        <TouchableOpacity
          style={tw`mt-2 p-4 bg-white rounded-md flex flex-row justify-between items-center`}
          onPress={copyCardNumberToClipboard}
        >
          <CSText style={tw`text-center text-base font-montreal`}>{cardNumberFormatted}</CSText>
          <CopyIconLeft style={tw`h-8 w-8`} />
        </TouchableOpacity>
      </View>

      {/* Address Section */}
      <View style={tw`mt-6`}>
        <CSText style={tw`text-white text-xs`}>{t('cardInfo.billingAddress')}</CSText>
        <TouchableOpacity
          style={tw`mt-2 p-4 bg-white rounded-md flex flex-row justify-between items-center`}
        >
          {!!address && (
            <View style={tw`flex`}>
              <CSText style={tw`font-montreal`}>
                {`${address.streetLine1} ${address.streetLine2}`}
              </CSText>
              <CSText style={tw`mt-1 font-montreal`}>
                {`${address.locality}, ${address.region} ${address.postalCode}, ${address.country}`}
              </CSText>
            </View>
          )}
          <CopyIconLeft style={tw`h-8 w-8`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
