import React, { createContext, FC } from 'react';

export interface Props {
  isAdmin: boolean;
}

export type DefaultProps = Pick<Props, 'isAdmin'>;

export const AdminContext = createContext<Props | undefined>(undefined);

export const AdminProvider: FC<DefaultProps> = ({ isAdmin, children }) => {
  const context = {
    isAdmin,
  };

  return <AdminContext.Provider value={context}>{children}</AdminContext.Provider>;
};
