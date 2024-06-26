import Image from "next/image";
import moment from "moment";
import TabContents from "../TabContents/index";
import useServerityIcon from "@/hooks/useSeverityIcon";
import api from "@/helpers";
import styles from "./styles.module.css";
import febreImg from "../../public/termometro.png";
import ErrorToast from "../toasts/errorToast";
import SuccessToast from "../toasts/successToast";
import TabItem from "../TabItem";
import TabList from "../TabList";
import { useEffect, useState } from "react";
import { tabColorMap } from "@/utils/maps";
import { setColor } from "@/utils/colorTransition";
import fetcher from "@/api/fetcher";
import Swal from "sweetalert2";
import { getUserCargo } from "@/utils/getCargo";
import { formatCPF } from "@/utils/formatCPF";

export default function PacienteTab({ paciente }: { paciente: Paciente }) {
  const selectLabelNeutrofilos = (quantidadeNeutrofilos: number) => {
    if (quantidadeNeutrofilos >= 1000) {
      return styles.low;
    } else if (quantidadeNeutrofilos >= 500) {
      return styles.medium;
    } else if (quantidadeNeutrofilos > 100) {
      return styles.grave;
    } else {
      return styles.high;
    }
  };

  const GetPacienteIcon = (paciente: any) => {
    return useServerityIcon(paciente);
  };

  const [dischargeError, setDischargeError] = useState(false);
  const [sucessDischarge, setSucessDischarge] = useState(false);
  const [temperatura, setTemperatura] = useState<number>(36.5);
  const [pacienteIcon, setPacienteIcon] = useState<any>();
  const [hasTemperaturaError, setTemperaturaError] = useState<boolean>(false);

  /**
   * Seta alta no paciente
   * @param {Number} pacienteId - Id do paciente
   * @returns {void}.
   */
  const handleDischargePatient = async (pacienteId: number) => {
    const result = await api.setDischargePatient(pacienteId as number);
    if (!result) {
      setDischargeError(true);
      return;
    }
    setSucessDischarge(true);
    window.location.reload();
    return;
  };

  const submitTemperatura = async (pacienteId: number) => {
    if (hasTemperaturaError) {
      return Swal.fire(
        "Erro!",
        "A temperatura deve ser um valor entre 30 e 45 graus.",
        "error",
      );
    }

    try {
      await fetcher({
        rota: `/Internacao/CadastrarTemperatura/${pacienteId}`,
        metodo: "POST",
        body: {
          temperatura,
        },
      });
      return Swal.fire(
        "Sucesso!",
        "Temperatura registrada com sucesso!",
        "success",
      );
    } catch (error) {
      return Swal.fire(
        "Erro!",
        "Aconteceu algum erro ao tentar atualizar a temperatura",
        "error",
      );
    }
  };
  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  const situacoesOrdenadas = [...situacoesPaciente];
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
  situacoesOrdenadas.sort(orderSituacoes);

  let situacoesPacienteCopy = [...situacoesOrdenadas];
  const situacaoAtual = situacoesPacienteCopy?.pop();

  const [permissaoMedico, setPermissaoMedico] = useState<boolean>(false);
  const [permissaoEnfermeiro, setPermissaoEnfermeiro] =
    useState<boolean>(false);

  useEffect(() => {
    setPacienteIcon(GetPacienteIcon(paciente));
    const cargoFromStorage = getUserCargo();
    setPermissaoMedico(cargoFromStorage === "MEDICO");
    setPermissaoEnfermeiro(cargoFromStorage === "ENFERMEIRO");
  }, [paciente]);

  return (
    <>
      {dischargeError && (
        <ErrorToast
          className="toast-error"
          title="Ocorreu um erro ao dar alta ao paciente"
          message="Ocorreu um erro no sistema ao tentar dar alta ao paciente, por favor tente mais tarde ou contate um administrador."
          onClose={() => {
            setDischargeError(false);
          }}
        />
      )}
      {sucessDischarge && (
        <SuccessToast
          className="toast-error"
          title="A alta do paciente foi realizada com sucesso!"
          message="A alta para o paciente foi registrada no sistema com sucesso."
          onClose={() => {
            setSucessDischarge(false);
          }}
        />
      )}
      <div className="flex mx-1 flex-col gap-x-6 py-5 px-6 bg-[#EAEAEA] detalhes-paciente">
        {paciente.id && (
          <>
            <div className="flex gap-x-4 pb-3">
              <Image
                className="h-12 w-12 flex-none rounded-full"
                src={pacienteIcon}
                width="250"
                height="250"
                alt="Estado do paciente"
              />
              <div className="min-w-0 flex-auto">
                <div className="flex justify-between">
                  <p className="text-xl font-semibold leading-6 text-gray-900 align-middle">
                    {paciente.nome}
                  </p>
                  {permissaoMedico && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded"
                      onClick={() =>
                        handleDischargePatient(paciente.id as number)
                      }
                    >
                      Dar alta
                    </button>
                  )}
                </div>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Prontuário: {paciente.numeroProntuario}
                </p>
              </div>
            </div>
            <hr className="border-[#cacaca] my-2" />
            <div className="pt-2">
              <h1 className="text-2xl">
                Dados do paciente{" "}
                {situacaoAtual &&
                  situacaoAtual?.situacaoDiagnostico?.febre &&
                  situacaoAtual?.situacaoDiagnostico?.neutropenia && (
                    <span className="float-right text-danger flex">
                      Neutropenia Febril{" "}
                      <Image
                        className="w-4 ml-4"
                        src={febreImg}
                        alt="Termômetro - Febre"
                      />
                    </span>
                  )}
              </h1>
            </div>
            <div className="flex gap-x-4 pt-4 pb-2">
              <div>
                <p className="my-1">CPF: {formatCPF(paciente.cpf || "")}</p>
                <p className="my-1">
                  Data de nascimento:{" "}
                  {paciente?.dataNascimento
                    ? moment(paciente?.dataNascimento).format("DD/MM/YYYY")
                    : ""}
                </p>
                <p className="my-1">Cartão SUS: {paciente.cns}</p>
              </div>

              <div className="ml-5">
                <p className="my-1">Prontuário: {paciente.numeroProntuario}</p>

                <p className="my-1">Leito: {paciente?.internacao?.leito}</p>
                <p className="my-1">
                  Data internação:{" "}
                  {moment(paciente?.internacao?.dataAdmissao).format(
                    "DD/MM/YYYY HH:mm:ss",
                  )}
                </p>
              </div>
            </div>

            <div>
              <div className="rounded-md bg-[#d9e0df] p-2 w-100">
                {paciente?.comorbidades &&
                  paciente?.comorbidades?.length > 0 && (
                    <div className="py-1">
                      <p className="text-lg pl-2">Comorbidades:</p>
                      {paciente?.comorbidades?.map(
                        (comorbidade: any, index: number) => {
                          return (
                            <p
                              key={`${comorbidade.id}${index}`}
                              className="text-sm pl-4"
                            >
                              {comorbidade?.nome}
                            </p>
                          );
                        },
                      )}
                    </div>
                  )}
                <div className="py-1">
                  <p className="text-lg pl-2">Alergias:</p>
                  {paciente?.alergias?.map((alergia: any) => {
                    return (
                      <p key={alergia.nome} className="text-sm pl-4">
                        {alergia?.nome}
                      </p>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-right text-sm bg-[#eff5f4] border-none hover:bg-[#fff] rounded px-3 py-1"
                  >
                    Ver prontuário completo
                  </a>
                </div>
              </div>
              <hr className="border-[#cacaca] my-4" />
              <div>
                <h1
                  className="text-xl flex"
                  title=">38,3°C medida única, OU >38°C por mais de 1h"
                >
                  Temperatura (°C)
                </h1>
                <div className="flex mt-2 items-center">
                  <input
                    className="w-20 p-1 text-2xl text-right rounded border-2"
                    maxLength={3}
                    value={temperatura}
                    onChange={(e) => {
                      setTemperatura(parseFloat(e.target.value));
                      setTemperaturaError(
                        isNaN(parseFloat(e.target.value)) ||
                          parseFloat(e.target.value) < 30 ||
                          parseFloat(e.target.value) > 45,
                      );
                    }}
                    type="number"
                    step={0.1}
                    min={30}
                    max={45}
                    style={{
                      borderColor: setColor(temperatura),
                      outline: "none",
                    }}
                  />
                  <span className="text-2xl ml-2 mr-8">°C</span>
                  <button
                    onClick={() => submitTemperatura(paciente.id)}
                    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 rounded px-4"
                    disabled={
                      isNaN(temperatura) || temperatura < 30 || temperatura > 45
                    }
                  >
                    Enviar
                  </button>
                </div>
                {hasTemperaturaError && (
                  <p className="text-red-500 text-sm mt-2">
                    A temperatura deve ser um valor entre 30 e 45 graus.
                  </p>
                )}
              </div>
              <div className="pt-2">
                <h1 className="text-2xl">Progresso do tratamento</h1>

                <TabList className="flex flex-row rounded-full bg-white mt-4">
                  {situacoesOrdenadas?.map((item: any, index: any) => (
                    <TabItem
                      key={`tab-${paciente.id}-${item.id}`}
                      href={`tab-${paciente.id}-${item.id}`}
                      liClassName={`basis-1/5 ${tabColorMap.get(
                        index,
                      )} py-2 pl-2 ${
                        index === 0 ? "rounded-bl-full rounded-tl-full" : ""
                      } ${
                        index === 4 ? "rounded-br-full rounded-tr-full" : ""
                      }`}
                      selected={
                        index === situacoesOrdenadas.length - 1 || false
                      }
                    >
                      <p className="text-white">
                        {moment(item?.dataVerificacao).format(
                          "DD/MM/YYYY HH:mm:ss",
                        )}
                      </p>
                    </TabItem>
                  ))}
                </TabList>
                {situacoesOrdenadas?.map((item: any, index: any) => {
                  return (
                    <TabContents
                      key={`tab-${paciente.id}-${item.id}`}
                      tabId={`tab-${paciente.id}-${item.id}`}
                      active={index === situacoesOrdenadas.length - 1 || false}
                    >
                      <div className="pt-2 flex flex-row gap-x-2">
                        <div className="basis-1/2">
                          <p>
                            Data de verificação:{" "}
                            {moment(
                              item?.situacaoDiagnostico?.dataVerificacao,
                            ).format("DD/MM/YYYY HH:mm:ss")}
                          </p>
                          <p>
                            Temperatura:{" "}
                            {item?.situacaoDiagnostico?.temperatura}
                          </p>
                        </div>
                        <div className="basis-1/2">
                          <div className="flex justify-center flex-col items-end text-center">
                            <div>
                              <p className="text-center">Neutrófilos:</p>
                              <p className="text-red-500">
                                {item?.situacaoDiagnostico?.neutrofilos}
                                /mm3
                              </p>
                              <div className="flex justify-center">
                                <div
                                  className={selectLabelNeutrofilos(
                                    item?.situacaoDiagnostico?.neutrofilos || 0,
                                  )}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabContents>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
