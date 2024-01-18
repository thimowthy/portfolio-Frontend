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
 * const formattedDate = convertDateFormat(inputDate, "dd/mm/yyyy");
 * console.log(formattedDate); // Saída: "17/01/2022"
 */
export function convertDateFormat(
  inputDate: string,
  format: string = "dd/mm/yyyy"
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