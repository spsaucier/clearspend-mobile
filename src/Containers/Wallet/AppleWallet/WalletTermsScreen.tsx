import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';

type Props = {
  route: any;
  navigation: any;
};

const WalletTermsScreen = ({ route, navigation }: Props) => {
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
          onPress={() => navigation.push('Add Card To Apple Wallet', { cardId, termsAccepted })}
        >
          Agree
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WalletTermsScreen;
