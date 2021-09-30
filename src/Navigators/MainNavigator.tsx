import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardsContainer, ProfileContainer } from '@/Containers';
import tw from '@/Styles/tailwind';
import { CardTabIcon, ProfileTabIcon } from '@/Assets/Icons';

const Tab = createBottomTabNavigator();

// @refresh reset
const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: tw.color('primary'),
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Cards"
      component={CardsContainer}
      options={{
        tabBarLabel: 'Wallet',
        tabBarIcon: ({ color }) => <CardTabIcon color={color} size={28} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileContainer}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => <ProfileTabIcon color={color} size={22} />,
      }}
    />
  </Tab.Navigator>
);

export default MainNavigator;
