import DiagnosticoNode from "@/types/diagNode";

const graphDiagnostico: Record<string, DiagnosticoNode> = {
    node1: {
      id: 1,
      ordem: 2,
      nome: "Neutropenia",
      variavel: "contagem",
      condicao: "contagem < 1000",
      posicao: [ 150, 10 ],
      dest: [ 2 ],
    },
    node2: {
      id: 2,
      ordem: 2,
      nome: "Febre",
      variavel: "temperatura",
      condicao: "temperatura > 38.3",
      posicao: [ 400, 10 ],
      dest: [ -1 ],
    },
    node3: {
      id: 3,
      ordem: 2,
      nome: "Febre Ascendente",
      variavel: "horas_temp_maior_38",
      condicao: "horas_temp_maior_38 > 1",
      posicao: [ 400, 110 ],
      dest: [ -1 ],
    },
};
  
export default graphDiagnostico;