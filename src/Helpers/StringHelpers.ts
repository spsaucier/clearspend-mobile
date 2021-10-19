export const nameToInitials = (fullName: string): string => {
  const namesArray = fullName.trim().split(' ');
  return namesArray.length === 1
    ? `${namesArray[0].charAt(0)}`
    : `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`;
};

export const sentenceCase = (str: string): string => {
  if (!str || str.length < 2) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
