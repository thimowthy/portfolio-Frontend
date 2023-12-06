export function convertDateFormat(inputDate: string): string {
  
  const originalDate = new Date(inputDate);

  const day = originalDate.getDate().toString().padStart(2, "0");
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = originalDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
