import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminStackParamTypes, AdminScreens } from '@/Navigators/NavigatorTypes';

import AdminHomeScreen from '@/Containers/Admin/AdminHomeScreen';

const Stack = createStackNavigator<AdminStackParamTypes>();

export const AdminNavigator = () => (
  <Stack.Navigator initialRouteName={AdminScreens.Home} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AdminScreens.Home} component={AdminHomeScreen} />
  </Stack.Navigator>
);
