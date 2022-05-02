import React, { createContext, FC, useState } from 'react';

export enum CardType {
  Virtual = 'VIRTUAL',
  Physical = 'PHYSICAL',
}

interface Props {
  selectedCardTypes: CardType[];
  setSelectedCardTypes: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export const IssueCardContext = createContext<Props | undefined>(undefined);

export const IssueCardProvider: FC = ({ children }) => {
  const [selectedCardTypes, setSelectedCardTypes] = useState<CardType[]>([]);

  const context = {
    selectedCardTypes,
    setSelectedCardTypes,
  };

  return <IssueCardContext.Provider value={context}>{children}</IssueCardContext.Provider>;
};
