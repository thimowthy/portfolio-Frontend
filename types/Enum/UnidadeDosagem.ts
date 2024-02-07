export enum UnidadeDosagem {
  COMPRIMIDO = "Comprimido",
  GOTAS = "Gotas",
  /* UI_KG = "UI/kg", */
  ML = "mL",
  MG = "mg",
  G = "g",
  MG_KG = "mg/kg",
}

export function obterValorNumericoDosagem(
  intervalo: UnidadeDosagem | undefined
): number {
  switch (intervalo) {
    case UnidadeDosagem.COMPRIMIDO:
      return 0;
    case UnidadeDosagem.GOTAS:
      return 1;
    case UnidadeDosagem.ML:
      return 2;
    case UnidadeDosagem.MG:
      return 3;
    case UnidadeDosagem.G:
      return 4;
    case UnidadeDosagem.MG_KG:
      return 5;
    default:
      throw new Error("Intervalo de tempo inválido");
  }
}
