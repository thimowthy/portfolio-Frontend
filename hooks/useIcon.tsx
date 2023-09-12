import Image from "next/image";
import febreImg from "../public/termometro.png";
import medicamento from "../public/medicamento.png";
/**
 * Hook para mostrar os ícones de neutropenia e neutropenia febril respectivamente ao lado do nome do paciente.
 * @param {Paciente} paciente - O evento de envio do formulário.
 * @returns {string} string com a URL da imagem.
 */
const useIcon = (paciente: Paciente) => {
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
  } else if (neutropenico) {
    return (
      <Image
        className="h-12 w-auto flex-none rounded-full"
        src={medicamento}
        alt=""
        width="50"
        height="50"
      />
    );
  } else if (febre) {
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
