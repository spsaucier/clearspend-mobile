import { User } from '@/generated/capital';

export const formatUserName = (
  user?: User,
): {
  firstName: string;
  lastName: string;
  combinedName: string;
} => {
  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';

  const combinedName = `${firstName} ${lastName}`;

  return {
    firstName,
    lastName,
    combinedName,
  };
};

export const getUserInitials = (user?: User) => {
  const { firstName, lastName } = formatUserName(user);
  const firstInitial = firstName?.[0] ?? '';
  const secondInitial = lastName?.[0] ?? '';

  return `${firstInitial}${secondInitial}`.toUpperCase();
};
