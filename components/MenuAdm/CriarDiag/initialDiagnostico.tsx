import DiagnosticoNode from "@/types/diagNode";

const graphDiagnostico: Record<string, DiagnosticoNode> = {
  node1: {
    id: 1,
    ordem: 2,
    nome: "Neutropenia",
    variavel: "Contagem de Neutrófilos (n/mm³)",
    condicao: "Contagem < $",
    valor: 1000,
    posicao: [150, 10],
    dest: [2],
  },
  node2: {
    id: 2,
    ordem: 2,
    nome: "Febre",
    variavel: "Temperatura axilar (°C)",
    condicao: "Temperatura > $",
    valor: 38.3,
    posicao: [400, 10],
    dest: [-1],
  },
  node3: {
    id: 3,
    ordem: 2,
    nome: "Febre Ascendente",
    variavel: "Quantidade de horas com temperatura maior que 38°C",
    condicao: "Horas com temperatura maior 38°C > $",
    valor: 1,
    posicao: [400, 110],
    dest: [-1],
  },
};

export default graphDiagnostico;
