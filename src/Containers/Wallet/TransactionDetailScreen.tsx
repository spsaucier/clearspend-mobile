import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { format, parseISO } from 'date-fns';
import MapView, { Marker } from 'react-native-maps';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { launchImageLibrary } from 'react-native-image-picker';

import tw from '@/Styles/tailwind';
import { ActivityIndicator, CSBottomSheet, Button, CSText } from '@/Components';
import {
  CheckCircleIconFilled,
  EditIcon,
  ExclamationIcon,
  PlusCircleFilledIcon,
  WarningIcon,
} from '@/Components/Icons';
import { formatCurrency, sentenceCase } from '@/Helpers/StringHelpers';
import { TransactionNote } from '@/Containers/Wallet/Components/TransactionNote';
import { CategoryIcon } from '@/Components/CategoryIcon';
import { useReceiptUri, useTransaction } from '@/Queries';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import AddReceiptPanel from './Components/AddReceiptPanel';
import useUploadReceipt from '@/Hooks/useUploadReceipt';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import AssignCategoryBottomSheet from '@/Containers/Wallet/Components/AssignCategoryBottomSheet';

type InfoRowProps = {
  label: string;
  value?: string;
  children?: ReactNode | string;
};

const InfoRow = ({ label = '', value = '', children }: InfoRowProps) => (
  <View style={tw`flex-row justify-between items-center mt-2`}>
    <CSText style={tw`text-sm text-gray50 leading-relaxed`}>{label}</CSText>
    {value ? <CSText style={tw`text-sm leading-relaxed`}>{value}</CSText> : null}
    {!!children && children}
  </View>
);

const cardBGImageLight = require('@/Assets/Images/card-bg-light.png');

const ReceiptPreview = ({ receiptIds }: { receiptIds: string[] }) => {
  const { data: imageData, isFetching } = useReceiptUri('viewReceiptThumbnail', receiptIds[0]);

  if (isFetching || !imageData) {
    return (
      <View style={tw`justify-center items-center`}>
        <ActivityIndicator color="black" style={tw`w-10`} />
      </View>
    );
  }

  return (
    <View style={tw`flex`}>
      <Image source={{ uri: imageData }} style={tw`w-full h-full `} resizeMode="cover" />
      <View
        style={tw`rounded-full bg-white h-6 w-6 justify-center items-center absolute right-2 top-2`}
      >
        <CSText>{receiptIds.length}</CSText>
      </View>
    </View>
  );
};

const TransactionDetailScreenContent = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const route = useRoute<any>();
  const { params } = route;
  const { transactionId: accountActivityId } = params;

  const addReceiptPanelRef = useRef<BottomSheetModal>(null);
  const assignCategoryBottomSheetRef = useRef<BottomSheetModal>(null);
  const { isLoading, error, data, refetch } = useTransaction(accountActivityId);

  // TODO temp category state replace with backend
  const [transactionCategory, setTransactionCategory] = useState<string | null>(null);

  const onUploadReceiptFromGalleryFinished = () => {
    refetch();
  };

  const { uploadReceipt, isUploading } = useUploadReceipt({
    accountActivityId: accountActivityId!,
    onUploadFinished: onUploadReceiptFromGalleryFinished,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (isLoading || !data) {
    return (
      <View style={tw`h-full items-center justify-center p-6`}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`h-full items-center justify-center p-6`}>
        <CSText style={tw`text-base text-error mb-2`}>{error?.message}</CSText>
      </View>
    );
  }

  const {
    merchant,
    amount,
    status,
    activityTime,
    receipt,
    notes,
    // country
  } = data;
  // TODO: Delete once API supports it
  const country = 'USA';

  const statusFormatted = sentenceCase(status!);
  const statusPending = status === 'PENDING';
  const statusDeclined = status === 'DECLINED';
  const statusApproved = status === 'APPROVED';
  const merchantCategoryFormatted = sentenceCase(merchant?.type!);

  const transactionDateTime = format(parseISO(activityTime!), 'MMM dd, yyyy hh:mm a');
  const transactionAmount = amount?.amount;

  const latitude = merchant?.merchantLatitude;
  const longitude = merchant?.merchantLongitude;

  const thereAreReceipts = (receipt?.receiptId && receipt.receiptId.length > 0) || false;

  const onReceiptModalPress = () => {
    if (thereAreReceipts) {
      navigate(MainScreens.ViewReceipt, {
        accountActivityId: accountActivityId!,
        receiptIds: receipt?.receiptId!,
        cardId: params.cardId,
      });
    } else {
      addReceiptPanelRef.current?.present();
    }
  };

  const onAssignCategoryModalPress = () => {
    assignCategoryBottomSheetRef.current?.present();
  };

  const onSelectCategory = (category: any) => {
    setTransactionCategory(category);
  };

  const onSelectAddPhotosFromGalleryPress = async () => {
    addReceiptPanelRef.current?.close();
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    const { assets } = result;

    if (!assets) return;

    const [first] = assets!;
    const { uri } = first;

    uploadReceipt(uri!);
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
                  tw`h-16 w-16 overflow-hidden items-center justify-center rounded-full ${merchant?.merchantLogoUrl ? '' : 'bg-primary'}`,
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
              {merchant?.type && ` • ${merchantCategoryFormatted}`}
            </CSText>
            <CSText style={tw`text-black text-xs`}>{transactionDateTime}</CSText>
          </View>

          <View style={tw`pt-6`}>
            <TransactionNote note={notes} transactionId={accountActivityId!} />
          </View>

          <View style={tw`flex-row px-2 pt-6`}>
            <TouchableOpacity
              style={tw.style('flex-1 rounded overflow-hidden bg-gray90 justify-center m-2', {
                aspectRatio: 2,
              })}
              onPress={onReceiptModalPress}
            >
              {thereAreReceipts ? (
                <ReceiptPreview receiptIds={receipt!.receiptId!} />
              ) : (
                <View style={tw`self-center justify-center items-center`}>
                  <PlusCircleFilledIcon />
                  <CSText style={tw`pt-2`}>{t('wallet.transactionDetails.addReceipt')}</CSText>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style('flex-1 rounded bg-gray90 justify-center m-2', {
                aspectRatio: 2,
              })}
              onPress={onAssignCategoryModalPress}
            >
              <View style={tw`self-center justify-center items-center`}>
                {transactionCategory ? (
                  <>
                    <View
                      style={tw.style('bg-white items-center justify-center', {
                        height: 40,
                        width: 40,
                        borderRadius: 40,
                      })}
                    >
                      {/* @ts-ignore todo don't pass the real component/data like this */}
                      <transactionCategory.CategoryIcon size={24} />
                    </View>

                    {/* @ts-ignore todo don't pass the real component/data like this */}
                    <CSText style={tw`pt-1`}>{transactionCategory.categoryName}</CSText>
                  </>
                ) : (
                  <>
                    <PlusCircleFilledIcon />
                    <CSText style={tw`pt-2`}>
                      {t('wallet.transactionDetails.assignCategory')}
                    </CSText>
                  </>
                )}
              </View>
            </TouchableOpacity>
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
      <AddReceiptPanel
        ref={addReceiptPanelRef}
        accountActivityId={accountActivityId}
        onSelectPhotoPress={onSelectAddPhotosFromGalleryPress}
      />
      <AssignCategoryBottomSheet
        ref={assignCategoryBottomSheetRef}
        onSelectCategory={onSelectCategory}
      />
      <ActivityOverlay
        visible={isUploading}
        message={t('wallet.receipt.uploadingReceipt')}
        subMessage={t('wallet.receipt.uploadingReceiptTime')}
      />
    </View>
  );
};

const TransactionDetailScreen = () => (
  <CSBottomSheet snapPoints={['95%']} showHandle={false} translucidBackground>
    <TransactionDetailScreenContent />
  </CSBottomSheet>
);

export default TransactionDetailScreen;
