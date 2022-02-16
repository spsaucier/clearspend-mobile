import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import { Button, CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';

const DevMenuScreen = () => {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-gray90`}>
      <CSText style={tw`text-2xl pl-4`}>Dev Menu</CSText>
      <View style={tw`flex-1 mt-5 pl-2 pr-2`}>
        <CSText style={tw`text-xl pb-4`}>Icons</CSText>
        <Button
          label="Available Icon List"
          containerStyle={tw`mb-4`}
          onPress={() => navigate(MainScreens.DevIconDemo)}
        />
        <CSText style={tw`text-xl pb-4`}>Toasts</CSText>
        <Button
          label="Success Toast Demo"
          containerStyle={tw`mb-4`}
          onPress={() => Toast.show({ text1: 'The action was successful' })}
        />
        <Button
          label="Info Toast Demo"
          containerStyle={tw`mb-4 bg-ios-link`}
          onPress={() => Toast.show({ type: 'info', text1: 'Some information' })}
        />
        <Button
          label="Error Toast Demo"
          containerStyle={tw`mb-4 bg-error`}
          onPress={() =>
            Toast.show({
              type: 'error',
              text1: 'An error has occurred with a lot of text that goes on to the second line',
            })}
        />
      </View>
    </SafeAreaView>
  );
};

export default DevMenuScreen;
