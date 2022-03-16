import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Crashes from 'appcenter-crashes';

import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { Button, CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';

const DevMenuScreen = () => {
  const { navigate } = useNavigation();
  const version = getVersion();
  const buildNumber = getBuildNumber();
  return (
    <SafeAreaView style={tw`flex-1 bg-white p-4`}>
      <BackButtonNavigator />
      <CSText style={tw`text-2xl pt-3`}>Dev Menu</CSText>
      <ScrollView style={tw`flex-1 mt-5 pl-2 pr-2`}>
        <CSText style={tw`text-xl pb-4`}>App Info</CSText>
        <CSText style={tw`text-base pb-2`}>Version: {version}</CSText>
        <CSText style={tw`text-base pb-4`}>Build number: {buildNumber}</CSText>
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
            })
          }
        />
        <CSText style={tw`text-xl pb-4`}>Errors</CSText>
        <Button
          label="Trigger plain js test crash"
          containerStyle={tw`mb-4 bg-error`}
          onPress={() => {
            throw new Error('Test Crash Triggered');
          }}
        />
        <Button
          label="Trigger app center test crash"
          containerStyle={tw`mb-4 bg-error`}
          onPress={() => {
            Crashes.generateTestCrash();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DevMenuScreen;
