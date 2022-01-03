import React, { ReactNode, useCallback } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { format, parseISO } from 'date-fns';
import MapView, { Marker } from 'react-native-maps';

import tw from '@/Styles/tailwind';
import { ActivityIndicator, CSBottomSheet, Button, CSText } from '@/Components';
import {
  CheckCircleIconFilled,
  EditIcon,
  ExclamationIcon,
  ReceiptIcon,
  WarningIcon,
} from '@/Components/Icons';
import { formatCurrency, sentenceCase } from '@/Helpers/StringHelpers';
import { TransactionNote } from '@/Containers/Wallet/Components/TransactionNote';
import { CategoryIcon } from '@/Components/CategoryIcon';
import { useTransaction } from '@/Queries';
import { MainScreens } from '../../Navigators/NavigatorTypes';

type InfoRowProps = {
  label: string;
  value?: string;
  children?: ReactNode | string;
};

const InfoRow = ({ label = '', value = '', children }: InfoRowProps) => (
  <View style={tw`flex-row justify-between items-center mt-1`}>
    <CSText style={tw`text-sm text-gray50`}>{label}</CSText>
    {value ? <CSText style={tw`text-sm mt-4`}>{value}</CSText> : null}
    {!!children && children}
  </View>
);

const cardBGImageLight = require('@/Assets/Images/card-bg-light.png');

const TransactionDetailScreenContent = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const route = useRoute<any>();
  const { params } = route;

  const { isLoading, error, data, refetch } = useTransaction(params.transactionId);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  if (isLoading || !data) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <CSText style={tw`text-base text-error mb-2`}>{error?.message}</CSText>
      </View>
    );
  }

  const {
    accountActivityId,
    merchant,
    amount,
    status,
    activityTime,
    receipt,
    // country, note
  } = data;
  // TODO: Delete once API supports it
  const note = '';
  const country = 'USA';

  const statusFormatted = sentenceCase(status!);
  const statusPending = status === 'PENDING';
  const statusDeclined = status === 'DECLINED';
  const statusApproved = status === 'APPROVED';
  const categoryFormatted = sentenceCase(merchant?.type!);

  const transactionDateTime = format(parseISO(activityTime!), 'MMM dd, yyyy hh:mm a');
  const transactionAmount = amount?.amount;

  const latitude = merchant?.merchantLatitude;
  const longitude = merchant?.merchantLongitude;

  const handleOnReceiptPress = () => {
    if (accountActivityId) {
      if (receipt?.receiptId) {
        navigate(MainScreens.ViewReceipt, {
          accountActivityId,
          receiptId: receipt.receiptId,
          cardId: params.cardId,
        });
      } else {
        navigate(MainScreens.AddReceipt, {
          accountActivityId,
          cardId: params.cardId,
        });
      }
    }
  };

  return (
    <View style={tw`h-full`}>
      {/* Status Banner */}
      {!!status && (
        <View
          style={tw.style(
            'flex-row items-center justify-center p-2 bg-gray95 rounded-t-2xl',
            statusApproved && 'bg-primary',
            statusDeclined && 'bg-error',
            statusPending && 'bg-pending',
          )}
        >
          {statusApproved ? (
            <CheckCircleIconFilled color={tw.color('primary')} bgColor={tw.color('black')} />
          ) : statusDeclined ? (
            <ExclamationIcon color={tw.color('error')} bgColor={tw.color('white')} />
          ) : statusPending ? (
            <ExclamationIcon color={tw.color('pending')} bgColor={tw.color('black')} />
          ) : null}
          <CSText style={tw.style('ml-2 text-base text-black', statusDeclined && 'text-white')}>
            {t('wallet.transactionDetails.status', { status: statusFormatted })}
          </CSText>
        </View>
      )}

      <NativeViewGestureHandler disallowInterruption>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
          style={tw`bg-white`}
        >
          {/* Map/banner area */}
          <View style={tw`bg-secondary h-38`}>
            {!!latitude && !!longitude ? (
              <MapView
                style={tw`h-full`}
                loadingEnabled
                showsUserLocation={false}
                scrollEnabled={false}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                }}
              >
                <Marker key={0} coordinate={{ latitude, longitude }} image={{ uri: 'marker' }} />
              </MapView>
            ) : (
              <Image
                source={cardBGImageLight}
                resizeMode="cover"
                style={tw`flex-1 opacity-40 w-2/3 self-end`}
              />
            )}
          </View>

          {/* Merchant logo */}
          <View style={[tw`flex-row justify-center -top-7`]}>
            <View style={[tw`bg-white justify-center items-center h-18 w-18 rounded-full`]}>
              <View
                style={[
                  tw`bg-primary h-16 w-16 overflow-hidden items-center justify-center rounded-full`,
                ]}
              >
                {merchant?.merchantLogoUrl ? (
                  <Image
                    source={{
                      uri: merchant.merchantLogoUrl,
                    }}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                  />
                ) : (
                  <CategoryIcon style={tw`w-9 h-9`} code={merchant?.merchantCategoryCode!} />
                )}
              </View>
            </View>
          </View>

          <View style={tw`items-center`}>
            <CSText style={tw`text-black text-3xl`}>{formatCurrency(transactionAmount)}</CSText>
            <CSText style={tw`text-black text-lg my-2`}>
              {merchant?.name}
              {merchant?.type && ` • ${categoryFormatted}`}
            </CSText>
            <CSText style={tw`text-black text-xs`}>{transactionDateTime}</CSText>
          </View>

          <View style={tw`p-6`}>
            <TransactionNote note={note} transactionId={accountActivityId!} />

            <Button onPress={handleOnReceiptPress} small containerStyle={tw`bg-black mt-5`}>
              <ReceiptIcon color={tw.color('primary')} />
              <CSText style={tw`text-base text-white ml-3`}>
                {receipt?.receiptId
                  ? t('wallet.transactionDetails.viewReceipt')
                  : t('wallet.transactionDetails.addReceipt')}
              </CSText>
            </Button>
          </View>

          <CSText style={tw`text-xs text-black mt-6 bg-tan py-2 pl-6`}>
            {t('wallet.transactionDetails.merchant.title').toUpperCase()}
          </CSText>
          <View style={tw`px-6`}>
            <InfoRow
              label={t('wallet.transactionDetails.merchant.merchantName')}
              value={merchant?.name}
            />
            <InfoRow
              label={t('wallet.transactionDetails.merchant.merchantId')}
              value={merchant?.merchantNumber}
            />
            <InfoRow label={t('wallet.transactionDetails.merchant.merchantCategory')}>
              <TouchableOpacity
                onPress={() => {}}
                style={tw`flex-row justify-center items-center bg-black rounded-1 py-1 pl-2 pr-1`}
              >
                <CSText style={tw`text-primary mr-1`}>{sentenceCase(merchant?.type!)}</CSText>
                <EditIcon color={tw.color('primary')} size={18} />
              </TouchableOpacity>
            </InfoRow>
          </View>

          <CSText style={tw`text-xs text-black mt-6 bg-tan py-2 pl-6`}>
            {t('wallet.transactionDetails.details.title').toUpperCase()}
          </CSText>
          <View style={tw`px-6`}>
            <InfoRow
              label={t('wallet.transactionDetails.details.dateTime')}
              value={transactionDateTime}
            />
            <InfoRow
              label={t('wallet.transactionDetails.details.amount')}
              value={formatCurrency(transactionAmount)}
            />
            <InfoRow label={t('wallet.transactionDetails.details.location')} value={country} />
          </View>

          <View style={tw`px-6`}>
            <Button small containerStyle={tw`my-10 bg-gray95`}>
              <CSText style={tw`mr-1 text-base font-semibold text-gray50`}>
                {t('wallet.transactionDetails.report')}
              </CSText>
              <WarningIcon color={tw.color('gray50')} />
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </NativeViewGestureHandler>
    </View>
  );
};

const TransactionDetailScreen = () => (
  <CSBottomSheet snapPoints={['95%']} translucidBackground>
    <TransactionDetailScreenContent />
  </CSBottomSheet>
);

export default TransactionDetailScreen;
