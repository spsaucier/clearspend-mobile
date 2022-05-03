import React, { createContext, FC, useState } from 'react';
import { User } from 'generated/capital';

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
}

// not implemented anywhere but useful for tests
interface DefaultProps {
  defaultCardTypes?: CardType[];
  defaultUser?: User;
  defaultIsPersonal?: boolean | undefined;
}

export const IssueCardContext = createContext<Props | undefined>(undefined);

export const IssueCardProvider: FC<DefaultProps> = ({
  defaultCardTypes = [],
  defaultUser,
  defaultIsPersonal,
  children,
}) => {
  const [selectedCardTypes, setSelectedCardTypes] = useState<CardType[]>(defaultCardTypes);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(defaultUser);
  const [isPersonal, setIsPersonal] = useState<boolean | undefined>(defaultIsPersonal);

  const context = {
    selectedCardTypes,
    setSelectedCardTypes,
    selectedUser,
    setSelectedUser,
    isPersonal,
    setIsPersonal,
  };

  return <IssueCardContext.Provider value={context}>{children}</IssueCardContext.Provider>;
};
