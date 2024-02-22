export enum UnidadeDosagem {
  COMPRIMIDO = "Comprimido",
  GOTAS = "Gotas",
  MILILITRO = "mL",
  MILIGRAMA = "mg",
  GRAMA = "g",
  MILIGRAMA_POR_QUILO = "mg/kg",
}
export const dosagemNumericaMapping: Record<string, number> = {
  ["Comprimido"]: 0,
  ["Gotas"]: 1,
  ["mL"]: 2,
  ["mg"]: 3,
  ["g"]: 4,
  ["mg/kg"]: 5,
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
