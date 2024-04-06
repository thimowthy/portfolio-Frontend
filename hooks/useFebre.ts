import { orderByDataVerificacao } from "@/utils/ordering";

export default function useFebre({ paciente }: { paciente: Paciente }) {
  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  situacoesPaciente.sort(orderByDataVerificacao);
  const situacaoAtual = situacoesPaciente?.pop();
  if (situacaoAtual?.situacaoDiagnostico?.febre) {
    return true;
  }
  return false;
}
