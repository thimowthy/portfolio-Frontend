export enum IntervaloTempo {
  MINUTOS = "Minutos",
  HORAS = "Horas",
  DIAS = "Dias",
}

export function obterValorNumericoIntervaloTempo(
  intervalo: IntervaloTempo | undefined,
): number {
  switch (intervalo) {
    case IntervaloTempo.MINUTOS:
      return 0;
    case IntervaloTempo.HORAS:
      return 1;
    case IntervaloTempo.DIAS:
      return 2;
    default:
      throw new Error("Intervalo de tempo inválido");
  }
}
