import React, { useEffect, useRef, useState } from 'react';
import { Alert, AppState, Image, Linking, Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { Camera, CameraDevice } from 'react-native-vision-camera';
import { AdminScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { WalletScreens, TransactionStackProps } from '@/Navigators/Wallet/WalletNavigatorTypes';
import { Button, CSText } from '@/Components';
import { CloseIcon, LightningIcon, LightningOffIcon } from '@/Components/Icons';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import tw from '@/Styles/tailwind';
import useUploadReceipt from '@/Hooks/useUploadReceipt';
import { mixpanel } from '@/Services/utils/analytics';
import { useAdminContext } from '@/Hooks/useAdminContext';

const imageType = 'jpeg';

const AddReceiptScreen = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAdminContext();
  const navigation = useNavigation<TransactionStackProps>();
  const route = useRoute();
  const isFocused = useIsFocused();

  const { params } = route;
  const { accountActivityId } = params as any;

  const cameraRef = useRef<Camera>(null);
  const [cameraDevice, setCameraDevice] = useState<CameraDevice>();
  const [previewURI, setPreviewURI] = useState<string>();
  const [processingPicture, setProcessingPicture] = useState<boolean>(false);
  const [flashOn, setFlashOn] = useState(false);

  const Screens = isAdmin ? AdminScreens : WalletScreens;

  const { uploadReceiptState, uploadReceipt, isUploading } = useUploadReceipt({
    accountActivityId,
    onUploadFinished: () => {
      Toast.show({
        type: 'success',
        text1: t('toasts.receiptUploadedSuccessfully'),
      });
    },
  });
  const { receiptId, linked } = uploadReceiptState;

  const onTakePic = async () => {
    setProcessingPicture(true);

    cameraRef.current
      ?.takePhoto({
        skipMetadata: true,
        qualityPrioritization: 'balanced',
        flash: flashOn ? 'on' : 'off',
      })
      .then((data) => {
        let { path } = data;
        if (Platform.OS === 'android') {
          path = `file://${path}`;
        }
        setPreviewURI(path);
      })
      .catch((ex) => {
        mixpanel.track('Error', ex);
      })
      .finally(() => {
        setProcessingPicture(false);
      });
  };

  const submitReceipt = () => {
    if (previewURI) {
      const fileName = previewURI.split('/').pop();
      uploadReceipt(previewURI, fileName!, `image/${imageType}`);
    }
  };

  const inferCameraDevice = () =>
    Camera.getAvailableCameraDevices().then((response) => {
      const camera = response.find((x) => x.position === 'back' && x.neutralZoom === 1.0);
      setCameraDevice(camera);
    });

  useEffect(() => {
    Camera.requestCameraPermission().then((permission) => {
      if (permission === 'denied') {
        Alert.alert('', t('wallet.receipt.reEnableCameraAccess'), [
          {
            text: t('general.cancel'),
            onPress: () => navigation.goBack(),
          },
          {
            text: t('general.goToSettings'),
            onPress: () => Linking.openSettings(),
          },
        ]);
      } else {
        inferCameraDevice();
      }
    });
  }, [isFocused]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        Camera.getCameraPermissionStatus().then((permission) => {
          if (permission === 'authorized') {
            inferCameraDevice();
          }
        });
      }
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (linked) {
      navigation.navigate(Screens.TransactionDetails, {
        transactionId: accountActivityId,
      });
    }
  }, [accountActivityId, linked, navigation]);

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
                cameraDevice &&
                (flashOn ? <LightningIcon color={tw.color('success')} /> : <LightningOffIcon />)}
            </TouchableOpacity>
            <View style={tw`flex-grow  justify-center items-center`}>
              <CSText style={tw`text-white`}>{t('wallet.receipt.takeAPhoto')}</CSText>
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
          <View style={tw`flex-grow border-1 border-gray-75 rounded-10 overflow-hidden`}>
            {previewURI ? (
              <Image style={tw`flex-1`} source={{ uri: previewURI }} />
            ) : cameraDevice ? (
              <Camera
                device={cameraDevice}
                isActive={isFocused}
                photo
                style={tw`flex-1`}
                ref={cameraRef}
              />
            ) : null}
          </View>
          {previewURI ? (
            <View style={tw`p-4 h-30 w-full`}>
              <Button
                small
                containerStyle={tw`w-full justify-center`}
                onPress={() => {
                  submitReceipt();
                }}
              >
                {t('wallet.receipt.useThisPhoto')}
              </Button>
              <TouchableOpacity
                style={tw`w-full h-10 items-center justify-center`}
                onPress={() => {
                  setPreviewURI(undefined);
                }}
              >
                <CSText style={tw`text-white`}>{t('wallet.receipt.retakePhoto')}</CSText>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={tw`flex-row p-4 h-30`}>
              <TouchableOpacity style={tw`flex-1 justify-center`}>
                <View style={tw`rounded h-10 w-10 ml-2`} />
              </TouchableOpacity>

              <View style={tw`flex-1 justify-center items-center`}>
                <TouchableOpacity onPress={onTakePic} disabled={!cameraDevice || processingPicture}>
                  <View
                    style={[
                      tw`rounded-10 justify-center items-center border-1 border-white p-1`,
                      (!cameraDevice || processingPicture) && { borderColor: 'gray' },
                    ]}
                  >
                    <View
                      style={[
                        tw`rounded-10 bg-white h-14 w-14`,
                        (!cameraDevice || processingPicture) && { backgroundColor: 'gray' },
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
