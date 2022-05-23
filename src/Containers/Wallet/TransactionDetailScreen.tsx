import React, { ReactNode, useRef } from 'react';
import { View, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/core';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { format, parseISO } from 'date-fns';
// import MapView, { Marker } from 'react-native-maps';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';

import tw from '@/Styles/tailwind';
import { ActivityIndicator, Button, CSBottomSheet, CSText } from '@/Components';
import {
  ArrowSquareOutIcon,
  CheckCircleIconFilled,
  ExclamationIcon,
  CategoryIcon,
  QuestionMarkCircleFilledIcon,
  ReceiptIcon,
} from '@/Components/Icons';
import { formatCurrency, sentenceCase } from '@/Helpers/StringHelpers';
import { TransactionNote } from '@/Containers/Wallet/Components/TransactionNote';
import { useBusiness, useTransaction, useUser } from '@/Queries';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import AddReceiptPanel from './Components/AddReceiptPanel';
import useUploadReceipt from '@/Hooks/useUploadReceipt';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import AssignCategoryBottomSheet from '@/Containers/Wallet/Components/AssignCategoryBottomSheet';
import { AccountActivityResponse, ExpenseDetails } from '@/generated/capital';
import { useUpdateTransaction } from '@/Queries/transaction';
import { MERCHANT_CATEGORY_ICON_NAME_MAP } from '@/Components/Icons/MerchantCategories';
import { MerchantCategoryIcon } from '@/Components/MerchantCategoryIcon';
import ViewReceiptThumbnail from './Receipt/ViewReceiptThumbnail';
import { getExpenseCategoryStatus } from '@/Helpers/ExpenseCategoryHelpers';
import { useExpenseCategories } from '@/Queries/expenseCategory';
import { getReasonText } from '@/Helpers/DeclineReasonHelpers';
import { ToastDisplay } from '@/Components/ToastDisplay';

type InfoRowProps = {
  label: string;
  value?: string;
  children?: ReactNode | string;
};

const InfoRow = ({ label = '', value = '', children }: InfoRowProps) => (
  <View style={tw`flex-row justify-between items-center py-1.5`}>
    <CSText style={tw`text-sm leading-tight`}>{label}</CSText>
    {value ? <CSText style={tw`text-sm leading-tight`}>{value}</CSText> : null}
    {!!children && children}
  </View>
);

export const TransactionDetailScreenContent = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const route = useRoute<any>();
  const { params } = route;
  const { transactionId: accountActivityId } = params;

  const addReceiptPanelRef = useRef<BottomSheetModal>(null);
  const assignCategoryBottomSheetRef = useRef<BottomSheetModal>(null);

  const { isLoading, error, data } = useTransaction(accountActivityId);
  const { data: expenseCategories, isLoading: isLoadingExpenseCategories } = useExpenseCategories();
  const { mutate: updateTransaction, isLoading: isUpdatingTransaction } =
    useUpdateTransaction(accountActivityId);
  const { data: business } = useBusiness();
  const { data: user } = useUser();

  const onUploadReceiptFromGalleryFinished = () => {
    Toast.show({
      type: 'success',
      text1: t('toasts.receiptUploadedSuccessfully'),
    });
  };

  const { uploadReceipt, isUploading } = useUploadReceipt({
    accountActivityId: accountActivityId!,
    onUploadFinished: onUploadReceiptFromGalleryFinished,
  });

  if (isLoading || isLoadingExpenseCategories) {
    return (
      <View style={tw`h-full items-center justify-center bg-white rounded-t-3xl`}>
        <ActivityIndicator bgColor="black" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={tw`h-full items-center justify-center bg-white rounded-t-3xl`}>
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
    syncStatus,
    declineDetails,
  }: AccountActivityResponse = data;

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
    if (syncStatus === 'SYNCED_LOCKED') {
      Toast.show({
        type: 'error',
        text1: t('wallet.transactionDetails.selectCategory.lockedTransactionError'),
      });
    } else {
      updateTransaction({ expenseCategoryId: category.expenseCategoryId, notes: notes ?? '' });
    }
  };

  const onTakePhotoPress = () => {
    navigate(MainScreens.AddReceipt, {
      accountActivityId,
      cardId: card?.cardId!,
    });
  };

  const onFileOrPhotoSelected = (uri: string, name: string, type: string) => {
    uploadReceipt(uri, name, type);
  };

  return (
    <View testID="transaction-detail-screen" style={tw`h-full`}>
      {/* Status Banner */}
      {!!status && (
        <View
          style={tw.style(
            'flex-row items-center justify-center p-2 bg-gray-5 rounded-t-2xl',
            statusApproved && 'bg-primary',
            statusDeclined && 'bg-error',
            statusPending && 'bg-pending',
          )}
        >
          {statusApproved ? (
            <CheckCircleIconFilled
              testID="transaction-status-approved"
              color={tw.color('primary')}
              bgColor={tw.color('black')}
            />
          ) : statusDeclined ? (
            <ExclamationIcon
              testID="transaction-status-declined"
              color={tw.color('error')}
              bgColor={tw.color('white')}
            />
          ) : statusPending ? (
            <ExclamationIcon
              testID="transaction-status-pending"
              color={tw.color('pending')}
              bgColor={tw.color('black')}
            />
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
              {/* <MapView */}
              {/*  style={tw`h-full`} */}
              {/*  loadingEnabled */}
              {/*  showsUserLocation={false} */}
              {/*  scrollEnabled={false} */}
              {/*  initialRegion={{ */}
              {/*    latitude, */}
              {/*    longitude, */}
              {/*    latitudeDelta: 0.002, */}
              {/*    longitudeDelta: 0.002, */}
              {/*  }} */}
              {/* > */}
              {/*  <Marker key={0} coordinate={{ latitude, longitude }} image={{ uri: 'marker' }} /> */}
              {/* </MapView> */}
            </View>
          ) : (
            <View style={tw`h-16 bg-white`} />
          )}

          {/* Merchant logo */}
          <View style={[tw`flex-row justify-center -top-3`]}>
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
                    resizeMode="contain"
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
            <CSText
              testID="transaction-amount"
              style={tw`text-black text-4xl font-light leading-loose`}
            >
              {formatCurrency(transactionAmount)}
            </CSText>
            <CSText style={tw`text-black text-lg text-sm`}>
              {merchant?.name}
              {merchant?.type && ` • ${merchantCategoryName}`}
            </CSText>
            <CSText style={tw`text-gray-75 text-xs leading-loose`}>{transactionDateTime}</CSText>
          </View>

          <View style={tw`mt-2`}>
            <TransactionNote
              notes={notes}
              accountActivityId={accountActivityId!}
              expenseCategoryId={expenseDetails?.expenseCategoryId}
            />
          </View>

          <View style={tw`flex-row px-2 pt-6`}>
            <TouchableOpacity
              testID="transaction-add-category"
              style={tw.style('flex-1 rounded bg-tan justify-center m-2', {
                aspectRatio: 2,
              })}
              onPress={onAssignCategoryModalPress}
            >
              <View style={tw`flex-1 justify-center items-center`}>
                {isUpdatingTransaction ? (
                  <ActivityIndicator />
                ) : expenseDetails?.categoryName ? (
                  <>
                    {expenseDetails && !expenseDetails?.expenseCategoryId && (
                      <QuestionMarkCircleFilledIcon style={tw`h-10`} />
                    )}
                    <CSText style={tw`text-center pt-1 text-sm`} allowFontScaling={false}>
                      {expenseDetails.categoryName}
                    </CSText>
                  </>
                ) : (
                  <View
                    testID="transaction-no-category"
                    style={tw`flex-1 justify-center items-center`}
                  >
                    <View style={tw`flex-row mb-4`}>
                      <CategoryIcon />
                    </View>
                    <CSText style={tw`text-sm`} allowFontScaling={false}>
                      {t('wallet.transactionDetails.expenseCategory')}
                    </CSText>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style('flex-1 rounded overflow-hidden bg-tan justify-center m-2', {
                aspectRatio: 2,
              })}
              onPress={onReceiptModalPress}
            >
              {thereAreReceipts ? (
                <View testID="transaction-receipt">
                  <ViewReceiptThumbnail receiptIds={receipt!.receiptId!} />
                </View>
              ) : (
                <View
                  testID="transaction-no-receipt"
                  style={tw`flex-1 justify-center items-center`}
                >
                  <View style={tw`flex-row mb-4`}>
                    <ReceiptIcon />
                  </View>
                  <CSText style={tw`text-sm`} allowFontScaling={false}>
                    {t('wallet.transactionDetails.addReceipt')}
                  </CSText>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={tw`self-center justify-center items-center`}>
            {expenseDetails &&
            getExpenseCategoryStatus(expenseDetails?.expenseCategoryId, expenseCategories) ===
              'DISABLED' ? (
              <View style={tw`flex-row mt-2 h-15 w-89 bg-lightError justify-between items-center`}>
                <ExclamationIcon bgColor={tw.color('error')} style={tw`ml-4`} />
                <CSText style={tw`text-xs pr-2 text-error ml-2 leading-4 flex-1 flex-shrink`}>
                  {t('wallet.transactionDetails.unsupportedCategoryError')}
                </CSText>
              </View>
            ) : null}
          </View>
          <View style={tw`self-center justify-center items-center`}>
            {declineDetails ? (
              <View
                style={tw`bg-lightError flex-row mt-2 h-15 w-89 justify-between items-center rounded-sm`}
              >
                <ExclamationIcon bgColor={tw.color('error')} style={tw`ml-4`} />
                <CSText style={tw`text-error text-xs pr-2 ml-2 leading-4 flex-1 flex-shrink`}>
                  {getReasonText(declineDetails)}
                </CSText>
              </View>
            ) : null}
          </View>
          <CSText style={tw`text-xs text-gray-75 bg-tan px-5 py-2 uppercase tracking-widest my-3`}>
            {t('wallet.transactionDetails.merchant.title').toUpperCase()}
          </CSText>
          <View style={tw`px-5`}>
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

          <CSText style={tw`text-xs text-gray-75 bg-tan px-5 py-2 uppercase tracking-widest my-3`}>
            {t('wallet.transactionDetails.details.title').toUpperCase()}
          </CSText>
          <View style={tw`px-5`}>
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
          <View style={tw`mx-6`}>
            {status === 'APPROVED' ? (
              <Button
                containerStyle={tw`bg-tan justify-between px-5 h-10 mt-7`}
                onPress={() => {
                  Linking.openURL(
                    `https://share.hsforms.com/169oyZhC0RsOCNdyJSgq2Iwc7tw6?TICKET.transaction_id=${encodeURIComponent(
                      accountActivityId!,
                    )}&company=${encodeURIComponent(
                      business?.legalName!,
                    )}&email=${encodeURIComponent(user?.email!)}`,
                  ).catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error('Failed to open report issue form:', err);
                  });
                }}
              >
                <CSText style={tw`text-sm`}>{t('wallet.transactionDetails.reportIssue')}</CSText>
                <ArrowSquareOutIcon color={tw.color('black')} />
              </Button>
            ) : null}
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
  <>
    <CSBottomSheet snapPoints={['96%']} translucidBackground>
      <TransactionDetailScreenContent />
    </CSBottomSheet>
    {Platform.OS === 'ios' ? <ToastDisplay /> : null}
  </>
);

export default TransactionDetailScreen;
