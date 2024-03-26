import { IntervaloTempo } from "./Enum/IntervaloTempo";
import { UnidadeDosagem } from "./Enum/UnidadeDosagem";
import { Medicamento } from "./Medicamento";

export type ItemMedicamento = {
  medicamento: Medicamento | undefined | number;
  dose: number;
  unidadeDosagem: UnidadeDosagem | string;
  intervalo: number;
  intervaloTempo: IntervaloTempo | string;
};
