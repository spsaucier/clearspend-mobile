export const nameToInitials = (fullName: string) => {
  const namesArray = fullName.trim().split(' ');
  return namesArray.length === 1
    ? `${namesArray[0].charAt(0)}`
    : `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`;
};
