export enum UnidadeDosagem {
  COMPRIMIDO = "Comprimido",
  GOTAS = "Gotas",
  MILILITRO = "mL",
  MILIGRAMA = "mg",
  GRAMA = "g",
  MILIGRAMA_POR_QUILO = "mg/kg",
}

export function obterValorNumericoDosagem(
  dosagem: UnidadeDosagem | undefined
): number {
  switch (dosagem) {
    case UnidadeDosagem.COMPRIMIDO:
      return 0;
    case UnidadeDosagem.GOTAS:
      return 1;
    case UnidadeDosagem.MILILITRO:
      return 2;
    case UnidadeDosagem.MILIGRAMA:
      return 3;
    case UnidadeDosagem.GRAMA:
      return 4;
    case UnidadeDosagem.MILIGRAMA_POR_QUILO:
      return 5;
    default:
      throw new Error("Intervalo de tempo inválido");
  }
}
