import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreens, ProfileStackParamTypes } from '@/Navigators/Profile/ProfileNavigatorTypes';

import ProfileScreen from '@/Containers/Profile/ProfileScreen';
import ChangePasswordScreen from '@/Containers/Profile/ChangePassword/CurrentPasswordScreen';
import NewPasswordScreen from '@/Containers/Profile/ChangePassword/NewPasswordScreen';
import NotificationSettingsScreen from '@/Containers/Profile/NotificationSettingsScreen';
import LoginOptionsScreen from '@/Containers/Profile/LoginOptions';
import LegalDocumentsScreen from '@/Containers/Profile/LegalDocuments';
import UpdateAccountScreen from '@/Containers/Profile/UpdateAccountScreen';
import UpdateMobileScreen from '@/Containers/Profile/UpdateMobileScreen';
import UpdateAddressScreen from '@/Containers/Profile/UpdateAddressScreen';

import DevMenuScreen from '@/Containers/DevMenu/DevMenuScreen';
import { IconDemoScreen } from '@/Containers/DevMenu/IconDemoScreen';

import { ActivateCardNavigator as ActivateCardStack } from '@/Navigators/Profile/ActivateCard/ActivateCardNavigator';

const Stack = createNativeStackNavigator<ProfileStackParamTypes>();

export const ProfileNavigator = () => (
  <Stack.Navigator initialRouteName={ProfileScreens.Home} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ProfileScreens.Home} component={ProfileScreen} />
    <Stack.Screen name={ProfileScreens.UpdateAccount} component={UpdateAccountScreen} />
    <Stack.Screen name={ProfileScreens.UpdateMobile} component={UpdateMobileScreen} />
    <Stack.Screen name={ProfileScreens.UpdateAddress} component={UpdateAddressScreen} />
    <Stack.Screen name={ProfileScreens.ChangePassword} component={ChangePasswordScreen} />
    <Stack.Screen name={ProfileScreens.NewPassword} component={NewPasswordScreen} />
    <Stack.Screen
      name={ProfileScreens.NotificationSettings}
      component={NotificationSettingsScreen}
    />
    <Stack.Screen name={ProfileScreens.LoginOptions} component={LoginOptionsScreen} />
    <Stack.Screen name={ProfileScreens.ActivateCard} component={ActivateCardStack} />
    <Stack.Screen name={ProfileScreens.LegalDocuments} component={LegalDocumentsScreen} />
    {/* DEV menu */}
    <Stack.Screen name={ProfileScreens.DevMenu} component={DevMenuScreen} />
    <Stack.Screen name={ProfileScreens.DevIconDemo} component={IconDemoScreen} />
  </Stack.Navigator>
);
