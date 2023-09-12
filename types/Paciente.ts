type Paciente = {
  id?: number;
  nome?: string;
  prontuario?: string;
  neutropenia?: string;
  neutropeniaFebril?: boolean;
  cpf?: string;
  unidade?: string;
  cartaoSus?: string;
  dataNascimento?: string;
  leito?: string;
  dataAdmissao?: string;
  comorbidades?: Comorbidades[];
  prescricao?: any;
  alergias?: Alergias[];
  situacoesPaciente?: SituacoesPaciente[];
};
