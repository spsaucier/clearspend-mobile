import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { SafeAreaView } from 'react-native-safe-area-context';
import Crashes from 'appcenter-crashes';
import Config from 'react-native-config';

import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { requestUserNotificationPermission } from '@/Helpers/NotificationHelpers';
import { useFeatureFlagsContext } from '@/Hooks/useFeatureFlagsContext';

const DevMenuScreen = () => {
  const { navigate } = useNavigation();
  const { allFlags } = useFeatureFlagsContext();
  const version = getVersion();
  const buildNumber = getBuildNumber();

  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const setToken = async () => {
      const token = await messaging().getToken();
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('FCM TOKEN: ', token);
      }
      setFcmToken(token);
    };
    setToken();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-4`}>
      <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <BackButtonNavigator />
      <CSText style={tw`text-2xl pt-3`}>Dev Menu</CSText>
      <ScrollView style={tw`flex-1 mt-5 pl-2 pr-2`}>
        <CSText style={tw`text-xl pb-4`}>App Info</CSText>
        <CSText style={tw`text-base pb-2`}>Version: {version}</CSText>
        <CSText style={tw`text-base pb-2`}>Build number: {buildNumber}</CSText>
        <CSText style={tw`text-base pb-2`}>Environment variables: </CSText>
        <CSText style={tw`text-base pb-2 bg-gray-20`} selectable>
          {JSON.stringify(Config, Object.keys(Config).sort(), 2)}
        </CSText>
        <CSText style={tw`text-base py-2`}>Feature Flags: </CSText>
        <CSText style={tw`text-base pb-4 bg-gray-20`} selectable>
          {JSON.stringify(allFlags, null, 2)}
        </CSText>
        <CSText style={tw`text-base py-2`}>FCM Token (long press to copy):</CSText>
        <CSText style={tw`text-base pb-4 bg-gray-20`} selectable>
          {fcmToken}
        </CSText>

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
        <Button
          label="Pressable Toast Demo"
          containerStyle={tw`mb-4`}
          onPress={() =>
            Toast.show({
              text1: 'The action was successful',
              props: {
                onPress: () => Alert.alert('Toast Pressed'),
              },
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
        <CSText style={tw`text-xl pb-4`}>Notifications</CSText>
        <Button
          label="Request notification permission"
          containerStyle={tw`mb-4`}
          onPress={async () => {
            const notificationsEnabled = await requestUserNotificationPermission();
            Alert.alert('Notification permission granted', notificationsEnabled.toString());
          }}
        />

        <CSText style={tw`text-xl pb-4`}>Interstitial Screens</CSText>

        <Button
          label="Updated terms and conditions"
          containerStyle={tw`mb-4`}
          onPress={() => navigate(MainScreens.UpdatedTermsAndConditionsScreen)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DevMenuScreen;
