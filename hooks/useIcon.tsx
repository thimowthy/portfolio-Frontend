import Image from "next/image";
import febreImg from "../public/termometro.png";
import medicamento from "../public/medicamento.png";
/**
 * Hook para mostrar os ícones de neutropenia e neutropenia febril respectivamente ao lado do nome do paciente.
 * @param {Paciente} paciente - O evento de envio do formulário.
 * @returns {string} string com a URL da imagem.
 */
const useIcon = (paciente: Paciente) => {
  const orderSituacoes = (a: any, b: any) => {
    const dataVerificacao1 = a?.situacaoDiagnostico.dataVerificacao;
    const dataVerificacao2 = b?.situacaoDiagnostico.dataVerificacao;

    if (dataVerificacao1 > dataVerificacao2) {
      return 1;
    }
    if (dataVerificacao1 < dataVerificacao2) {
      return -1;
    }
    return 0;
  };

  const isNeutropenico = (paciente: Paciente) => {
    const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
    let situacoesPacienteCopy = [...situacoesPaciente];
    situacoesPacienteCopy.sort(orderSituacoes);
    const situacaoAtual = situacoesPacienteCopy?.pop();
    if (situacaoAtual?.situacaoDiagnostico?.neutropenia) {
      return true;
    }
    return false;
  };
  const febre = (paciente: Paciente) => {
    const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
    let situacoesPacienteCopy = [...situacoesPaciente];
    situacoesPacienteCopy.sort(orderSituacoes);
    const situacaoAtual = situacoesPacienteCopy?.pop();
    if (situacaoAtual?.situacaoDiagnostico?.febre) {
      return true;
    }
    return false;
  };
  if (isNeutropenico(paciente) && febre(paciente)) {
    return (
      <div className="flex">
        <Image
          className="h-12 w-auto flex-none rounded-full"
          src={febreImg}
          alt=""
          width="50"
          height="50"
        />
        <Image
          className="h-12 w-auto flex-none rounded-full ml-4"
          src={medicamento}
          alt=""
          width="50"
          height="50"
        />
      </div>
    );
  } else if (isNeutropenico(paciente)) {
    return (
      <Image
        className="h-12 w-auto flex-none rounded-full"
        src={medicamento}
        alt=""
        width="50"
        height="50"
      />
    );
  } else if (febre(paciente)) {
    return (
      <Image
        className="h-12 w-auto flex-none rounded-full"
        src={febreImg}
        alt=""
        width="50"
        height="50"
      />
    );
  }
  return;
};

export default useIcon;
