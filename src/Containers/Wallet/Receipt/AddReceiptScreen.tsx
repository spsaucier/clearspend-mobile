import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { ActivityIndicator, Button } from '@/Components';
import { CloseIcon, LightningIcon, LightningOffIcon } from '@/Components/Icons';
import { ActivityOverlay } from '@/Components/ActivityOverlay';
import tw from '@/Styles/tailwind';
import { LINK_RECEIPT_MUTATION, UPLOAD_RECEIPT_MUTATION } from '@/Queries';

type UploadReceiptState = {
  previewURI?: string;
  receiptId?: string;
  linked?: boolean;
};

const initialState: UploadReceiptState = {};

const AddReceiptScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const { accountActivityId } = params as any;
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean>(false);

  const [flashOn, setFlashOn] = useState(false);
  const cameraRef = useRef<RNCamera>(null);

  const [uploadReceiptState, setUploadReceiptState] = useState<UploadReceiptState>(initialState);

  const [uploadReceipt, { loading: uploadingReceipt }] = useMutation(UPLOAD_RECEIPT_MUTATION);

  const [linkReceipt, { loading: linkingReceipt }] = useMutation(LINK_RECEIPT_MUTATION);

  const onTakePic = async () => {
    const data = await cameraRef.current?.takePictureAsync({ quality: 1, imageType: 'jpeg' });
    const { uri } = data!;

    setUploadReceiptState({ previewURI: uri });
  };

  const submitReceipt = () => {
    const { previewURI } = uploadReceiptState;
    if (!previewURI) return;

    const fileName = previewURI.split('/').pop();
    const extension = fileName?.split('.').pop();

    uploadReceipt({
      variables: {
        customBody: {
          receipt: {
            uri: previewURI,
            type: `image/${extension}`,
            name: fileName,
          },
        },
      },
    }).then((result: any) => {
      const { uploadedReceipt } = result?.data;
      if (uploadedReceipt) {
        const { receiptId } = uploadedReceipt;
        setUploadReceiptState({
          ...uploadReceiptState,
          receiptId,
        });
      }
    });
  };

  const { receiptId, previewURI, linked } = uploadReceiptState;

  // when receiptId exists, link it to the account activity (transaction)
  useEffect(() => {
    if (receiptId) {
      linkReceipt({
        variables: {
          input: {
            accountActivityId,
            receiptId,
          },
        },
      }).then(() => {
        setUploadReceiptState({
          ...uploadReceiptState,
          linked: true,
        });
      });
    }
  }, [receiptId]);

  useEffect(() => {
    if (linked && navigation?.canGoBack()) {
      navigation.goBack();
    }
  }, [linked]);

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
                  setUploadReceiptState(initialState);
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
        visible={uploadingReceipt || linkingReceipt || (!linkingReceipt && receiptId !== undefined)}
        message={t('wallet.receipt.uploadingReceipt')}
        subMessage={t('wallet.receipt.uploadingReceiptTime')}
      />
    </View>
  );
};

export default AddReceiptScreen;
