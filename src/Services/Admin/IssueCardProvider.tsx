import React, { createContext, FC, useState } from 'react';
import { User, Address } from 'generated/capital';

export enum CardType {
  Virtual = 'VIRTUAL',
  Physical = 'PHYSICAL',
}

interface Props {
  selectedCardTypes: CardType[];
  setSelectedCardTypes: React.Dispatch<React.SetStateAction<CardType[]>>;
  selectedUser: User | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isPersonal: boolean | undefined;
  setIsPersonal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  selectedAddress: Address | null | undefined; // null for 'new address' option
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | null | undefined>>;
  selectedAllocationId: string | undefined;
  setSelectedAllocationId: React.Dispatch<React.SetStateAction<string | undefined>>;
  spendControl: {} | undefined;
  setSpendControl: React.Dispatch<React.SetStateAction<{} | undefined>>;
}

// not implemented anywhere but useful for tests
interface DefaultProps {
  defaultCardTypes?: CardType[];
  defaultUser?: User;
  defaultIsPersonal?: boolean | undefined;
  defaultSelectedAddress?: Address | null | undefined;
  defaultSelectedAllocationId?: string | undefined;
  defaultSpendControl?: undefined;
}

export const IssueCardContext = createContext<Props | undefined>(undefined);

export const IssueCardProvider: FC<DefaultProps> = ({
  defaultCardTypes = [],
  defaultUser,
  defaultIsPersonal,
  defaultSelectedAddress,
  defaultSelectedAllocationId,
  defaultSpendControl,
  children,
}) => {
  const [selectedCardTypes, setSelectedCardTypes] = useState<CardType[]>(defaultCardTypes);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(defaultUser);
  const [isPersonal, setIsPersonal] = useState<boolean | undefined>(defaultIsPersonal);
  const [selectedAddress, setSelectedAddress] = useState<Address | null | undefined>(
    defaultSelectedAddress,
  );
  const [selectedAllocationId, setSelectedAllocationId] = useState<string | undefined>(
    defaultSelectedAllocationId,
  );
  const [spendControl, setSpendControl] = useState<{} | undefined>(defaultSpendControl);

  const context = {
    selectedCardTypes,
    setSelectedCardTypes,
    selectedUser,
    setSelectedUser,
    isPersonal,
    setIsPersonal,
    selectedAddress,
    setSelectedAddress,
    selectedAllocationId,
    setSelectedAllocationId,
    spendControl,
    setSpendControl,
  };

  return <IssueCardContext.Provider value={context}>{children}</IssueCardContext.Provider>;
};
