import axios from "axios";
import https from "https";

async function fetcher({
  rota,
  metodo,
  cabecalho,
  body,
}: {
  rota: string;
  metodo: string;
  cabecalho?: any;
  body?: any;
}) {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios.defaults.httpsAgent = httpsAgent;
  const response = await axios({
    method: metodo,
    url: rota,
    data: body,
    headers: cabecalho || {},
  }).catch((error) => {
    throw error;
  });

  return response.data;
}

export default fetcher;
