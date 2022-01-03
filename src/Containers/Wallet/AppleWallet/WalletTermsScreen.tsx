import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { MainScreens } from '../../../Navigators/NavigatorTypes';

type Props = {
  route: any;
};

const WalletTermsScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const { cardId } = route.params;
  const termsAccepted = true;
  return (
    <SafeAreaView style={tw`flex-1 justify-between bg-ios-gray-bg`} edges={['bottom']}>
      <View style={tw`justify-center items-center bg-ios-gray-bg p-5 border-b border-gray90`}>
        <Text style={tw`text-sm text-black font-bold`}>Terms and Conditions</Text>
      </View>

      <View style={tw`flex-1 bg-white p-5 border-gray70`} />

      <View style={tw`flex-row justify-between bg-ios-gray-bg p-4 border-t border-gray90`}>
        <Text style={tw`text-sm text-ios-link`} onPress={() => navigation.goBack()}>
          Disagree
        </Text>
        <Text
          style={tw`text-sm text-ios-link`}
          onPress={() => {
            const pushAction = StackActions.push(MainScreens.AddCardToAppleWallet, {
              cardId,
              termsAccepted,
            });
            navigation.dispatch(pushAction);
          }}
        >
          Agree
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WalletTermsScreen;
