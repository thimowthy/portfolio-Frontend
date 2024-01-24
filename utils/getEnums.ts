export async function getEnuns(): Promise<any> {
    const url = "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Auxilio/GetEnuns";
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
      throw error;
    }
  }  