export function convertDateFormat(inputDate: string, format:string = "dd/mm/yyyy"): string {
  
  const originalDate = new Date(inputDate);

  const day = originalDate.getDate().toString().padStart(2, "0");
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = originalDate.getFullYear();

  let formattedDate;
  if (format === "yyyy-mm-dd")
    if (day.length === 1)
      formattedDate = `${year}-${month}-0${(parseInt(day)+1).toString()}`;
    else
      formattedDate = `${year}-${month}-${(parseInt(day)+1).toString()}`;
  else
    formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
