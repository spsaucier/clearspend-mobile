import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/core';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CSText } from '@/Components';
import { CameraIcon, FileIcon, PictureIcon } from '@/Components/Icons';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import tw from '@/Styles/tailwind';

const AddReceiptPanel = forwardRef((props: any, ref: any) => {
  const dimens = useWindowDimensions();
  const { t } = useTranslation();
  const snapPointMemo = useMemo(() => [dimens.scale > 2 ? '35%' : '50%'], []);
  const { navigate } = useNavigation();
  const { cardId, accountActivityId } = props;

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  const onAddReceiptPress = () => {
    navigate(MainScreens.AddReceipt, {
      accountActivityId,
      cardId,
    });

    (ref?.current as BottomSheetModal)?.dismiss();
  };
  const onSelectPhotoPress = () => {};

  const onUploadFilePress = () => {};

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
          <TouchableOpacity
            disabled
            style={tw`flex-row items-center mt-6`}
            onPress={onSelectPhotoPress}
          >
            <PictureIcon />
            <CSText style={tw`ml-2`}>
              {t('wallet.transactionDetails.addReceiptPanel.selectPhoto')}
            </CSText>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            style={tw`flex-row items-center mt-6`}
            onPress={onUploadFilePress}
          >
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
