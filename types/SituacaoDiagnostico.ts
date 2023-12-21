type SituacaoDiagnostico = {
  idPaciente?: number;
  idHemograma?: number;
  temperatura?: number;
  dataVerificacao: number;
  tipoNeutropenia: number;
  neutrofilos?: number;
  neutropenia?: boolean;
  febre: boolean;
};
