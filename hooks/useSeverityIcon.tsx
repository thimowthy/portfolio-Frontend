import very_good from "../public/very_good.png";
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
  let tipo;
  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  let situacoesPacienteCopy = [...situacoesPaciente];
  situacoesPacienteCopy.reverse();
  const situacaoAtual = situacoesPacienteCopy?.pop();
  const situacaoDiagnostico = situacaoAtual?.situacaoDiagnostico;
  const tipoNeutropenia = situacaoDiagnostico?.tipoNeutropenia;
  switch (tipoNeutropenia) {
    case 0:
      tipo = very_good;
      break;
    case 1:
      tipo = good;
      break;
    case 2:
      tipo = neutral;
      break;
    case 3:
      tipo = bad;
      break;
    case 4:
      tipo = veryBad;
      break;
    case 5:
      tipo = veryBad;
      break;
    default:
      tipo = neutral;
      break;
  }
  return tipo;
};

export default useServerityIcon;
