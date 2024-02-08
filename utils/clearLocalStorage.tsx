/**
 * Limpa todos os itens armazenados no Local Storage.
 * @function
 * @throws {Error} Lança um erro se ocorrer um problema durante a limpeza.
 * @example
 * // Exemplo de uso:
 * clearLocalStorage();
 */
export function clearLocalStorage() {
  try {
    localStorage.clear();
  } catch (error) {}
}
