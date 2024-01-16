import { gravityMap } from "@/utils/maps";
import { useEffect, useState } from "react";

export default function useTipoNeutropenia(paciente: Paciente) {
  const [tipoNeutropenia, setTipoNeutropenia] = useState<any>();
  useEffect(() => {
    const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
    let situacoesPacienteCopy = [...situacoesPaciente];
    const situacaoAtual = situacoesPacienteCopy?.pop();
    const situacaoDiagnostico = situacaoAtual?.situacaoDiagnostico ?? {
      tipoNeutropenia: 0,
    };
    setTipoNeutropenia(situacaoDiagnostico.tipoNeutropenia);
  }, []);

  return [tipoNeutropenia];
}
