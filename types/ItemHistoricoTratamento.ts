import { IntervaloTempo } from "./Enum/IntervaloTempo";
import { UnidadeDosagem } from "./Enum/UnidadeDosagem";

type ItemHistoricoTratamento = {
    id: number;
    nomeSolicitante: string;
    dataSolicitacao: string;
    itensCuidado: ItemCuidado[];
    itensMedicamento: ItemMedicamento[];
};

type ItemCuidado = {
    descricao: string;
};

type ItemMedicamento = {
    intervaloTempo: IntervaloTempo;
    intervalo: number;
    unidadeDosagem: UnidadeDosagem;
    dose: number;
    nomeMedicamento: string;
};

export default ItemHistoricoTratamento;
