import React, { createContext, FC, useState } from 'react';
import { Allocation, UserRolesAndPermissionsRecord } from '@/generated/capital';

export enum ReallocationType {
  Add = 'Add',
  Remove = 'Remove',
}

export interface Props {
  allocationId: string;
  setAllocationId: React.Dispatch<React.SetStateAction<Props['allocationId']>>;
  reallocationType: ReallocationType;
  setReallocationType: React.Dispatch<React.SetStateAction<Props['reallocationType']>>;
  targetAllocationId?: string;
  setTargetAllocationId: React.Dispatch<React.SetStateAction<Props['targetAllocationId']>>;
  amount?: string;
  setAmount: React.Dispatch<React.SetStateAction<Props['amount']>>;
  allocations: Allocation[];
  userRoles: UserRolesAndPermissionsRecord[];
  userType: 'EMPLOYEE' | 'BUSINESS_OWNER';
}

export type DefaultProps = Pick<
  Props,
  | 'allocationId'
  | 'reallocationType'
  | 'targetAllocationId'
  | 'amount'
  | 'allocations'
  | 'userRoles'
  | 'userType'
>;

export const ManageAllocationContext = createContext<Props | undefined>(undefined);

export const ManageAllocationProvider: FC<DefaultProps> = ({
  allocationId: defaultAllocationId,
  reallocationType: defaultReallocationType,
  targetAllocationId: defaultTargetAllocationId,
  amount: defaultAmount,
  allocations: defaultAllocations,
  userRoles: defaultUserRoles,
  userType: defaultUserType,
  children,
}) => {
  const [allocationId, setAllocationId] = useState<Props['allocationId']>(defaultAllocationId);
  const [reallocationType, setReallocationType] =
    useState<Props['reallocationType']>(defaultReallocationType);
  const [targetAllocationId, setTargetAllocationId] =
    useState<Props['targetAllocationId']>(defaultTargetAllocationId);
  const [amount, setAmount] = useState<Props['amount']>(defaultAmount);
  const [allocations] = useState<Props['allocations']>(defaultAllocations);
  const [userRoles] = useState<Props['userRoles']>(defaultUserRoles);
  const [userType] = useState<Props['userType']>(defaultUserType);

  const context = {
    allocationId,
    setAllocationId,
    reallocationType,
    setReallocationType,
    targetAllocationId,
    setTargetAllocationId,
    amount,
    setAmount,
    allocations,
    userRoles,
    userType,
  };

  return (
    <ManageAllocationContext.Provider value={context}>{children}</ManageAllocationContext.Provider>
  );
};
