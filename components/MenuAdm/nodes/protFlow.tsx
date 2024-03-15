import { defaultTratamento } from "./tratFlow";
import { defaultDiagnostico } from "./diagFlow";
import Protocolo from "@/types/Protocolo";

const anoAtual = new Date().getFullYear();

const defaultProtocolo: Protocolo = {
    id: 1,
    nome: "",
    ano: anoAtual.toString(),
    versao: "",
    diagnostico: defaultDiagnostico,
    tratamento: defaultTratamento
};

export { defaultProtocolo };
