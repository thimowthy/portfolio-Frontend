type Paciente = {
  id?: number;
  nome?: string;
  numeroProntuario?: string;
  cpf?: string;
  unidade?: string;
  cns?: string;
  dataNascimento?: string;
  dataAdmissao?: string;
  comorbidades?: Comorbidades[];
  prescricao?: any;
  alergias?: Alergias[];
  situacoesPaciente?: SituacoesPaciente[];
};
