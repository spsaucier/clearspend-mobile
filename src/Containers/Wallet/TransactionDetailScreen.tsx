import React, { ReactNode } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { gql, useQuery } from '@apollo/client';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/core';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

import tw from '@/Styles/tailwind';
import { ActivityIndicator, CSBottomSheet, Button } from '@/Components';
import {
  AddReceiptIcon,
  CheckCircleIcon,
  ClockCircleIcon,
  DeclinedCircleIcon,
  ReceiptIcon,
  WarningIcon,
} from '@/Components/Icons';
import { sentenceCase } from '@/Helpers/StringHelpers';
import { DashedLine } from '@/Components/DashedLine';
import { NoteInput } from '@/Containers/Wallet/Components/NoteInput';

const TRANSACTION_QUERY = gql`
  query TransactionQuery($cardId: ID!, $transactionId: ID!) {
    transaction(cardId: $cardId, transactionId: $transactionId) {
      merchantName
      merchantId
      merchantCategory
      merchantLogoUrl
      amount
      status
      date
      time
      isReceiptLinked
      country
    }
  }
`;

type InfoRowProps = {
  label: string;
  value?: string;
  children?: ReactNode | string;
};

const InfoRow = ({ label = '', value = '', children }: InfoRowProps) => (
  <View style={tw`flex-row justify-between items-center`}>
    <Text style={tw`text-sm text-gray50 mt-4`}>{label}</Text>
    {!!value && <Text style={tw`text-sm text-copyDark mt-4`}>{value}</Text>}
    {!!children && children}
  </View>
);

const TransactionDetailScreenContent = () => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const { params } = route;

  const { loading, error, data } = useQuery(TRANSACTION_QUERY, {
    variables: { cardId: params.cardId, transactionId: params.transactionId },
  });

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <Text style={tw`text-base text-error mb-2`}>{error?.message}</Text>
      </View>
    );
  }

  const {
    merchantName,
    merchantId,
    merchantCategory,
    merchantLogoUrl,
    amount,
    status,
    date,
    time,
    isReceiptLinked,
    country,
  } = data.transaction;
  const statusFormatted = sentenceCase(status);
  const statusPending = status === 'PENDING';
  const statusDeclined = status === 'DECLINED';
  const statusApproved = status === 'APPROVED';
  const categoryFormatted = sentenceCase(merchantCategory);

  return (
    <View style={tw`h-full`}>
      <View
        style={tw.style(
          'flex-row items-center justify-center p-2 bg-gray95 rounded-t-2xl',
          statusApproved && 'bg-success',
          statusDeclined && 'bg-error',
          statusPending && 'bg-pending',
        )}
      >
        {statusApproved ? (
          <CheckCircleIcon />
        ) : statusDeclined ? (
          <DeclinedCircleIcon />
        ) : statusPending ? (
          <ClockCircleIcon />
        ) : null}
        <Text style={tw`ml-2 text-base text-white`}>
          {t('wallet.transactionDetails.status', { status: statusFormatted })}
        </Text>
      </View>

      <NativeViewGestureHandler disallowInterruption>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
          style={tw`bg-white`}
        >
          {/* Transaction Status */}

          {/* Map/banner area */}
          <View style={tw`bg-gray90 h-38`}>
            <View style={tw`flex-row items-end justify-end px-4 pt-3`} />
          </View>

          {/* Merchant logo */}
          <View style={[tw`flex-row justify-center -top-7`]}>
            <View
              style={[tw`bg-white justify-center items-center h-18 w-18`, { borderRadius: 18 }]}
            >
              <View
                style={[
                  tw`bg-primary h-16 w-16 overflow-hidden items-center justify-center`,
                  { borderRadius: 16 },
                ]}
              >
                {merchantLogoUrl ? (
                  <Image
                    source={{
                      uri: merchantLogoUrl,
                    }}
                    style={tw`w-full h-full`}
                    resizeMode="contain"
                  />
                ) : (
                  <ReceiptIcon style={tw`h-8`} color={tw.color('white')} />
                )}
              </View>
            </View>
          </View>

          <View style={tw`items-center`}>
            <Text style={tw`font-bold text-black text-2xl`}>{`$${amount}`}</Text>
            <Text style={tw`text-black text-xl my-2`}>
              {merchantName}
              {merchantCategory && ` • ${categoryFormatted}`}
            </Text>
            <Text style={tw`text-gray50 text-base`}>{`${date} ${time}`}</Text>
          </View>

          <View style={tw`p-6`}>
            {isReceiptLinked ? (
              <Button onPress={() => {}} small containerStyle={tw`bg-primary`}>
                <ReceiptIcon color={tw.color('white')} />
                <Text style={tw`text-base font-bold text-white ml-2`}>
                  {t('wallet.transactionDetails.viewReceipt')}
                </Text>
              </Button>
            ) : (
              <Button onPress={() => {}} small containerStyle={tw`bg-primary`}>
                <AddReceiptIcon color={tw.color('white')} />
                <Text style={tw`text-base font-bold text-white ml-2`}>
                  {t('wallet.transactionDetails.addReceipt')}
                </Text>
              </Button>
            )}

            <DashedLine style={tw`my-6 w-full`} />

            <NoteInput />

            <Text style={tw`text-sm font-bold text-gray30 mt-6`}>
              {t('wallet.transactionDetails.merchant.title').toUpperCase()}
            </Text>
            <InfoRow
              label={t('wallet.transactionDetails.merchant.merchantName')}
              value={merchantName}
            />
            <InfoRow
              label={t('wallet.transactionDetails.merchant.merchantId')}
              value={merchantId}
            />
            <InfoRow
              label={t('wallet.transactionDetails.merchant.merchantCategory')}
              value={merchantCategory}
            />

            <Text style={tw`text-sm font-bold text-gray30 mt-6`}>
              {t('wallet.transactionDetails.details.title').toUpperCase()}
            </Text>
            <InfoRow
              label={t('wallet.transactionDetails.details.dateTime')}
              value={`${date} ${time}`}
            />
            <InfoRow label={t('wallet.transactionDetails.details.amount')} value={`$${amount}`} />
            <InfoRow label={t('wallet.transactionDetails.details.location')} value={country} />

            <Button small containerStyle={tw`mt-10 bg-gray95`}>
              <Text style={tw`mr-1 text-base font-semibold text-gray50`}>
                {t('wallet.transactionDetails.report')}
              </Text>
              <WarningIcon color={tw.color('gray50')} />
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </NativeViewGestureHandler>
    </View>
  );
};

const TransactionDetailScreen = () => (
  <CSBottomSheet
    snapPoints={[Platform.select({ ios: '95%', default: '100%' })]}
    translucidBackground
  >
    <TransactionDetailScreenContent />
  </CSBottomSheet>
);

export default TransactionDetailScreen;
