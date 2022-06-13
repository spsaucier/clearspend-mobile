import React, { createContext, FC, useState } from 'react';

export interface Props {
  firstName?: string;
  setFirstName: React.Dispatch<React.SetStateAction<Props['firstName']>>;
  lastName?: string;
  setLastName: React.Dispatch<React.SetStateAction<Props['lastName']>>;
  email?: string;
  setEmail: React.Dispatch<React.SetStateAction<Props['email']>>;
}

export type DefaultProps = Pick<Props, 'firstName' | 'lastName' | 'email'>;

export const CreateEmployeeContext = createContext<Props | undefined>(undefined);

export const CreateEmployeeProvider: FC<DefaultProps> = ({
  firstName: defaultFirstName,
  lastName: defaultLastName,
  email: defaultEmail,
  children,
}) => {
  const [firstName, setFirstName] = useState<Props['firstName']>(defaultFirstName);
  const [lastName, setLastName] = useState<Props['lastName']>(defaultLastName);
  const [email, setEmail] = useState<Props['email']>(defaultEmail);

  const context = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
  };

  return (
    <CreateEmployeeContext.Provider value={context}>{children}</CreateEmployeeContext.Provider>
  );
};
