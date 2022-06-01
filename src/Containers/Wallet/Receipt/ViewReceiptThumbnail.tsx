import React from 'react';
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Pdf from 'react-native-pdf';
import tw from '@/Styles/tailwind';
import { detectMimeType, MediaType } from '@/Helpers/StringHelpers';
import { ActivityIndicator, CSText } from '@/Components';
import { InfoIcon } from '@/Components/Icons';
import { useReceiptUri } from '@/Queries';

const ViewReceiptThumbnail = ({ receiptIds }: { receiptIds: string[] }) => {
  const { t } = useTranslation();

  const {
    data: receiptData,
    isFetching,
    isError,
  } = useReceiptUri('viewReceiptThumbnail', receiptIds[0]);

  return (
    <View style={tw`flex`}>
      <View style={tw`w-full h-full `}>
        {isError ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <InfoIcon color={tw.color('black')} />
            <CSText style={tw`text-xs`}>{t('wallet.receipt.unableToLoadReceipt')}</CSText>
          </View>
        ) : isFetching || !receiptData ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator color="black" style={tw`w-10`} />
          </View>
        ) : null}

        {receiptData ? (
          detectMimeType(receiptData.contentType, receiptData.data) === MediaType.image ? (
            <Image
              source={{ uri: receiptData.data }}
              style={tw`w-full h-full `}
              resizeMethod="resize"
            />
          ) : (
            <Pdf
              source={{ uri: receiptData.data }}
              singlePage
              style={{ width: '100%', height: '100%' }}
            />
          )
        ) : null}
      </View>
      <View
        style={tw`rounded-full bg-white h-6 w-6 justify-center items-center absolute right-2 top-2`}
      >
        <CSText>{receiptIds.length}</CSText>
      </View>
    </View>
  );
};

export default ViewReceiptThumbnail;
