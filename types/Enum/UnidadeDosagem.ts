export enum UnidadeDosagem {
  COMPRIMIDO = "Comprimido",
  GOTAS = "Gotas",
  MILILITRO = "mL",
  MILIGRAMA = "mg",
  GRAMA = "g",
  MILIGRAMA_POR_QUILO = "mg/kg",
}
export const dosagemNumericaMapping: Record<UnidadeDosagem, number> = {
  [UnidadeDosagem.COMPRIMIDO]: 0,
  [UnidadeDosagem.GOTAS]: 1,
  [UnidadeDosagem.MILILITRO]: 2,
  [UnidadeDosagem.MILIGRAMA]: 3,
  [UnidadeDosagem.GRAMA]: 4,
  [UnidadeDosagem.MILIGRAMA_POR_QUILO]: 5,
};

export function obterValorNumericoDosagem(
  dosagem: UnidadeDosagem | string | undefined,
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
      throw new Error("Dosagem inválida");
  }
}
