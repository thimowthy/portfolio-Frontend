import { ItemCuidado } from "./ItemCuidado";
import { ItemMedicamento } from "./ItemMedicamento";

export type Prescricao = {
  medicacoes: ItemMedicamento[];
  cuidados: ItemCuidado[];
};
