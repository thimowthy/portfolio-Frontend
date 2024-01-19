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
  const baseURL = "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com";
  // const baseURL = "http://localhost:5130";
  const token =
    typeof window != "undefined"
      ? localStorage?.getItem("Authorization")
      : null;
  let defaultHeader = {
    "Authorization": `Bearer ${token}`,
    "AccessControlAllowOrigin": "*",
    "AccessControlAllowHeaders": "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json; charset=utf-8",
    "Transfer-Encoding": "chunked"
  };
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
    url: baseURL + rota,
    data: body,
    headers: cabecalho || defaultHeader,
  }).catch((error) => {
    throw error;
  });

  return response.data;
}

export default fetcher;
