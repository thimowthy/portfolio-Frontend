import { defaultTratamento } from "./tratFlow";
import { defaultDiagnostico } from "./diagFlow";
import Protocolo from "@/types/Protocolo";


const defaultProtocolo: Protocolo = {
    id: 1,
    nome: "",
    ano: "",
    versao: "",
    diagnostico: defaultDiagnostico,
    tratamento: defaultTratamento
};

export { defaultProtocolo };
