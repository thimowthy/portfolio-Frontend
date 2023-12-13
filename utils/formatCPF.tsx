export const formatCPF = (cpf: string) => {
  const cpfNumerico = cpf.replace(/\D/g, "");
  const cpfFormatado = cpfNumerico.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4",
  );
  return cpfFormatado;
};
