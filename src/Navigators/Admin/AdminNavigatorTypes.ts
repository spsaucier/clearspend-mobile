import {
  User,
  Allocation as AllocationData,
  UserRolesAndPermissionsRecord,
} from 'generated/capital';
import { ReallocationType } from '@/Services/Admin/ManageAllocationProvider';

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

export enum AdminScreens {
  Home = 'Admin Home',
  Employees = 'Admin Employees',
  Allocations = 'Admin Allocations',
  IssueCard = 'Issue Card',
  ManageAllocation = 'Manage Allocation',
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
};
