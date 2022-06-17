import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AdminStackParamTypes,
  IssueCardStackParamTypes,
  ManageAllocationStackParamTypes,
  CreateEmployeeStackParamTypes,
  AdminScreens,
  IssueCardScreens,
  ManageAllocationScreens,
  CreateAllocationStackParamTypes,
  CreateAllocationScreens,
  CreateEmployeeScreens,
} from '@/Navigators/Admin/AdminNavigatorTypes';

import { AdminProvider } from '@/Services/Admin/AdminProvider';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';
import { ManageAllocationProvider } from '@/Services/Admin/ManageAllocationProvider';
import { NewAllocationProvider } from '@/Services/Admin/NewAllocationProvider';
import { CreateEmployeeProvider } from '@/Services/Admin/CreateEmployeeProvider';

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

// Create Employee Screens
import EmployeeFirstNameScreen from '@/Containers/Admin/CreateEmployee/EmployeeFirstNameScreen';
import EmployeeLastNameScreen from '@/Containers/Admin/CreateEmployee/EmployeeLastNameScreen';
import EmployeeEmailScreen from '@/Containers/Admin/CreateEmployee/EmployeeEmailScreen';
import EmployeeCreateRequestScreen from '@/Containers/Admin/CreateEmployee/EmployeeCreateRequestScreen';
import EmployeeConfirmationScreen from '@/Containers/Admin/CreateEmployee/EmployeeConfirmationScreen';

// Transaction Screens
import TransactionDetailScreen from '@/Containers/Wallet/TransactionDetailScreen';
import NoteInputScreen from '@/Containers/Wallet/NoteInputScreen';
import AddReceiptScreen from '@/Containers/Wallet/Receipt/AddReceiptScreen';
import ViewReceiptScreen from '@/Containers/Wallet/Receipt/ViewReceiptScreen';
import DeleteReceiptScreen from '@/Containers/Wallet/Receipt/DeleteReceiptScreen';

import { transparentModal } from '@/Navigators/Wallet/WalletNavigator';

const CreateEmployeeStack = createNativeStackNavigator<CreateEmployeeStackParamTypes>();

export const CreateEmployeeNavigator = () => (
  <CreateEmployeeProvider>
    <CreateEmployeeStack.Navigator
      initialRouteName={CreateEmployeeScreens.EmployeeFirstName}
      screenOptions={{ headerShown: false }}
    >
      <CreateEmployeeStack.Screen
        name={CreateEmployeeScreens.EmployeeFirstName}
        component={EmployeeFirstNameScreen}
      />
      <CreateEmployeeStack.Screen
        name={CreateEmployeeScreens.EmployeeLastName}
        component={EmployeeLastNameScreen}
      />
      <CreateEmployeeStack.Screen
        name={CreateEmployeeScreens.EmployeeEmail}
        component={EmployeeEmailScreen}
      />
      <CreateEmployeeStack.Screen
        name={CreateEmployeeScreens.EmployeeCreateRequest}
        component={EmployeeCreateRequestScreen}
      />
      <CreateEmployeeStack.Screen
        name={CreateEmployeeScreens.EmployeeConfirmation}
        component={EmployeeConfirmationScreen}
      />
    </CreateEmployeeStack.Navigator>
  </CreateEmployeeProvider>
);

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
  <AdminProvider isAdmin>
    <AdminStack.Navigator
      initialRouteName={AdminScreens.Home}
      screenOptions={{ headerShown: false }}
    >
      <AdminStack.Screen name={AdminScreens.Home} component={AdminHomeScreen} />
      <AdminStack.Screen name={AdminScreens.Employees} component={AdminEmployeesScreen} />
      <AdminStack.Screen name={AdminScreens.Allocations} component={AdminAllocationsScreen} />
      <AdminStack.Screen name={AdminScreens.EmployeeWallet} component={WalletScreen} />
      <AdminStack.Screen name={AdminScreens.IssueCard} component={IssueCardNavigator} />
      <AdminStack.Screen
        name={AdminScreens.ManageAllocation}
        component={ManageAllocationNavigator}
      />
      <AdminStack.Screen
        name={AdminScreens.CreateAllocation}
        component={CreateAllocationNavigator}
      />
      <AdminStack.Screen name={AdminScreens.CreateEmployee} component={CreateEmployeeNavigator} />

      <AdminStack.Group screenOptions={transparentModal}>
        <AdminStack.Screen
          name={AdminScreens.TransactionDetails}
          component={TransactionDetailScreen}
        />
        <AdminStack.Screen name={AdminScreens.NoteInput} component={NoteInputScreen} />
        <AdminStack.Screen name={AdminScreens.AddReceipt} component={AddReceiptScreen} />
        <AdminStack.Screen name={AdminScreens.ViewReceipt} component={ViewReceiptScreen} />
        <AdminStack.Screen name={AdminScreens.DeleteReceipt} component={DeleteReceiptScreen} />
      </AdminStack.Group>
    </AdminStack.Navigator>
  </AdminProvider>
);
