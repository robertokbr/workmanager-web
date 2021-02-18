const getNameInitials = (userName: string): string => {
  const name = userName.toUpperCase();
  const splitedName = name.split(' ');

  if (splitedName.length === 1) {
    return String(splitedName[0].split('')[0]);
  }

  const firstName = splitedName[0].split('')[0];
  const lastName = splitedName[1].split('')[0];

  return String(firstName + lastName);
};

export default getNameInitials;
