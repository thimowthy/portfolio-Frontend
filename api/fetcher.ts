import axios from "axios";

async function fetcher(
  rota: string,
  metodo: string,
  cabecalho: any,
  body: any,
) {
  const response = await axios({
    method: metodo,
    url: rota,
    data: body,
    // headers: cabecalho
  }).catch((error) => {
    throw error;
  });

  return response.data;
}

export default fetcher;
