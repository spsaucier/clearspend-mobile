import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AdminStackParamTypes,
  IssueCardStackParamTypes,
  ManageAllocationStackParamTypes,
  AdminScreens,
  IssueCardScreens,
  ManageAllocationScreens,
  CreateAllocationStackParamTypes,
  CreateAllocationScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';
import { ManageAllocationProvider } from '@/Services/Admin/ManageAllocationProvider';
import { NewAllocationProvider } from '@/Services/Admin/NewAllocationProvider';

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
import WalletScreen from '@/Containers/Wallet/WalletScreen';

// Manage Allocation Screens
import ReallocationAccountScreen from '@/Containers/Admin/ManageAllocations/ReallocationAccountScreen';
import ReallocationAmountScreen from '@/Containers/Admin/ManageAllocations/ReallocationAmountScreen';
import ReallocationRequestScreen from '@/Containers/Admin/ManageAllocations/ReallocationRequestScreen';
import BankTransferRequestScreen from '@/Containers/Admin/ManageAllocations/BankTransferRequestScreen';
import ReallocationConfirmationScreen from '@/Containers/Admin/ManageAllocations/ReallocationConfirmationScreen';

// New Allocation Screens
import ParentAllocationScreen from '@/Containers/Admin/CreateAllocation/ParentAllocationScreen';
import AllocationLabelScreen from '@/Containers/Admin/CreateAllocation/AllocationLabelScreen';
import AllocationAmountScreen from '@/Containers/Admin/CreateAllocation/AllocationAmountScreen';
import SelectManagersScreen from '@/Containers/Admin/CreateAllocation/SelectManagersScreen';
import SelectViewersScreen from '@/Containers/Admin/CreateAllocation/SelectViewersScreen';
import NotificationsScreen from '@/Containers/Admin/CreateAllocation/NotificationsScreen';
import NewAllocationSpendControlsScreen from '@/Containers/Admin/CreateAllocation/SpendControlsScreen';
import NewAllocationConfirmDetails from '@/Containers/Admin/CreateAllocation/ConfirmDetailsScreen';

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

const CreateAllocationStack = createNativeStackNavigator<CreateAllocationStackParamTypes>();

export const CreateAllocationNavigator = () => (
  <NewAllocationProvider>
    <CreateAllocationStack.Navigator screenOptions={{ headerShown: false }}>
      <CreateAllocationStack.Screen
        name={CreateAllocationScreens.ParentAllocation}
        component={ParentAllocationScreen}
      />
      <CreateAllocationStack.Screen
        name={CreateAllocationScreens.AllocationLabel}
        component={AllocationLabelScreen}
      />
      <CreateAllocationStack.Screen
        name={CreateAllocationScreens.AllocationAmount}
        component={AllocationAmountScreen}
      />
      <CreateAllocationStack.Screen
        name={CreateAllocationScreens.SelectManagers}
        component={SelectManagersScreen}
      />
      <CreateAllocationStack.Screen
        name={CreateAllocationScreens.SelectViewers}
        component={SelectViewersScreen}
      />
      <CreateAllocationStack.Screen
        name={CreateAllocationScreens.Notifications}
        component={NotificationsScreen}
      />
      <CreateAllocationStack.Screen
        name={CreateAllocationScreens.SpendControls}
        component={NewAllocationSpendControlsScreen}
      />
      <CreateAllocationStack.Screen
        name={CreateAllocationScreens.ConfirmDetails}
        component={NewAllocationConfirmDetails}
      />
    </CreateAllocationStack.Navigator>
  </NewAllocationProvider>
);

const AdminStack = createNativeStackNavigator<AdminStackParamTypes>();

export const AdminNavigator = () => (
  <AdminStack.Navigator initialRouteName={AdminScreens.Home} screenOptions={{ headerShown: false }}>
    <AdminStack.Screen name={AdminScreens.Home} component={AdminHomeScreen} />
    <AdminStack.Screen name={AdminScreens.Employees} component={AdminEmployeesScreen} />
    <AdminStack.Screen name={AdminScreens.Allocations} component={AdminAllocationsScreen} />
    <AdminStack.Screen name={AdminScreens.EmployeeWallet} component={WalletScreen} />
    <AdminStack.Screen name={AdminScreens.IssueCard} component={IssueCardNavigator} />
    <AdminStack.Screen name={AdminScreens.ManageAllocation} component={ManageAllocationNavigator} />
    <AdminStack.Screen name={AdminScreens.CreateAllocation} component={CreateAllocationNavigator} />
  </AdminStack.Navigator>
);
