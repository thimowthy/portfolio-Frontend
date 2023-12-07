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
  const token =
    typeof window != "undefined"
      ? localStorage?.getItem("Authorization")
      : null;
  let defaultHeader = { Authorization: `Bearer ${token}` };
  if (token) {
    if (cabecalho && !cabecalho.Authorization) {
      cabecalho.Authorization = `Bearer ${token}`;
    }
  }
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios.defaults.httpsAgent = httpsAgent;
  const response = await axios({
    method: metodo,
    url: rota,
    data: body,
    headers: cabecalho || defaultHeader,
  }).catch((error) => {
    throw error;
  });

  return response.data;
}

export default fetcher;
