import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WalletScreen from '@/Containers/Wallet/WalletScreen';
import ProfileScreen from '@/Containers/Profile/ProfileScreen';
import ChangePasswordScreen from '@/Containers/Profile/ChangePasswordScreen';
import NotificationSettingScreen from '@/Containers/Profile/NotificationSettingsScreen';
import AuditLogScreen from '@/Containers/Profile/AuditLog';
import NotificationScreen from '@/Containers/Notifications/NotificationScreen';
import CardDetailScreen from '@/Containers/Wallet/CardDetailScreen';
import CardInfoScreen from '@/Containers/Wallet/CardInfoScreen';
import TransactionDetailScreen from '@/Containers/Wallet/TransactionDetailScreen';

type MainStackParamTypes = {
  Home: undefined;

  // Profile & Settings
  Profile: undefined;
  'Profile Screen': undefined;
  'Change Password': undefined;
  'Notification Settings': undefined;
  'Audit Log': undefined;

  // Wallet and Cards
  Wallet: undefined;
  Notifications: undefined;
  'Card Details': { cardId: string };
  'Card Info': { cardId: string };
  'Transaction Details': { transactionId: string };
};

const Stack = createStackNavigator<MainStackParamTypes>();

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile Screen" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile Screen" component={ProfileScreen} />
    <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    <Stack.Screen name="Notification Settings" component={NotificationSettingScreen} />
    <Stack.Screen name="Audit Log" component={AuditLogScreen} />
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator initialRouteName="Wallet" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Wallet" component={WalletScreen} />
    <Stack.Screen name="Notifications" component={NotificationScreen} />
    <Stack.Screen name="Card Details" component={CardDetailScreen} />
    <Stack.Screen name="Card Info" component={CardInfoScreen} />
    <Stack.Screen name="Transaction Details" component={TransactionDetailScreen} />
    <Stack.Screen name="Profile" component={ProfileStack} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={WalletStack} />
  </Stack.Navigator>
);

export default MainNavigator;
