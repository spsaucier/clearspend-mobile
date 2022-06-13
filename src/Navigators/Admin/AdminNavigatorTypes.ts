import {
  User,
  Allocation as AllocationData,
  UserRolesAndPermissionsRecord,
} from 'generated/capital';
import { ReallocationType } from '@/Services/Admin/ManageAllocationProvider';

export enum CreateEmployeeScreens {
  EmployeeFirstName = 'Create Employee Employee First Name',
  EmployeeLastName = 'Create Employee Employee Last Name',
  EmployeeEmail = 'Create Employee Employee Email',
  EmployeeCreateRequest = 'Create Employee Create Request',
  EmployeeConfirmation = 'Create Employee Employee Confirmation',
}

export type CreateEmployeeStackParamTypes = {
  [CreateEmployeeScreens.EmployeeFirstName]: undefined;
  [CreateEmployeeScreens.EmployeeLastName]: undefined;
  [CreateEmployeeScreens.EmployeeEmail]: undefined;
  [CreateEmployeeScreens.EmployeeCreateRequest]: undefined;
  [CreateEmployeeScreens.EmployeeConfirmation]: { userId: string };
};

export enum ManageAllocationScreens {
  ReallocationAccount = 'Manage Allocation Reallocation Account',
  ReallocationAmount = 'Manage Allocation Reallocation Amount',
  ReallocationRequest = 'Manage Allocation Reallocation Request',
  BankTransferRequest = 'Manage Allocation Bank Transfer Request',
  ReallocationConfirmation = 'Manage Allocation Reallocation Confirmation',
}

export type ManageAllocationStackParamTypes = {
  [ManageAllocationScreens.ReallocationAccount]: undefined;
  [ManageAllocationScreens.ReallocationAmount]: undefined;
  [ManageAllocationScreens.ReallocationRequest]: undefined;
  [ManageAllocationScreens.BankTransferRequest]: undefined;
  [ManageAllocationScreens.ReallocationConfirmation]: undefined;
};

export enum IssueCardScreens {
  CardType = 'Issue Card Card Type',
  Employee = 'Issue Card Employee',
  CardDetails = 'Issue Card Card Details',
  Address = 'Issue Card Address',
  NewAddress = 'Issue Card New Address',
  Allocation = 'Issue Card Allocation',
  SpendControls = 'Issue Card Spend Controls',
  CardRequest = 'Issue Card Request',
  CardConfirmation = 'Issue Card Card Confirmation',
}

export type IssueCardStackParamTypes = {
  [IssueCardScreens.CardType]: undefined;
  [IssueCardScreens.Employee]: undefined;
  [IssueCardScreens.CardDetails]: undefined;
  [IssueCardScreens.Address]: undefined;
  [IssueCardScreens.NewAddress]: undefined;
  [IssueCardScreens.Allocation]: undefined;
  [IssueCardScreens.SpendControls]: undefined;
  [IssueCardScreens.CardRequest]: undefined;
  [IssueCardScreens.CardConfirmation]: undefined;
};

export enum CreateAllocationScreens {
  ParentAllocation = 'Parent Allocation',
  AllocationLabel = 'Allocation Label',
  AllocationAmount = 'Allocation Amount',
  SelectManagers = 'Select Managers',
  SelectViewers = 'Select Viewers',
  Notifications = 'Notifications',
  SpendControls = 'Spend Controls',
  ConfirmDetails = 'Confirm Details',
}

export type CreateAllocationStackParamTypes = {
  [CreateAllocationScreens.ParentAllocation]: undefined;
  [CreateAllocationScreens.AllocationLabel]: undefined;
  [CreateAllocationScreens.AllocationAmount]: undefined;
  [CreateAllocationScreens.SelectManagers]: undefined;
  [CreateAllocationScreens.SelectViewers]: undefined;
  [CreateAllocationScreens.Notifications]: undefined;
  [CreateAllocationScreens.SpendControls]: undefined;
  [CreateAllocationScreens.ConfirmDetails]: undefined;
};

export enum AdminScreens {
  Home = 'Admin Home',
  Employees = 'Admin Employees',
  Allocations = 'Admin Allocations',
  IssueCard = 'Issue Card',
  ManageAllocation = 'Manage Allocation',
  EmployeeWallet = 'Employee Wallet',
  CreateAllocation = 'Create Allocation',
  CreateEmployee = 'Create Employee',
}

export type AdminStackParamTypes = {
  [AdminScreens.Home]: undefined;
  [AdminScreens.Employees]: undefined;
  [AdminScreens.Allocations]: undefined;
  [AdminScreens.IssueCard]?: { user: User };
  [AdminScreens.ManageAllocation]: {
    allocationId: string;
    reallocationType: ReallocationType;
    allocations: AllocationData[];
    userRoles: UserRolesAndPermissionsRecord[];
    userType: 'EMPLOYEE' | 'BUSINESS_OWNER';
  };
  [AdminScreens.EmployeeWallet]: { employee: User };
  [AdminScreens.CreateAllocation]: undefined;
  [AdminScreens.CreateEmployee]: undefined;
};
