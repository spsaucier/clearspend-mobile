import React, { ReactNode, useCallback, useRef } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { format, parseISO } from 'date-fns';
import MapView, { Marker } from 'react-native-maps';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Pdf from 'react-native-pdf';
import Toast from 'react-native-toast-message';

import tw from '@/Styles/tailwind';
import { ActivityIndicator, CSBottomSheet, CSText } from '@/Components';
import { CheckCircleIconFilled, ExclamationIcon, PlusCircleFilledIcon } from '@/Components/Icons';
import { detectMimeType, formatCurrency, MediaType, sentenceCase } from '@/Helpers/StringHelpers';
import { TransactionNote } from '@/Containers/Wallet/Components/TransactionNote';
import { useReceiptUri, useTransaction } from '@/Queries';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import AddReceiptPanel from './Components/AddReceiptPanel';
import useUploadReceipt from '@/Hooks/useUploadReceipt';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import AssignCategoryBottomSheet from '@/Containers/Wallet/Components/AssignCategoryBottomSheet';
import { ExpenseDetails } from '@/generated/capital';
import { useUpdateTransaction } from '@/Queries/transaction';
import { ExpenseCategoryIcon } from '@/Components/ExpenseCategoryIcon';
import { MERCHANT_CATEGORY_ICON_NAME_MAP } from '@/Components/Icons/Categories';
import { MerchantCategoryIcon } from '@/Components/MerchantCategoryIcon';

type InfoRowProps = {
  label: string;
  value?: string;
  children?: ReactNode | string;
};

const InfoRow = ({ label = '', value = '', children }: InfoRowProps) => (
  <View style={tw`flex-row justify-between items-center mt-2`}>
    <CSText style={tw`text-sm text-black-50 leading-relaxed`}>{label}</CSText>
    {value ? <CSText style={tw`text-sm leading-relaxed`}>{value}</CSText> : null}
    {!!children && children}
  </View>
);

const ReceiptPreview = ({ receiptIds }: { receiptIds: string[] }) => {
  const { data: receiptData, isFetching } = useReceiptUri('viewReceiptThumbnail', receiptIds[0]);

  return (
    <View style={tw`flex`}>
      <View style={tw`w-full h-full `}>
        {isFetching || !receiptData ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator color="black" style={tw`w-10`} />
          </View>
        ) : detectMimeType(receiptData) === MediaType.image ? (
          <Image source={{ uri: receiptData }} style={tw`w-full h-full `} resizeMode="cover" />
        ) : (
          <Pdf source={{ uri: receiptData }} singlePage style={{ width: '100%', height: '100%' }} />
        )}
      </View>
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
  const { mutate: updateTransaction, isLoading: isUpdatingTransaction } =
    useUpdateTransaction(accountActivityId);

  const onUploadReceiptFromGalleryFinished = () => {
    refetch();

    Toast.show({
      type: 'success',
      text1: t('toasts.receiptUploadedSuccessfully'),
    });
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
    card,
    merchant,
    amount,
    status,
    activityTime,
    receipt,
    notes,
    expenseDetails,
    // country
  } = data;
  // TODO: Delete once API supports it
  const country = 'USA';

  const statusFormatted = sentenceCase(status!);
  const statusPending = status === 'PENDING';
  const statusDeclined = status === 'DECLINED';
  const statusApproved = status === 'APPROVED';
  const merchantCategoryGroup = merchant?.merchantCategoryGroup ?? 'OTHER';
  const merchantCategoryName = MERCHANT_CATEGORY_ICON_NAME_MAP[merchantCategoryGroup].name;

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

  const onSelectCategory = (category: ExpenseDetails) => {
    updateTransaction({ iconRef: category.iconRef, notes: notes ?? '' });
  };

  const onTakePhotoPress = () => {
    navigate(MainScreens.AddReceipt, {
      accountActivityId,
      cardId: card?.cardId!,
    });
  };

  const onFileOrPhotoSelected = (uri: string) => {
    uploadReceipt(uri);
  };

  return (
    <View style={tw`h-full`}>
      {/* Status Banner */}
      {!!status && (
        <View
          style={tw.style(
            'flex-row items-center justify-center p-2 bg-black-5 rounded-t-2xl',
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
          {!!latitude && !!longitude ? (
            <View style={tw`bg-white h-38`}>
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
            </View>
          ) : (
            <View style={tw`h-16 bg-white`} />
          )}

          {/* Merchant logo */}
          <View style={[tw`flex-row justify-center -top-7`]}>
            <View style={[tw`bg-white justify-center items-center h-18 w-18 rounded-full`]}>
              <View
                style={[
                  tw`h-16 w-16 overflow-hidden items-center justify-center rounded-full ${
                    merchant?.merchantLogoUrl ? '' : 'bg-primary'
                  }`,
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
                  <MerchantCategoryIcon
                    style={tw`w-9 h-9`}
                    merchantCategoryGroup={merchantCategoryGroup}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={tw`items-center`}>
            <CSText style={tw`text-black text-3xl`}>{formatCurrency(transactionAmount)}</CSText>
            <CSText style={tw`text-black text-lg my-2`}>
              {merchant?.name}
              {merchant?.type && ` • ${merchantCategoryName}`}
            </CSText>
            <CSText style={tw`text-black text-xs`}>{transactionDateTime}</CSText>
          </View>

          <View style={tw`pt-6`}>
            <TransactionNote notes={notes} accountActivityId={accountActivityId!} />
          </View>

          <View style={tw`flex-row px-2 pt-6`}>
            <TouchableOpacity
              style={tw.style('flex-1 rounded overflow-hidden bg-tan justify-center m-2', {
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
              style={tw.style('flex-1 rounded bg-tan justify-center m-2', {
                aspectRatio: 2,
              })}
              onPress={onAssignCategoryModalPress}
            >
              <View style={tw`self-center justify-center items-center`}>
                {isUpdatingTransaction ? (
                  <ActivityIndicator />
                ) : expenseDetails?.iconRef && expenseDetails?.categoryName ? (
                  <>
                    <View
                      style={tw.style('bg-white items-center justify-center', {
                        height: 40,
                        width: 40,
                        borderRadius: 40,
                      })}
                    >
                      <ExpenseCategoryIcon iconRef={expenseDetails.iconRef} />
                    </View>
                    <CSText style={tw`pt-1`}>{expenseDetails.categoryName}</CSText>
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
            <InfoRow
              label={t('wallet.transactionDetails.merchant.merchantCategory')}
              value={merchantCategoryName}
            />
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
          <View style={tw`h-10`} />
        </KeyboardAwareScrollView>
      </NativeViewGestureHandler>
      <AddReceiptPanel
        ref={addReceiptPanelRef}
        onTakePhotoPress={onTakePhotoPress}
        onFileOrPhotoSelected={onFileOrPhotoSelected}
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
