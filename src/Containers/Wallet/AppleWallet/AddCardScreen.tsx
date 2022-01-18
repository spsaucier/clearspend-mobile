import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { FocusAwareStatusBar } from '@/Components';
import { CheckMarkIcon } from '@/Components/Icons';
import { MainScreens } from '../../../Navigators/NavigatorTypes';

const icon = require('@/Assets/Images/wallet-demo-icon.png');

type Props = {
  route: any;
};

const AddCardScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const { cardId, termsAccepted } = route.params;
  const [loading, setLoading] = useState(termsAccepted);
  const [cardAdded, setCardAdded] = useState(termsAccepted);

  useEffect(() => {
    if (termsAccepted) {
      setTimeout(() => {
        setLoading(false);
        setCardAdded(true);
      }, 1500);
    }
  }, [termsAccepted]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar backgroundColor={tw.color('lightBG')} barStyle="dark-content" />

      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between p-4`}>
          {cardAdded ? (
            <View />
          ) : (
            <Text style={tw`text-base text-ios-link`} onPress={() => navigation.goBack()}>
              Cancel
            </Text>
          )}
          {cardAdded ? (
            <Text
              style={tw`text-base text-ios-link`}
              onPress={() => {
                const pushAction = StackActions.push(MainScreens.SetCardAsDefault, { cardId });
                navigation.dispatch(pushAction);
              }}
            >
              Done
            </Text>
          ) : (
            <Text
              style={tw`text-base text-ios-link`}
              onPress={() => {
                const pushAction = StackActions.push(MainScreens.WalletTerms, { cardId });
                navigation.dispatch(pushAction);
              }}
            >
              Next
            </Text>
          )}
        </View>

        <View style={tw`justify-center items-center h-36`}>
          <View style={tw`flex-row justify-center items-center`}>
            {loading && cardAdded ? (
              <Text style={tw`text-3xl font-bold w-1/2 text-center`}>Adding Card</Text>
            ) : cardAdded ? (
              <Text style={tw`text-3xl font-bold w-1/2 text-center`}>Card Added</Text>
            ) : (
              <Text style={tw`text-3xl font-bold w-1/2 text-center`}>Add Card to Apple Pay</Text>
            )}

            {/*  icon */}
            {loading && cardAdded ? (
              <ActivityIndicator />
            ) : cardAdded ? (
              <CheckMarkIcon size={30} />
            ) : null}
          </View>

          {loading && cardAdded ? (
            <Text style={tw`text-sm text-center text-black mt-2 mb-4`}>
              Contacting Card Issuer...
            </Text>
          ) : (
            <Text style={tw`text-sm text-center text-black mt-2 mb-4`}>
              Your card will be available in Wallet on &quot;Device&quot;
            </Text>
          )}
        </View>

        <View style={tw`flex-row items-center p-4 border-t border-b border-gray90`}>
          <Text style={tw`text-sm text-black font-bold w-1/3`}>Name</Text>
          <Text style={tw`text-sm text-gray70 w-2/3`}>John Smith</Text>
        </View>

        <View style={tw`flex-row items-center p-4 border-b border-gray90`}>
          <Text style={tw`text-sm text-black font-bold w-1/3`}>Card Number</Text>
          <Text style={tw`text-sm text-gray70 w-2/3`}>•••• 7341</Text>
        </View>
      </View>

      {/* Disclaimer */}
      <View style={tw`justify-center items-center p-3`}>
        {/* TODO SVG Icon */}
        <Image source={icon} style={tw`w-18`} resizeMode="contain" />

        <Text style={tw`text-xs text-center text-gray70`}>
          Card-related information, location, device settings and device use patterns will be sent
          to Apple and may be shared together with account information with your card issuer or bank
          to set up Apple Pay.
          <Text style={tw`text-xs text-center text-ios-link`}>
            {' '}
            See how your data is managed...
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AddCardScreen;
