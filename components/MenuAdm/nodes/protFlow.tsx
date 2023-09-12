import { defaultTratamento } from "./tratFlow";
import { defaultDiagnostico } from "./diagFlow";
import Protocolo from "@/types/Protocolo";


const defaultProtocolo: Protocolo = {
    id: 0,
    nome: "",
    ano: "",
    versao: "",
    diagnostico: defaultDiagnostico,
    tratamento: defaultTratamento
};

export { defaultProtocolo };
