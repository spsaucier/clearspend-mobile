import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';

const card = require('@/Assets/Images/wallet-demo-card.png');

type Props = {
  route: any;
  navigation: any;
};

const SetCardAsDefaultScreen = ({ navigation, route }: Props) => {
  const { cardId } = route.params;

  const handleOnPress = () => {
    // Change state
    navigation.navigate('Card Details', { cardId });
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-between bg-white`} edges={['top', 'bottom']}>
      <View style={tw`flex-1 items-center p-5`}>
        <Image source={card} style={tw`w-80 h-50`} resizeMode="contain" />
        <View style={tw`flex-row justify-center items-center`}>
          <Text style={tw`text-3xl font-bold w-4/5 text-center`}>
            Set as Default Card in Wallet
          </Text>
        </View>

        <Text style={tw`text-sm text-center text-black mt-2 mb-4`}>
          Your card will be automatically selected when you use Apple Pay.
        </Text>
      </View>

      <View style={tw`p-5`}>
        <Button
          textStyle={tw`text-sm text-white font-semibold`}
          containerStyle={tw`bg-ios-link h-12`}
          onPress={handleOnPress}
        >
          Use as Default Card
        </Button>
        <Text style={tw`text-sm text-center font-semibold text-ios-link mt-2`}>Not Now</Text>
      </View>
    </SafeAreaView>
  );
};

export default SetCardAsDefaultScreen;
