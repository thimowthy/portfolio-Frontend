import { IntervaloTempo } from "./Enum/IntervaloTempo";
import { UnidadeDosagem } from "./Enum/UnidadeDosagem";
import { Medicamento } from "./Medicamento";

export type ItemMedicamento = {
    medicamento: Medicamento;
    dose: number;
    unidade_dosagem: UnidadeDosagem;
    intervalo: number;
    intervalo_tempo: IntervaloTempo;
};
  