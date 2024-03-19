/**
 * Converte a data de um formato para outro.
 *
 * @param {string} inputDate - A data no formato de entrada.
 * @param {string} [format="dd/mm/yyyy"] - O formato desejado para a data de saída. Padrão: "dd/mm/yyyy".
 * @returns {string} A data formatada de acordo com o formato especificado.
 * @throws {Error} Lança um erro se a data de entrada não for válida.
 *
 * @example
 * // Exemplo de uso:
 * const inputDate = "2022-01-17";
 * const formattedDate = convertDate(inputDate, "dd/mm/yyyy");
 * console.log(formattedDate); // Saída: "17/01/2022"
 */
export function convertDate(
  inputDate: string,
  format: string = "dd/mm/yyyy",
): string {
  const originalDate = new Date(inputDate);

  if (isNaN(originalDate.getTime())) {
    throw new Error("Data de entrada inválida.");
  }

  const day = originalDate.getDate().toString().padStart(2, "0");
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = originalDate.getFullYear();

  let formattedDate;
  if (format === "yyyy-mm-dd") formattedDate = inputDate.substring(0, 10);
  else formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

/**
 * Converte a data e hora de um formato para outro.
 *
 * @param {string} inputDateTime - A data e hora no formato de entrada.
 * @param {string} [format="dd/mm/yyyy HH:mm"] - O formato desejado para a data e hora de saída. Padrão: "dd/mm/yyyy HH:mm".
 * @returns {string} A data e hora formatada de acordo com o formato especificado.
 * @throws {Error} Lança um erro se a data e hora de entrada não for válida.
 *
 * @example
 * // Exemplo de uso:
 * const inputDateTime = "2024-02-07T03:22:12.184723";
 * const formattedDateTime = convertDateTime(inputDateTime, "dd/mm/yyyy HH:mm:ss");
 * console.log(formattedDateTime); // Saída: "07/02/2024 03:22:12"
 */
export function convertDateTime(
  inputDateTime: string,
  format: string = "dd/mm/yyyy HH:mm",
): string {
  const originalDateTime = new Date(inputDateTime);

  if (isNaN(originalDateTime.getTime())) {
    throw new Error("Data e hora de entrada inválida.");
  }

  const day = originalDateTime.getDate().toString().padStart(2, "0");
  const month = (originalDateTime.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = originalDateTime.getFullYear();
  const hour = originalDateTime.getHours().toString().padStart(2, "0");
  const minute = originalDateTime.getMinutes().toString().padStart(2, "0");
  const second = originalDateTime.getSeconds().toString().padStart(2, "0");

  let formattedDateTime;
  if (format === "yyyy-mm-dd HH:mm:ss.SSS") {
    formattedDateTime = inputDateTime.substring(0, 19);
  } else if (format === "yyyy-mm-dd HH:mm:ss") {
    formattedDateTime = inputDateTime.substring(0, 19);
  } else {
    formattedDateTime = `${day}/${month}/${year} às ${hour}:${minute}`;
  }

  return formattedDateTime;
}
