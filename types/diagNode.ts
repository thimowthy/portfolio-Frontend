type DiagnosticoNode = {
  id: number;
  ordem: number;
  nome: string;
  variavel: string;
  condicao: string;
  valor: number;
  posicao: [number, number];
  dest: number[];
};
export default DiagnosticoNode;
