import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  WalletScreens,
  WalletStackParamTypes,
  WalletStackProps,
} from '@/Navigators/Wallet/WalletNavigatorTypes';

import tw from '@/Styles/tailwind';
import { CloseIcon, MinusCircleFilledIcon, PlusCircleFilledIcon } from '@/Components/Icons';
import { CSText } from '@/Components';
import AddReceiptPanel from '../Components/AddReceiptPanel';
import useUploadReceipt from '@/Hooks/useUploadReceipt';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import ViewReceiptCarousel from './ViewReceiptCarousel';

type ViewReceiptNavigationProps = NativeStackScreenProps<
  WalletStackParamTypes,
  WalletScreens.ViewReceipt
>;
type ViewReceiptRouteProp = ViewReceiptNavigationProps['route'];

const ViewReceiptScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<WalletStackProps>();
  const route = useRoute<ViewReceiptRouteProp>();
  const { params } = route;
  const { accountActivityId, receiptIds } = params;
  const [currentReceiptId, setCurrentReceiptId] = useState(receiptIds[0]);

  const [controlsEnabled, setControlsEnabled] = useState(true);
  const addReceiptPanelRef = useRef<BottomSheetModal>(null);

  const onUploadReceiptFromGalleryFinished = () => {
    Toast.show({
      type: 'success',
      text1: t('toasts.receiptUploadedSuccessfully'),
    });

    navigation.navigate(WalletScreens.TransactionDetails, {
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
    navigation.navigate(WalletScreens.DeleteReceipt, {
      accountActivityId,
      receiptId: currentReceiptId,
    });
  };

  const onTakePhotoPress = () => {
    navigation.navigate(WalletScreens.AddReceipt, {
      accountActivityId,
    });
  };

  const onFileOrPhotoSelected = (uri: string, name: string, type: string) => {
    uploadReceipt(uri, name, type);
  };

  const onCurrentReceiptChanged = (id: string) => {
    setCurrentReceiptId(id);
    setControlsEnabled(true);
  };

  const doubleTap = Gesture.Tap().onEnd(() => {
    setControlsEnabled(true);
  });
  doubleTap.config.numberOfTaps = 2;

  const tap = Gesture.Tap().onEnd(() => {
    setControlsEnabled(!controlsEnabled);
  });
  tap.config.maxDeltaX = 10;
  tap.config.maxDeltaY = 10;
  tap.config.maxDist = 10;

  const simultaneousTaps = Gesture.Race(doubleTap, tap);

  const gradientOpacity = controlsEnabled ? '0.7' : '0';
  const gradientColor = [
    `rgba(0, 0, 0, ${gradientOpacity})`,
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0)',
    `rgba(0, 0, 0, ${gradientOpacity})`,
  ];

  return (
    <View style={tw`h-full bg-black/75`}>
      <GestureDetector gesture={simultaneousTaps}>
        <ViewReceiptCarousel
          receiptIds={receiptIds}
          currentReceiptId={currentReceiptId}
          onCurrentReceiptChanged={onCurrentReceiptChanged}
          horizontalScrollEnabled={controlsEnabled}
        />
      </GestureDetector>

      <LinearGradient
        pointerEvents="none"
        colors={gradientColor}
        style={{ position: 'absolute', height: '100%', width: '100%' }}
      />

      {controlsEnabled ? (
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
      ) : null}

      {controlsEnabled ? (
        <SafeAreaView style={tw`absolute right-0 bottom-20`} edges={['bottom']}>
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
      ) : null}

      {controlsEnabled ? (
        <View style={tw`mb-10 self-center flex-row absolute bottom-0`}>
          {receiptIds.length > 1 &&
            receiptIds?.map((rId: string) => (
              <View
                style={tw.style('rounded-full h-2, w-2 m-1', {
                  backgroundColor: currentReceiptId === rId ? 'white' : 'grey',
                })}
                key={rId}
              />
            ))}
        </View>
      ) : null}
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
