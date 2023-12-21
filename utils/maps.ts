const colors: Array<[number, string]> = [
  [0, "bg-orange-900"],
  [1, "bg-yellow-800"],
  [2, "bg-yellow-700"],
  [3, "bg-amber-600"],
  [4, "bg-amber-500"],
];
const tabColorMap = new Map(colors);

const gravity: Array<[number, string]> = [
  [0, ""],
  [1, "Leve"],
  [2, "Moderada"],
  [3, "Grave"],
  [4, "Profunda"],
  [5, "Severa"],
];

const gravityMap = new Map(gravity);

const tiposSanguineos: Array<[number, string]> = [
  [0, "AB+"],
  [1, "AB-"],
  [2, "A+"],
  [3, "A-"],
  [4, "B+"],
  [5, "B-"],
  [6, "O+"],
  [7, "O-"],
];

const tiposSanguineosMap = new Map(tiposSanguineos);

export { tabColorMap, gravityMap, tiposSanguineosMap };
