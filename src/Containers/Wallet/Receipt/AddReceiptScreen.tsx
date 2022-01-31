import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { ActivityIndicator, Button } from '@/Components';
import { CloseIcon, LightningIcon, LightningOffIcon } from '@/Components/Icons';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import tw from '@/Styles/tailwind';
import { MainScreens } from '../../../Navigators/NavigatorTypes';
import useUploadReceipt from '@/Hooks/useUploadReceipt';

const AddReceiptScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const { accountActivityId, cardId } = params as any;
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean>(false);
  const [previewURI, setPreviewURI] = useState<string>();

  const [flashOn, setFlashOn] = useState(false);
  const cameraRef = useRef<RNCamera>(null);

  const { uploadReceiptState, uploadReceipt, isUploading } = useUploadReceipt({
    accountActivityId,
    onUploadFinished: () => {},
  });
  const { receiptId, linked } = uploadReceiptState;

  const onTakePic = async () => {
    const data = await cameraRef.current?.takePictureAsync({ quality: 0.5, imageType: 'jpeg' });
    const { uri } = data!;

    setPreviewURI(uri);
  };

  const submitReceipt = () => {
    if (previewURI) uploadReceipt(previewURI);
  };

  useEffect(() => {
    if (linked) {
      navigation.navigate(MainScreens.TransactionDetails, {
        cardId,
        transactionId: accountActivityId,
      });
    }
  }, [accountActivityId, cardId, linked, navigation]);

  const onCameraStatusChange = (event: any) => {
    const { cameraStatus } = event;

    setHasCameraAccess(cameraStatus === 'READY');
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row py-2 justify-center items-center h-20`}>
            <TouchableOpacity
              style={tw`p-4 w-10 justify-center`}
              onPress={() => setFlashOn(!flashOn)}
            >
              {!previewURI &&
                hasCameraAccess &&
                (flashOn ? <LightningIcon color={tw.color('success')} /> : <LightningOffIcon />)}
            </TouchableOpacity>
            <View style={tw`flex-grow  justify-center items-center`}>
              <Text style={tw`text-white`}>{t('wallet.receipt.takeAPhoto')}</Text>
            </View>
            <TouchableOpacity
              style={tw`p-4 w-10 justify-center items-end`}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <CloseIcon color={tw.color('white')} size={32} />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-grow border-1 border-gray20 rounded-10 overflow-hidden`}>
            {previewURI ? (
              <View style={tw`flex-1`}>
                <Image style={tw`flex-1`} source={{ uri: previewURI }} />
              </View>
            ) : (
              <RNCamera
                ref={cameraRef}
                captureAudio={false}
                flashMode={flashOn ? 'on' : 'off'}
                style={tw`flex-1`}
                onStatusChange={onCameraStatusChange}
                type={RNCamera?.Constants.Type.back}
              >
                {({ status }) => {
                  if (status === 'PENDING_AUTHORIZATION') {
                    return (
                      <View style={tw`flex-1 justify-center items-center`}>
                        <ActivityIndicator />
                      </View>
                    );
                  }
                  if (status === 'NOT_AUTHORIZED') {
                    return (
                      <View style={tw`flex-1 justify-center items-center px-6`}>
                        <Text style={tw`text-white text-center`}>
                          {t('wallet.receipt.notAuthorizedCameraAccess')}
                        </Text>
                      </View>
                    );
                  }
                  return null;
                }}
              </RNCamera>
            )}
          </View>
          {previewURI ? (
            <View style={tw`p-4 h-30 items-center justify-between`}>
              <Button
                small
                containerStyle={tw`w-full`}
                onPress={() => {
                  submitReceipt();
                }}
              >
                {t('wallet.receipt.useThisPhoto')}
              </Button>
              <TouchableOpacity
                onPress={() => {
                  setPreviewURI(undefined);
                }}
              >
                <Text style={tw`text-white`}>{t('wallet.receipt.retakePhoto')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={tw`flex-row p-4 h-30`}>
              <TouchableOpacity style={tw`flex-1 justify-center`}>
                <View style={tw`rounded h-10 w-10 ml-2`} />
              </TouchableOpacity>

              <View style={tw`flex-1 justify-center items-center`}>
                <TouchableOpacity onPress={onTakePic} disabled={!hasCameraAccess}>
                  <View
                    style={[
                      tw`rounded-10 justify-center items-center border-1 border-white p-1`,
                      !hasCameraAccess && { borderColor: 'gray' },
                    ]}
                  >
                    <View
                      style={[
                        tw`rounded-10 bg-white h-14 w-14`,
                        !hasCameraAccess && { backgroundColor: 'gray' },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={tw`flex-1 justify-center items-end`}>
                <View style={tw`rounded bg-transparent h-10 w-10 mr-2`} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>

      <ActivityOverlay
        visible={isUploading || receiptId !== undefined}
        message={t('wallet.receipt.uploadingReceipt')}
        subMessage={t('wallet.receipt.uploadingReceiptTime')}
      />
    </View>
  );
};

export default AddReceiptScreen;
