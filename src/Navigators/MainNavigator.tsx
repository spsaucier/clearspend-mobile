import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import tw from '@/Styles/tailwind';
import { WalletIcon, ProfileIcon } from '@/Components/Icons';
import CardsScreen from '@/Containers/Wallet/CardsScreen';
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
const Tab = createBottomTabNavigator();

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    <Stack.Screen name="Notification Settings" component={NotificationSettingScreen} />
    <Stack.Screen name="Audit Log" component={AuditLogScreen} />
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator initialRouteName="Wallet" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Wallet" component={CardsScreen} />
    <Stack.Screen name="Notifications" component={NotificationScreen} />
    <Stack.Screen name="Card Details" component={CardDetailScreen} />
    <Stack.Screen name="Card Info" component={CardInfoScreen} />
    <Stack.Screen name="Transaction Details" component={TransactionDetailScreen} />
  </Stack.Navigator>
);

// @refresh reset
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: tw.color('primary'),
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Wallet Tab"
      component={WalletStack}
      options={{
        tabBarLabel: 'Wallet',
        tabBarIcon: ({ color }) => <WalletIcon color={color} size={28} />,
      }}
    />
    <Tab.Screen
      name="Profile Tab"
      component={ProfileStack}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => <ProfileIcon color={color} size={28} />,
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={TabNavigator} />
    {/* Add screens here that should hide tab bar */}
  </Stack.Navigator>
);

export default MainNavigator;
