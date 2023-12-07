import { Prescricao } from "./Prescricao";

type TratamentoNode = {
  id: number;
  tipo: number;
  nome: string;
  variavel: string;
  condicao: string;
  descricao: string;
  mensagem: string;
  prescricao?: Prescricao
  dest: string | number | Record<string, number | string>;
  posicao: [number, number];
}
  export default TratamentoNode;
  