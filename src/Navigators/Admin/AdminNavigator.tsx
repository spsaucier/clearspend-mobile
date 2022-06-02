import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AdminStackParamTypes,
  IssueCardStackParamTypes,
  ManageAllocationStackParamTypes,
  AdminScreens,
  IssueCardScreens,
  ManageAllocationScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';
import { ManageAllocationProvider } from '@/Services/Admin/ManageAllocationProvider';

import AdminHomeScreen from '@/Containers/Admin/AdminHomeScreen';
import AdminEmployeesScreen from '@/Containers/Admin/AdminEmployeesScreen';
import AdminAllocationsScreen from '@/Containers/Admin/AdminAllocationsScreen';

// Issue Card Screens
import CardTypeScreen from '@/Containers/Admin/IssueCard/CardTypeScreen';
import EmployeeScreen from '@/Containers/Admin/IssueCard/EmployeeScreen';
import CardDetailsScreen from '@/Containers/Admin/IssueCard/CardDetailsScreen';
import AddressScreen from '@/Containers/Admin/IssueCard/AddressScreen';
import NewAddressScreen from '@/Containers/Admin/IssueCard/NewAddressScreen';
import AllocationScreen from '@/Containers/Admin/IssueCard/AllocationScreen';
import SpendControlsScreen from '@/Containers/Admin/IssueCard/SpendControlsScreen';
import CardRequestScreen from '@/Containers/Admin/IssueCard/CardRequestScreen';
import CardConfirmationScreen from '@/Containers/Admin/IssueCard/CardConfirmationScreen';

// Manage Allocation Screens
import ReallocationAccountScreen from '@/Containers/Admin/ManageAllocations/ReallocationAccountScreen';
import ReallocationAmountScreen from '@/Containers/Admin/ManageAllocations/ReallocationAmountScreen';
import ReallocationRequestScreen from '@/Containers/Admin/ManageAllocations/ReallocationRequestScreen';
import BankTransferRequestScreen from '@/Containers/Admin/ManageAllocations/BankTransferRequestScreen';
import ReallocationConfirmationScreen from '@/Containers/Admin/ManageAllocations/ReallocationConfirmationScreen';

const ManageAllocationsStack = createNativeStackNavigator<ManageAllocationStackParamTypes>();

export const ManageAllocationNavigator = ({
  route: { params },
}: NativeStackScreenProps<AdminStackParamTypes, AdminScreens.ManageAllocation>) => (
  <ManageAllocationProvider
    allocationId={params.allocationId}
    reallocationType={params.reallocationType}
    allocations={params.allocations}
    userRoles={params.userRoles}
    userType={params.userType}
  >
    <ManageAllocationsStack.Navigator
      initialRouteName={ManageAllocationScreens.ReallocationAccount}
      screenOptions={{ headerShown: false }}
    >
      <ManageAllocationsStack.Screen
        name={ManageAllocationScreens.ReallocationAccount}
        component={ReallocationAccountScreen}
      />
      <ManageAllocationsStack.Screen
        name={ManageAllocationScreens.ReallocationAmount}
        component={ReallocationAmountScreen}
      />
      <ManageAllocationsStack.Screen
        name={ManageAllocationScreens.ReallocationRequest}
        component={ReallocationRequestScreen}
      />
      <ManageAllocationsStack.Screen
        name={ManageAllocationScreens.BankTransferRequest}
        component={BankTransferRequestScreen}
      />
      <ManageAllocationsStack.Screen
        name={ManageAllocationScreens.ReallocationConfirmation}
        component={ReallocationConfirmationScreen}
      />
    </ManageAllocationsStack.Navigator>
  </ManageAllocationProvider>
);

const IssueCardStack = createNativeStackNavigator<IssueCardStackParamTypes>();

export const IssueCardNavigator = ({
  route: { params },
}: NativeStackScreenProps<AdminStackParamTypes, AdminScreens.IssueCard>) => (
  <IssueCardProvider selectedUser={params?.user}>
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
      <IssueCardStack.Screen name={IssueCardScreens.CardRequest} component={CardRequestScreen} />
      <IssueCardStack.Screen
        name={IssueCardScreens.CardConfirmation}
        component={CardConfirmationScreen}
      />
    </IssueCardStack.Navigator>
  </IssueCardProvider>
);

const AdminStack = createNativeStackNavigator<AdminStackParamTypes>();

export const AdminNavigator = () => (
  <AdminStack.Navigator initialRouteName={AdminScreens.Home} screenOptions={{ headerShown: false }}>
    <AdminStack.Screen name={AdminScreens.Home} component={AdminHomeScreen} />
    <AdminStack.Screen name={AdminScreens.Employees} component={AdminEmployeesScreen} />
    <AdminStack.Screen name={AdminScreens.Allocations} component={AdminAllocationsScreen} />
    <AdminStack.Screen name={AdminScreens.IssueCard} component={IssueCardNavigator} />
    <AdminStack.Screen name={AdminScreens.ManageAllocation} component={ManageAllocationNavigator} />
  </AdminStack.Navigator>
);
