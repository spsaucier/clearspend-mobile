import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';

import tw from '@/Styles/tailwind';
import { CloseIcon, MinusCircleFilledIcon, PlusCircleFilledIcon } from '@/Components/Icons';
import { CSText } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import AddReceiptPanel from '../Components/AddReceiptPanel';
import useUploadReceipt from '@/Hooks/useUploadReceipt';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import ViewReceiptCarousel from './ViewReceiptCarousel';

const ViewReceiptScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const { accountActivityId, receiptIds, cardId } = params as any;
  const [currentReceiptId, setCurrentReceiptId] = useState(receiptIds[0]);

  const [controlsEnabled, setControlsEnabled] = useState(true);
  const addReceiptPanelRef = useRef<BottomSheetModal>(null);

  const onUploadReceiptFromGalleryFinished = () => {
    Toast.show({
      type: 'success',
      text1: t('toasts.receiptUploadedSuccessfully'),
    });

    navigation.navigate(MainScreens.TransactionDetails, {
      cardId,
      transactionId: accountActivityId,
    });
  };

  const { uploadReceipt, isUploading } = useUploadReceipt({
    accountActivityId: accountActivityId!,
    onUploadFinished: onUploadReceiptFromGalleryFinished,
  });

  const onAddAnotherReceiptPress = () => {
    addReceiptPanelRef.current?.present();
  };

  const onDeleteReceiptPress = () => {
    navigation.navigate(MainScreens.DeleteReceipt, {
      cardId,
      accountActivityId,
      receiptId: currentReceiptId,
    });
  };

  const onTakePhotoPress = () => {
    navigation.navigate(MainScreens.AddReceipt, {
      accountActivityId,
      cardId,
    });
  };

  const onFileOrPhotoSelected = (uri: string, name: string, type: string) => {
    uploadReceipt(uri, name, type);
  };

  const onCurrentReceiptChanged = (id: string) => {
    setCurrentReceiptId(id);
    setControlsEnabled(true);
  };

  return (
    <View style={tw`h-full bg-black/75`}>
      <ViewReceiptCarousel
        receiptIds={receiptIds}
        currentReceiptId={currentReceiptId}
        onCurrentReceiptChanged={onCurrentReceiptChanged}
        onReceiptPress={() => {
          setControlsEnabled(!controlsEnabled);
        }}
      />
      {controlsEnabled && (
        <SafeAreaView>
          <TouchableOpacity
            style={tw`self-end`}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CloseIcon style={tw`mr-4 mt-6`} size={32} color={tw.color('white')} />
          </TouchableOpacity>
        </SafeAreaView>
      )}

      {controlsEnabled && (
        <SafeAreaView style={tw`absolute w-full bottom-20`} edges={['bottom']}>
          <TouchableOpacity
            style={tw`flex-row bg-white rounded-full items-center px-2 py-1 self-end m-4`}
            onPress={onAddAnotherReceiptPress}
          >
            <PlusCircleFilledIcon />
            <CSText style={tw`ml-1 text-sm`}>{t('wallet.receipt.addAnotherReceipt')}</CSText>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row bg-white rounded-full items-center px-2 py-1 self-end mr-4`}
            onPress={onDeleteReceiptPress}
          >
            <MinusCircleFilledIcon />
            <CSText style={tw`ml-1 text-sm`}>{t('wallet.receipt.deleteReceipt')}</CSText>
          </TouchableOpacity>
        </SafeAreaView>
      )}

      <AddReceiptPanel
        ref={addReceiptPanelRef}
        onTakePhotoPress={onTakePhotoPress}
        onFileOrPhotoSelected={onFileOrPhotoSelected}
      />
      <ActivityOverlay
        visible={isUploading}
        message={t('wallet.receipt.uploadingReceipt')}
        subMessage={t('wallet.receipt.uploadingReceiptTime')}
      />
    </View>
  );
};

export default ViewReceiptScreen;
