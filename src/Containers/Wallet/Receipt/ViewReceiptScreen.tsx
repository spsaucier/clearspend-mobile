import React from 'react';
import { Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { VIEW_RECEIPT_QUERY } from '@/Queries';
import tw from '@/Styles/tailwind';
import { CloseIcon } from '@/Components/Icons';
import { DarkToLightGradient } from '@/Components/Svg/DarkToLightGradient';
import { ActivityIndicator, Button, CSText } from '@/Components';

const ViewReceiptScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { params } = route;
  const { accountActivityId, receiptId } = params as any;

  const { data, loading } = useQuery(VIEW_RECEIPT_QUERY, {
    variables: { receiptId },
  });

  const handleUploadNewReceipt = () => {
    navigation.navigate('Add Receipt', { accountActivityId });
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator color={tw.color('black')} />
      </View>
    );
  }

  return (
    <View style={tw`h-full`}>
      <Image
        style={[tw`absolute w-full h-full`, { resizeMode: 'cover' }]}
        source={{ uri: data?.viewReceipt.data }}
      />
      <DarkToLightGradient style={tw`absolute`} />
      <DarkToLightGradient style={tw`absolute bottom-0`} inverted />
      <SafeAreaView style={tw`flex-1 justify-between`}>
        <TouchableOpacity
          style={tw`self-end`}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <CloseIcon style={tw`mr-4 mt-6`} size={32} color={tw.color('white')} />
        </TouchableOpacity>
        <View style={tw`p-4`}>
          <Button onPress={handleUploadNewReceipt} small containerStyle={tw`bg-black mt-5`}>
            <CSText style={tw`text-base text-white`}>{t('wallet.receipt.uploadNewReceipt')}</CSText>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ViewReceiptScreen;
