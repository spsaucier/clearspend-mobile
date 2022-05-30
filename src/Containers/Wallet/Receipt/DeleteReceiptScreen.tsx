import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Button, CSText } from '@/Components';
import { CloseIcon } from '@/Components/Icons';
import { useDeleteReceipt } from '@/Queries/receipt';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';

const DeleteReceiptScreen = () => {
  const route = useRoute();
  const { params } = route;
  const { accountActivityId, receiptId } = params as any;

  const navigation = useNavigation();
  const { t } = useTranslation();
  const { mutate: deleteReceipt, isLoading } = useDeleteReceipt(receiptId, accountActivityId);

  const onGoBackPress = () => navigation.goBack();
  const ondeleteReceiptPress = () => {
    deleteReceipt(
      { receiptId },
      {
        onSuccess: () => {
          navigation.navigate(MainScreens.TransactionDetails, {
            transactionId: accountActivityId,
          });
        },
      },
    );
  };

  return (
    <View style={tw`flex-1 bg-black/75 justify-center items-center`}>
      <CSText style={tw`text-white text-3xl m-6 text-center`}>
        {t('wallet.receipt.deleteConfirmation')}
      </CSText>
      <CSText style={tw`text-white m-6 text-center`}>
        {t('wallet.receipt.deleteConfirmationSecondary')}
      </CSText>
      <Button
        disabled={isLoading}
        onPress={ondeleteReceiptPress}
        containerStyle={[tw`w-auto px-20`, { backgroundColor: tw.color('error') }]}
      >
        <CSText style={tw`text-white`}>{t('wallet.receipt.deleteReceipt')}</CSText>
      </Button>
      <TouchableOpacity
        onPress={onGoBackPress}
        disabled={isLoading}
        style={tw`flex-row items-center m-6`}
      >
        <View style={tw.style('border-white border-1 rounded-full', { alignSelf: 'flex-start' })}>
          <CloseIcon color="white" />
        </View>
        <CSText style={tw`text-white ml-2`}>{t('wallet.receipt.deleteCancel')}</CSText>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteReceiptScreen;
