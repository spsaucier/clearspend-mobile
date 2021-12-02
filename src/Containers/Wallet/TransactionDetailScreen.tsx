import React, { ReactNode } from 'react';
import { View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { gql, useQuery } from '@apollo/client';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/core';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { format, parseISO } from 'date-fns';

import tw from '@/Styles/tailwind';
import { ActivityIndicator, CSBottomSheet, Button } from '@/Components';
import {
  CheckCircleIconFilled,
  EditIcon,
  ExclamationIcon,
  ReceiptIcon,
  WarningIcon,
} from '@/Components/Icons';
import { sentenceCase } from '@/Helpers/StringHelpers';
import { NoteInput } from '@/Containers/Wallet/Components/NoteInput';

const TRANSACTION_QUERY = gql`
  query TransactionDetailQuery($accountActivityId: ID!) {
    transactionDetail(accountActivityId: $accountActivityId)
      @rest(type: "Transaction", path: "/users/account-activity/{args.accountActivityId}") {
      accountActivityId
      activityTime
      merchant {
        merchantId: merchantNumber
        name
        type
        merchantIconUrl
      }
      status
      amount {
        currency
        amount
      }
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
  <View style={tw`flex-row justify-between items-center mt-1`}>
    <Text style={tw`text-sm text-gray50`}>{label}</Text>
    {value ? <Text style={tw`text-sm text-copyDark mt-4`}>{value}</Text> : null}
    {!!children && children}
  </View>
);

const TransactionDetailScreenContent = () => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const { params } = route;

  const { loading, error, data } = useQuery(TRANSACTION_QUERY, {
    variables: { cardId: params.cardId, accountActivityId: params.transactionId },
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

  const { merchant, amount, status, activityTime, isReceiptLinked, country } =
    data.transactionDetail;

  const statusFormatted = sentenceCase(status);
  const statusPending = status === 'PENDING';
  const statusDeclined = status === 'DECLINED';
  const statusApproved = status === 'APPROVED';
  const categoryFormatted = sentenceCase(merchant?.type);

  const transactionDateTime = format(parseISO(activityTime), 'MMM dd, yyyy hh:mm a');
  const { amount: transactionAmount } = amount;
  return (
    <View style={tw`h-full`}>
      {/* Status Banner */}
      <View
        style={tw.style(
          'flex-row items-center justify-center p-2 bg-gray95 rounded-t-2xl',
          statusApproved && 'bg-primary-new',
          statusDeclined && 'bg-error',
          statusPending && 'bg-pending',
        )}
      >
        {statusApproved ? (
          <CheckCircleIconFilled color={tw.color('primary-new')} bgColor={tw.color('black')} />
        ) : statusDeclined ? (
          <ExclamationIcon color={tw.color('error')} bgColor={tw.color('white')} />
        ) : statusPending ? (
          <ExclamationIcon color={tw.color('pending')} bgColor={tw.color('black')} />
        ) : null}
        <Text style={tw.style('ml-2 text-base text-black', statusDeclined && 'text-white')}>
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
            <View style={[tw`bg-white justify-center items-center h-18 w-18 rounded-full`]}>
              <View
                style={[
                  tw`bg-primary-new h-16 w-16 overflow-hidden items-center justify-center rounded-full`,
                ]}
              >
                {merchant.merchantIconUrl ? (
                  <Image
                    source={{
                      uri: merchant.merchantIconUrl,
                    }}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                  />
                ) : (
                  <ReceiptIcon style={tw`h-6`} color={tw.color('black')} />
                )}
              </View>
            </View>
          </View>

          <View style={tw`items-center`}>
            <Text style={tw`text-black text-3xl`}>{`$${transactionAmount.toFixed(2)}`}</Text>
            <Text style={tw`text-black text-lg my-2`}>
              {merchant.name}
              {merchant.type && ` • ${categoryFormatted}`}
            </Text>
            <Text style={tw`text-black text-xs`}>{transactionDateTime}</Text>
          </View>

          <View style={tw`p-6`}>
            <NoteInput />

            <Button onPress={() => {}} small containerStyle={tw`bg-black mt-5`}>
              <ReceiptIcon color={tw.color('primary-new')} />
              <Text style={tw`text-base text-white ml-3`}>
                {isReceiptLinked
                  ? t('wallet.transactionDetails.viewReceipt')
                  : t('wallet.transactionDetails.addReceipt')}
              </Text>
            </Button>
          </View>

          <Text style={tw`text-xs text-black mt-6 bg-gray90 py-2 pl-6`}>
            {t('wallet.transactionDetails.merchant.title').toUpperCase()}
          </Text>
          <View style={tw`px-6`}>
            <InfoRow
              label={t('wallet.transactionDetails.merchant.merchantName')}
              value={merchant.name}
            />
            <InfoRow
              label={t('wallet.transactionDetails.merchant.merchantId')}
              value={merchant.merchantId}
            />
            <InfoRow label={t('wallet.transactionDetails.merchant.merchantCategory')}>
              <TouchableOpacity
                onPress={() => {}}
                style={tw`flex-row justify-center items-center bg-black rounded-1 py-1 pl-2 pr-1`}
              >
                <Text style={tw`text-primary-new mr-1`}>{sentenceCase(merchant.type)}</Text>
                <EditIcon color={tw.color('primary-new')} size={18} />
              </TouchableOpacity>
            </InfoRow>
          </View>

          <Text style={tw`text-xs text-black mt-6 bg-gray90 py-2 pl-6`}>
            {t('wallet.transactionDetails.details.title').toUpperCase()}
          </Text>
          <View style={tw`px-6`}>
            <InfoRow
              label={t('wallet.transactionDetails.details.dateTime')}
              value={transactionDateTime}
            />
            <InfoRow
              label={t('wallet.transactionDetails.details.amount')}
              value={`$${transactionAmount.toFixed(2)}`}
            />
            <InfoRow label={t('wallet.transactionDetails.details.location')} value={country} />
          </View>

          <View style={tw`px-6`}>
            <Button small containerStyle={tw`my-10 bg-gray95`}>
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
