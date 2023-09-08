import Diagnostico from "./Diagnostico";
import Tratamento from "./Tratamento";

type Protocolo = {
    id: number;
    nome: string;
    ano: string;
    versao: string;
    diagnostico: Diagnostico;
    tratamento: Tratamento;
  };
  
  export default Protocolo;
  