export function formatName(fullName: string, maxLength: number = 35): string {
  const names = fullName.split(" ");
  if (names.length <= 3) return fullName;

  const firstName = names[0];
  const lastName = names[names.length - 1];
  let middleNames = names.slice(1, -1);

  middleNames.forEach((middleName, i) => {
    if (fullName.length <= maxLength) return fullName;
    else {
      middleNames[i] = (middleName[i].charAt(0) + ". ").toUpperCase();
      fullName = `${firstName} ${middleNames.join(" ")} ${lastName}`;
    }
  });
  return fullName;
}
