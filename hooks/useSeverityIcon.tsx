import very_good from "../public/very_good.png";
import good from "../public/good.png";
import neutral from "../public/neutral.png";
import bad from "../public/bad.png";
import veryBad from "../public/very_bad.png";
import { useState } from "react";
/**
 * Seleciona a URL da imagem de acordo com o estado do paciente em uma escala com 4 níveis.
 * @param {Paciente} paciente - Paciente.
 * @returns {string} string com a URL da imagem.
 */
const useServerityIcon = (paciente: Paciente) => {
  let tipo;
  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  let situacoesPacienteCopy = [...situacoesPaciente];
  const situacaoAtual = situacoesPacienteCopy?.pop();
  const situacaoDiagnostico = situacaoAtual?.situacaoDiagnostico;
  const tipoNeutropenia = situacaoDiagnostico?.tipoNeutropenia;
  switch (tipoNeutropenia) {
    case 0:
      tipo = neutral;
      break;
    case 1:
      tipo = very_good;
      break;
    case 2:
      tipo = good;
      break;
    case 3:
      tipo = neutral;
      break;
    case 4:
      tipo = veryBad;
      break;
    case 5:
      tipo = bad;
      break;
    default:
      tipo = good;
      break;
  }
  return tipo || "";
};

export default useServerityIcon;
