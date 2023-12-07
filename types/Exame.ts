type Exame = {
  id: number;
  dataSolicitacao: string;
  dataResultado: string;
  idSolicitante: number;
  solicitante: string;
  idInternamento: number;
};

type Hemograma = Exame & { 
  neutrofilos: number
}
