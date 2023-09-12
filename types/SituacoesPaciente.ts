type SituacoesPaciente = {
  id: number;
  temperatura: number;
  peso?: number;
  leito?: string;
  dataAveriguacao: Date;
  idPaciente: number;
  idDiagnostico: number;
  diagnosticos: Diagnosticos[];
};
