import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CSText } from '@/Components';
import { CameraIcon, FileIcon, PictureIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';

const AddReceiptPanel = forwardRef((props: any, ref: any) => {
  const { t } = useTranslation();
  const { onTakePhotoPress, onFileOrPhotoSelected } = props;

  const renderBackdrop = useCallback(
    ({ animatedIndex, animatedPosition, style }: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        animatedIndex={animatedIndex}
        animatedPosition={animatedPosition}
        style={style}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const onAddReceiptPress = () => {
    ref?.current.close();
    onTakePhotoPress();
  };

  const onUploadPhotoPress = async () => {
    ref?.current.close();
    launchImageLibrary({
      mediaType: 'photo',
    }).then((result) => {
      const { assets } = result;
      if (!assets) return;

      const [first] = assets!;
      const { uri, fileName: name, type } = first;
      onFileOrPhotoSelected(uri, name, type);
    });
  };

  const onUploadFilePress = async () => {
    ref?.current.close();
    DocumentPicker.pick({
      type: [types.pdf, types.images],
    })
      .then((file) => {
        const [first] = file;
        const { uri, name, type } = first;
        onFileOrPhotoSelected(uri, name, type);
      })
      .catch(() => {});
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView onLayout={handleContentLayout}>
          <SafeAreaView style={tw`flex-1 pt-4 pb-8 px-5`} edges={['bottom']}>
            <CSText style={tw`text-lg`}>{t('wallet.transactionDetails.addReceipt')}</CSText>

            <TouchableOpacity style={tw`flex-row items-center mt-6`} onPress={onAddReceiptPress}>
              <CameraIcon />
              <CSText style={tw`ml-2`}>
                {t('wallet.transactionDetails.addReceiptPanel.takePhoto')}
              </CSText>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center mt-6`} onPress={onUploadPhotoPress}>
              <PictureIcon />
              <CSText style={tw`ml-2`}>
                {t('wallet.transactionDetails.addReceiptPanel.selectPhoto')}
              </CSText>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center mt-6`} onPress={onUploadFilePress}>
              <FileIcon />
              <CSText style={tw`ml-2`}>
                {t('wallet.transactionDetails.addReceiptPanel.uploadFile')}
              </CSText>
            </TouchableOpacity>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default AddReceiptPanel;
