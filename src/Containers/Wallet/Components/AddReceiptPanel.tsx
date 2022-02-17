import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { types } from 'react-native-document-picker';

import { CSText } from '@/Components';
import { CameraIcon, FileIcon, PictureIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';

const AddReceiptPanel = forwardRef((props: any, ref: any) => {
  const dimens = useWindowDimensions();
  const { t } = useTranslation();
  const snapPointMemo = useMemo(() => [dimens.scale > 2 ? '35%' : '48%'], [dimens.scale]);
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

  const onAddReceiptPress = () => {
    ref?.current.close();
    onTakePhotoPress();
  };

  const onUploadPhotoPress = async () => {
    ref?.current.close();
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    }).then((result) => {
      const { assets } = result;
      if (!assets) return;

      const [first] = assets!;
      const { uri } = first;
      onFileOrPhotoSelected(uri);
    });
  };

  const onUploadFilePress = async () => {
    ref?.current.close();
    DocumentPicker.pick({
      type: [types.pdf, types.images],
    })
      .then((file) => {
        const [first] = file;
        const { uri } = first;
        onFileOrPhotoSelected(uri);
      })
      .catch(() => {});
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={ref} snapPoints={snapPointMemo} backdropComponent={renderBackdrop}>
        <View style={tw`p-4`}>
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
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default AddReceiptPanel;
