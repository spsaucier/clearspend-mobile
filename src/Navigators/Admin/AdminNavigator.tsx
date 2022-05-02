import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AdminStackParamTypes,
  IssueCardStackParamTypes,
  AdminScreens,
  IssueCardScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';

import AdminHomeScreen from '@/Containers/Admin/AdminHomeScreen';

// Issue Card Screens
import CardTypeScreen from '@/Containers/Admin/IssueCard/CardTypeScreen';
import EmployeeScreen from '@/Containers/Admin/IssueCard/EmployeeScreen';
import CardDetailsScreen from '@/Containers/Admin/IssueCard/CardDetailsScreen';
import AddressScreen from '@/Containers/Admin/IssueCard/AddressScreen';
import NewAddressScreen from '@/Containers/Admin/IssueCard/NewAddressScreen';
import AllocationScreen from '@/Containers/Admin/IssueCard/AllocationScreen';
import SpendControlsScreen from '@/Containers/Admin/IssueCard/SpendControlsScreen';
import CardConfirmationScreen from '@/Containers/Admin/IssueCard/CardConfirmationScreen';

const IssueCardStack = createStackNavigator<IssueCardStackParamTypes>();

export const IssueCardNavigator = () => (
  <IssueCardProvider>
    <IssueCardStack.Navigator
      initialRouteName={IssueCardScreens.CardType}
      screenOptions={{ headerShown: false }}
    >
      <IssueCardStack.Screen name={IssueCardScreens.CardType} component={CardTypeScreen} />
      <IssueCardStack.Screen name={IssueCardScreens.Employee} component={EmployeeScreen} />
      <IssueCardStack.Screen name={IssueCardScreens.CardDetails} component={CardDetailsScreen} />
      <IssueCardStack.Screen name={IssueCardScreens.Address} component={AddressScreen} />
      <IssueCardStack.Screen name={IssueCardScreens.NewAddress} component={NewAddressScreen} />
      <IssueCardStack.Screen name={IssueCardScreens.Allocation} component={AllocationScreen} />
      <IssueCardStack.Screen
        name={IssueCardScreens.SpendControls}
        component={SpendControlsScreen}
      />
      <IssueCardStack.Screen
        name={IssueCardScreens.CardConfirmation}
        component={CardConfirmationScreen}
      />
    </IssueCardStack.Navigator>
  </IssueCardProvider>
);

const AdminStack = createStackNavigator<AdminStackParamTypes>();

export const AdminNavigator = () => (
  <AdminStack.Navigator initialRouteName={AdminScreens.Home} screenOptions={{ headerShown: false }}>
    <AdminStack.Screen name={AdminScreens.Home} component={AdminHomeScreen} />
    <AdminStack.Screen name={AdminScreens.IssueCard} component={IssueCardNavigator} />
  </AdminStack.Navigator>
);
