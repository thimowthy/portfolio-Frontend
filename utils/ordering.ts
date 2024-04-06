export function orderByDataVerificacao(a: any, b: any) {
  const dataVerificacao1 = a?.situacaoDiagnostico.dataVerificacao;
  const dataVerificacao2 = b?.situacaoDiagnostico.dataVerificacao;

  if (dataVerificacao1 > dataVerificacao2) {
    return 1;
  }
  if (dataVerificacao1 < dataVerificacao2) {
    return -1;
  }
  return 0;
}

export function orderByTipoNeutropenia(a: any, b: any) {
  const situacoesPaciente1 = a?.internacao?.situacoesPaciente || [];
  const internacao1 = a?.internacao;
  let situacoesPacienteCopy1 = [...situacoesPaciente1];
  const situacaoAtual1 = situacoesPacienteCopy1?.pop();

  const situacoesPaciente2 = b?.internacao?.situacoesPaciente || [];
  const internacao2 = b?.internacao;
  let situacoesPacienteCopy2 = [...situacoesPaciente2];
  const situacaoAtual2 = situacoesPacienteCopy2?.pop();
  const tipoNeutropenia1 =
    situacaoAtual1?.situacaoDiagnostico?.tipoNeutropenia || 0;
  const tipoNeutropenia2 =
    situacaoAtual2?.situacaoDiagnostico?.tipoNeutropenia || 0;
  if (tipoNeutropenia1 < tipoNeutropenia2) {
    return 1;
  }
  if (tipoNeutropenia1 > tipoNeutropenia2) {
    return -1;
  }
  if (tipoNeutropenia1 == tipoNeutropenia2) {
    if (internacao1?.risco < internacao2?.risco) {
      return 1;
    }
    if (internacao1?.risco > internacao2?.risco) {
      return -1;
    }
    return 0;
  }
  return 0;
}
