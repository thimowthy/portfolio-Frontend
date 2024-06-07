export async function getEnums(): Promise<any> {
  const url =
    "https://oncocaresystem-d7da4ba420ce.herokuapp.com/Auxilio/GetEnuns";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter os dados:", error);
    throw error;
  }
}
