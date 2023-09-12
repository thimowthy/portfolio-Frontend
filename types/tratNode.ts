type TratamentoNode = {
  id: number;
  tipo: number;
  nome: string;
  variavel: string;
  condicao: string;
  mensagem: string;
  dest: string | number | Record<string, number | string>;
  posicao: [number, number];
}
  export default TratamentoNode;
  