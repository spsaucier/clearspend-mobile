import React from 'react';
import { Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

import tw from '@/Styles/tailwind';
import { CloseIcon } from '@/Components/Icons';
import { DarkToLightGradient } from '@/Components/Svg/DarkToLightGradient';
import { ActivityIndicator, Button, CSText } from '@/Components';
import { useReceiptUri } from '@/Queries';
import { MainScreens } from '../../../Navigators/NavigatorTypes';

const ViewReceiptScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const { accountActivityId, receiptId, cardId } = params as any;

  const { data, isLoading } = useReceiptUri(receiptId);

  const handleUploadNewReceipt = () => {
    navigation.navigate(MainScreens.AddReceipt, { accountActivityId, cardId });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-black/75`}>
        <ActivityIndicator color={tw.color('black')} />
      </SafeAreaView>
    );
  }

  return (
    <View style={tw`h-full bg-black/75`}>
      <Image
        style={[tw`absolute w-full h-full`, { resizeMode: 'contain' }]}
        source={{ uri: data }}
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
