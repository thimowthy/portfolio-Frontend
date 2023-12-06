type Exame = {
  id: number;
  dataSolicitacao: string;
  dataResultado: string;
  idSolicitante: number;
  solicitante: string;
};

type Hemograma = Exame & { 
  neutrofilos: number
}
