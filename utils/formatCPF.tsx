export const formatCPF = (cpf: string): string => {
  let formatted = cpf.replace(/\D/g, "");

  if (formatted.length > 11) {
    formatted = formatted.substring(0, 11);
  }

  if (formatted.length >= 4) {
    formatted = `${formatted.substring(0, 3)}.${formatted.substring(3)}`;
  }
  if (formatted.length >= 8) {
    formatted = `${formatted.substring(0, 7)}.${formatted.substring(7)}`;
  }
  if (formatted.length >= 12) {
    formatted = `${formatted.substring(0, 11)}-${formatted.substring(11)}`;
  }

  return formatted;
};