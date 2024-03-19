type Exame = {
  id: number;
  dataSolicitacao: string;
  dataResultado: string;
  idSolicitante: number;
  cpfSolicitante: string;
  nomeSolicitante: string;
  idInternamento: number;
};

type Hemograma = Exame & {
  neutrofilos: number;
};
