import React, { createContext, FC, useState } from 'react';
import { User, Address, UpdateCardRequest } from 'generated/capital';

export enum CardType {
  Virtual = 'VIRTUAL',
  Physical = 'PHYSICAL',
}

export interface Props {
  selectedCardType?: CardType;
  setSelectedCardType: React.Dispatch<React.SetStateAction<Props['selectedCardType']>>;
  selectedUser?: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<Props['selectedUser']>>;
  selectedIsPersonal?: boolean;
  setSelectedIsPersonal: React.Dispatch<React.SetStateAction<Props['selectedIsPersonal']>>;
  selectedAddress?: Address | null; // null for 'new address' option
  setSelectedAddress: React.Dispatch<React.SetStateAction<Props['selectedAddress']>>;
  selectedAllocationId?: string;
  setSelectedAllocationId: React.Dispatch<React.SetStateAction<Props['selectedAllocationId']>>;
  selectedSpendControls?: UpdateCardRequest;
  setSelectedSpendControls: React.Dispatch<React.SetStateAction<Props['selectedSpendControls']>>;
  resetSelections: () => void;
}

export type DefaultProps = Pick<
  Props,
  | 'selectedCardType'
  | 'selectedUser'
  | 'selectedIsPersonal'
  | 'selectedAddress'
  | 'selectedAllocationId'
  | 'selectedSpendControls'
>;

export const IssueCardContext = createContext<Props | undefined>(undefined);

export const IssueCardProvider: FC<DefaultProps> = ({
  selectedCardType: defaultCardType,
  selectedUser: defaultUser,
  selectedIsPersonal: defaultselectedIsPersonal,
  selectedAddress: defaultSelectedAddress,
  selectedAllocationId: defaultSelectedAllocationId,
  selectedSpendControls: defaultSelectedSpendControls,
  children,
}) => {
  const [selectedCardType, setSelectedCardType] =
    useState<Props['selectedCardType']>(defaultCardType);
  const [selectedUser, setSelectedUser] = useState<Props['selectedUser']>(defaultUser);
  const [selectedIsPersonal, setSelectedIsPersonal] =
    useState<Props['selectedIsPersonal']>(defaultselectedIsPersonal);
  const [selectedAddress, setSelectedAddress] =
    useState<Props['selectedAddress']>(defaultSelectedAddress);
  const [selectedAllocationId, setSelectedAllocationId] = useState<Props['selectedAllocationId']>(
    defaultSelectedAllocationId,
  );
  const [selectedSpendControls, setSelectedSpendControls] = useState<
    Props['selectedSpendControls']
  >(defaultSelectedSpendControls);

  const resetSelections = () => {
    setSelectedCardType(undefined);
    setSelectedUser(undefined);
    setSelectedIsPersonal(undefined);
    setSelectedAddress(undefined);
    setSelectedAllocationId(undefined);
    setSelectedSpendControls(undefined);
  };

  const context = {
    selectedCardType,
    setSelectedCardType,
    selectedUser,
    setSelectedUser,
    selectedIsPersonal,
    setSelectedIsPersonal,
    selectedAddress,
    setSelectedAddress,
    selectedAllocationId,
    setSelectedAllocationId,
    selectedSpendControls,
    setSelectedSpendControls,
    resetSelections,
  };

  return <IssueCardContext.Provider value={context}>{children}</IssueCardContext.Provider>;
};
