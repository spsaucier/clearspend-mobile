import React, { createContext, FC, useMemo, useState } from 'react';
import { xor } from 'lodash';
import { User } from '@/generated/capital';
import { useAllPermissions } from '@/Queries/permissions';
import {
  AllocationWithChildren,
  generateAllocationTree,
  getManageableAllocations,
} from '@/Helpers/AllocationHelpers';
import { useUsers } from '@/Queries/user';

export type LowBalanceSettings = {
  enabled: boolean;
  amount: number;
  managersEnabled: string[];
  viewersEnabled: string[];
};

export type AllocationType = {
  allocationId: string;
  allocationLabel: string;
};

export interface Props {
  selectedParentAllocationId?: string;
  setSelectedParentAllocationId: React.Dispatch<
    React.SetStateAction<Props['selectedParentAllocationId']>
  >;

  allocationLabel?: string;
  setAllocationLabel: React.Dispatch<React.SetStateAction<Props['allocationLabel']>>;

  allocationAmount?: string;
  setAllocationAmount: React.Dispatch<React.SetStateAction<Props['allocationAmount']>>;

  selectedManagers: User[];
  toggleManager: (manager: User) => void;

  selectedViewers: User[];
  toggleViewers: (viewer: User) => void;

  lowBalanceNotificationSettings: LowBalanceSettings;
  setLowBalanceNotificationSettings: React.Dispatch<
    React.SetStateAction<Props['lowBalanceNotificationSettings']>
  >;

  isLoadingAllocations: boolean;
  allocations?: AllocationWithChildren[];

  isLoadingUsers: boolean;
  users?: User[];
}

export const NewAllocationContext = createContext<Props | undefined>(undefined);

export type DefaultProps = Partial<Props>;

export const NewAllocationProvider: FC<DefaultProps> = ({
  selectedParentAllocationId: defaultSelectedParentAllocationId,
  allocationLabel: defaultAllocationLabel,
  allocationAmount: defaultAllocationAmount,
  selectedManagers: defaultSelectedManagers,
  selectedViewers: defaultSelectedViewers,
  children,
}) => {
  const [selectedParentAllocationId, setSelectedParentAllocationId] = useState<
    Props['selectedParentAllocationId']
  >(defaultSelectedParentAllocationId);

  const [allocationLabel, setAllocationLabel] =
    useState<Props['allocationLabel']>(defaultAllocationLabel);

  const [allocationAmount, setAllocationAmount] =
    useState<Props['allocationAmount']>(defaultAllocationAmount);

  const [selectedManagers, setSelectedManagers] = useState<Props['selectedManagers']>(
    defaultSelectedManagers || [],
  );

  const [selectedViewers, setSelectedViewers] = useState<Props['selectedViewers']>(
    defaultSelectedViewers || [],
  );

  const [lowBalanceNotificationSettings, setLowBalanceNotificationSettings] = useState<
    Props['lowBalanceNotificationSettings']
  >({
    enabled: false,
    amount: 0,
    managersEnabled: [],
    viewersEnabled: [],
  });

  const toggleManager = (manager: User) => {
    const newList = xor(selectedManagers, [manager]);
    setSelectedManagers(newList);
  };

  const toggleViewers = (viewer: User) => {
    const newList = xor(selectedViewers, [viewer]);
    setSelectedViewers(newList);
  };

  const { data: allPermissionsData, isLoading: isLoadingAllocations } = useAllPermissions();
  const allocations = useMemo(
    () => generateAllocationTree(getManageableAllocations('MANAGE_FUNDS', allPermissionsData)),
    [allPermissionsData],
  );

  const { isLoading: isLoadingUsers, data: users } = useUsers();

  const context = {
    selectedParentAllocationId,
    setSelectedParentAllocationId,
    allocationLabel,
    setAllocationLabel,
    allocationAmount,
    setAllocationAmount,
    selectedManagers,
    toggleManager,
    selectedViewers,
    toggleViewers,
    lowBalanceNotificationSettings,
    setLowBalanceNotificationSettings,
    isLoadingAllocations,
    allocations,
    isLoadingUsers,
    users,
  };

  return <NewAllocationContext.Provider value={context}>{children}</NewAllocationContext.Provider>;
};
