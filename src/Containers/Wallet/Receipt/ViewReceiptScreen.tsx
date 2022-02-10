import React, { useEffect, useRef, useState } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { launchImageLibrary } from 'react-native-image-picker';
import tw from '@/Styles/tailwind';
import { CloseIcon, MinusCircleFilledIcon, PlusCircleFilledIcon } from '@/Components/Icons';
import { DarkToLightGradient } from '@/Components/Svg/DarkToLightGradient';
import { ActivityIndicator, CSText } from '@/Components';
import { useReceiptUri } from '@/Queries';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import AddReceiptPanel from '../Components/AddReceiptPanel';
import useUploadReceipt from '@/Hooks/useUploadReceipt';
import { ActivityOverlay } from '@/Components/ActivityOverlay';

type CachedReceipt = {
  receiptId: string;
  image?: string;
  loading?: boolean;
};

const ViewReceiptScreen = () => {
  const dimens = useWindowDimensions();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const { accountActivityId, receiptIds, cardId } = params as any;
  const carouselRef = useRef<Carousel<any>>(null);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const addReceiptPanelRef = useRef<BottomSheetModal>(null);

  const cachedInitialValue = receiptIds.map(
    (id: string) =>
      ({
        receiptId: id,
        image: undefined,
        loading: undefined,
      } as CachedReceipt),
  );

  const [currentReceiptId, setCurrentReceiptId] = useState(receiptIds[0]);
  const [cachedReceipts, setCachedReceipts] = useState<CachedReceipt[]>(cachedInitialValue);
  const { data, isLoading } = useReceiptUri('viewReceiptQuery', currentReceiptId);

  const onUploadReceiptFromGalleryFinished = () => {
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

  useEffect(() => {
    if (data && !isLoading) {
      const idx = cachedReceipts.findIndex((x) => x.receiptId === currentReceiptId);

      if (idx === -1) return;

      const current = cachedReceipts[idx];
      const updated = {
        ...current,
        image: data,
        loading: false,
      };

      cachedReceipts[idx] = updated;
      setCachedReceipts(cachedReceipts);
      carouselRef?.current?.forceUpdate();
    }
  }, [data, isLoading, cachedReceipts, currentReceiptId]);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: any; changed: any }) => {
    const [first] = viewableItems;
    const { item } = first;

    if (!item.image) {
      const idx = cachedReceipts.findIndex((x) => x.receiptId === item.receiptId);
      const current = cachedReceipts[idx];
      const updated = {
        ...current,
        loading: true,
      };
      cachedReceipts[idx] = updated;
      setCachedReceipts(cachedReceipts);
    }
    setCurrentReceiptId(item.receiptId);
  });

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
    <View style={tw`h-full bg-black/75`}>
      <Carousel
        ref={carouselRef}
        data={cachedReceipts}
        extraData={cachedReceipts}
        containerCustomStyle={tw`absolute w-full h-full`}
        sliderWidth={dimens.width}
        itemWidth={dimens.width}
        initialNumToRender={1}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({ item }: any) => (
          <TouchableWithoutFeedback
            style={tw`w-full h-full items-center justify-center`}
            onPress={() => setControlsEnabled(!controlsEnabled)}
          >
            {item.loading || !item.image ? (
              <ActivityIndicator />
            ) : (
              <Image
                style={[tw`w-full h-full`, { resizeMode: 'contain' }]}
                source={{ uri: item.image }}
              />
            )}
          </TouchableWithoutFeedback>
        )}
      />
      <DarkToLightGradient style={tw`absolute`} />
      <DarkToLightGradient style={tw`absolute bottom-0`} inverted />

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
      <AddReceiptPanel
        ref={addReceiptPanelRef}
        accountActivityId={accountActivityId}
        onSelectPhotoPress={onSelectAddPhotosFromGalleryPress}
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
