type Paciente = {
  id?: number;
  nome?: string;
  numeroProntuario?: string;
  cpf?: string;
  unidade?: string;
  cartaoSus?: string;
  dataNascimento?: string;
  dataAdmissao?: string;
  comorbidades?: Comorbidades[];
  prescricao?: any;
  alergias?: Alergias[];
  situacoesPaciente?: SituacoesPaciente[];
};
