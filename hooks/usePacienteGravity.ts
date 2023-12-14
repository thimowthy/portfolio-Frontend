import { gravityMap } from "@/utils/maps";
import { useEffect, useState } from "react";

export default function usePacienteGravity(paciente: Paciente) {
  const [gravidade, setGravidade] = useState("");
  useEffect(() => {
    const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
    let situacoesPacienteCopy = [...situacoesPaciente];
    const situacaoAtual = situacoesPacienteCopy?.pop();
    const situacaoDiagnostico = situacaoAtual?.situacaoDiagnostico ?? {
      tipoNeutropenia: 0,
    };
    console.log(situacaoDiagnostico);
    setGravidade(gravityMap.get(situacaoDiagnostico.tipoNeutropenia) || "");
  }, [paciente]);

  return [gravidade];
}
