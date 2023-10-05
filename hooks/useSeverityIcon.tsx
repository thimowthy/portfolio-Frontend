import good from "../public/good.png";
import neutral from "../public/neutral.png";
import bad from "../public/bad.png";
import veryBad from "../public/very_bad.png";
/**
 * Seleciona a URL da imagem de acordo com o estado do paciente em uma escala com 4 níveis.
 * @param {Paciente} paciente - Paciente.
 * @returns {string} string com a URL da imagem.
 */
const useServerityIcon = (paciente: Paciente) => {
  const neutropenico =
    paciente?.situacoesPaciente !== undefined &&
    paciente?.situacoesPaciente?.length > 0 &&
    paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
      ? paciente?.situacoesPaciente[0]?.diagnosticos[0].neutropenico
      : false;
  const febre =
    paciente?.situacoesPaciente !== undefined &&
    paciente?.situacoesPaciente?.length > 0 &&
    paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
      ? paciente?.situacoesPaciente[0]?.diagnosticos[0].febre
      : false;
  if (neutropenico && febre) {
    return veryBad;
  } else if (neutropenico) {
    return bad;
  } else if (febre) {
    return neutral;
  }
  return good;
};

export default useServerityIcon;
