import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import tw from '@/Styles/tailwind';
import { CardTabIcon, ProfileTabIcon } from '@/Assets/Icons';
import CardsScreen from '@/Containers/Wallet/CardsScreen';
import ProfileScreen from '@/Containers/Profile/ProfileScreen';
import ChangePasswordScreen from '@/Containers/Profile/ChangePasswordScreen';
import NotificationSettingScreen from '@/Containers/Profile/NotificationSettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
    <Stack.Screen name="Notification Settings" component={NotificationSettingScreen} />
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Wallet" component={CardsScreen} />
  </Stack.Navigator>
);

// @refresh reset
const MainNavigator = () => (
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
        tabBarIcon: ({ color }) => <CardTabIcon color={color} size={28} />,
      }}
    />
    <Tab.Screen
      name="Profile Tab"
      component={ProfileStack}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => <ProfileTabIcon color={color} size={22} />,
      }}
    />
  </Tab.Navigator>
);

export default MainNavigator;
