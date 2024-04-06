import { useEffect, useState } from "react";
import { orderByDataVerificacao } from "@/utils/ordering";

export default function useNeutropenia({ paciente }: { paciente: Paciente }) {
  const [neutropenico, setNeutropenico] = useState(false);

  useEffect(() => {
    const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
    situacoesPaciente.sort(orderByDataVerificacao);
    const situacaoAtual = situacoesPaciente?.pop();
    if (situacaoAtual?.situacaoDiagnostico?.neutropenia) {
      setNeutropenico(true);
    }
  }, [paciente]);

  return neutropenico;
}
