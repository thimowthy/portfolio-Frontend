import Image from "next/image";
import Link from "next/link";
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
import { useState } from "react";
import { tabColorMap } from "@/utils/maps";

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

  const ImageURL = (paciente: Paciente) => {
    return useServerityIcon(paciente);
  };

  const [dischargeError, setDischargeError] = useState(false);
  const [sucessDischarge, setSucessDischarge] = useState(false);

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
    return;
  };

  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  let situacoesPacienteCopy = [...situacoesPaciente];
  const situacaoAtual = situacoesPacienteCopy?.pop();
  const situacaoPaciente = paciente?.internacao?.situacoesPaciente || [];

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
      <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
        {paciente.id && (
          <>
            <div className="flex gap-x-4 pb-3">
              <Image
                className="h-12 w-12 flex-none rounded-full"
                src={ImageURL(paciente)}
                width="250"
                height="250"
                alt="Estado do paciente"
              />
              <div className="min-w-0 flex-auto">
                <div className="flex justify-between">
                  <p className="text-xl font-semibold leading-6 text-gray-900 align-middle">
                    {paciente.nome}
                  </p>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded"
                    onClick={() =>
                      handleDischargePatient(paciente.id as number)
                    }
                  >
                    Dar alta
                  </button>
                </div>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Prontuário: {paciente.numeroProntuario}
                </p>
              </div>
            </div>
            <hr />
            <div className="pt-2">
              <h1 className="text-2xl">
                Dados do paciente{" "}
                {situacaoAtual && situacaoAtual?.situacaoDiagnostico?.febre && (
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
                <p className="my-1">CPF: {paciente.cpf}</p>
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
                    "DD/MM/YYYY h:mm:ss",
                  )}
                </p>
                {/* <p>Unidade: {paciente.unidade}</p> */}
              </div>
            </div>

            <div>
              <div className="rounded-md bg-green-200 p-2 w-100">
                <p className="text-xl">
                  Prontuário {paciente.numeroProntuario}
                </p>
                {paciente?.comorbidades &&
                  paciente?.comorbidades?.length > 0 && (
                    <div className="py-1">
                      <p className="text-lg pl-2">Comorbidades:</p>
                      {paciente?.comorbidades?.map(
                        (comorbidade: any, index: number) => {
                          return (
                            <p
                              key={`${comorbidade.nome}${index}`}
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
                {/* <div className="py-1">
            <p className="text-lg pl-2">
              Última prescrição: {paciente.prescricao?.data}
            </p>
            {paciente.prescricao?.medicamentos.map(
              (prescricao: any) => (
                <p
                  key={prescricao.numeroProntuario}
                  className="text-sm pl-4"
                >
                  {prescricao.medicacao +
                    prescricao.dosagem +
                    prescricao.periodo}
                </p>
              ),
            )}
          </div> */}
                <div className="flex justify-end">
                  <a href="#" className="text-right text-sm">
                    Ver prontuário completo
                  </a>
                </div>
              </div>

              <hr />
              <div className="mt-4">
                <h1 className="text-xl flex">
                  Febre?{" "}
                  <span
                    className="text-xl"
                    data-te-toggle="tooltip"
                    data-te-html="true"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    title=">38,3°C medida única, OU >38°C por mais de 1h"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#3FB8FC"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </span>
                </h1>
                <div className="flex mt-2">
                  <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 px-10">
                    Não
                  </button>

                  <Link
                    href={{
                      pathname: "/estratificacao-risco",
                      query: {
                        id: paciente.id,
                        dataNascimento: paciente.dataNascimento,
                        admissao: paciente.dataAdmissao,
                        nome: paciente.nome,
                        cpf: paciente.cpf,
                        prontuario: paciente.numeroProntuario,
                        cartaoSus: paciente.cns,
                      },
                    }}
                    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 px-10"
                  >
                    Sim
                  </Link>
                </div>
              </div>
              <div className="pt-2">
                <h1 className="text-2xl">Progresso do tratamento</h1>

                {/* TODO: for (paciente.situacoesPaciente as situacao) */}

                <TabList className="flex flex-row rounded-full bg-white mt-4">
                  {situacaoPaciente?.map((item, index) => {
                    return (
                      <TabItem
                        key={item.id}
                        href={`tab-${item.id}`}
                        liClassName={`basis-1/5 ${tabColorMap.get(
                          index,
                        )} py-2 pl-2 ${
                          index === 0 ? "rounded-bl-full rounded-tl-full" : ""
                        } ${
                          index === 4 ? "rounded-br-full rounded-tr-full" : ""
                        }`}
                        active={index === 1 || undefined}
                      >
                        <p className="text-white">
                          {moment(item?.dataVerificacao).format(
                            "DD/MM/YYYY h:mm:ss",
                          )}
                        </p>
                      </TabItem>
                    );
                  })}
                </TabList>
                {situacaoPaciente?.map((item, index) => {
                  return (
                    <TabContents
                      key={item.id}
                      tabId={`tab-${item.id}`}
                      active={index === 0 || false}
                    >
                      <div className="pt-2 flex flex-row gap-x-2">
                        <div className="basis-1/2">
                          <p>
                            Data de verificação:{" "}
                            {moment(
                              item?.situacaoDiagnostico?.dataVerificacao,
                            ).format("DD/MM/YYYY h:mm:ss")}
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

                              <button className="bg-white hover:bg-grery-700 text-grey font-bold py-2 px-4 rounded mt-3 drop-shadow-md">
                                Acessar +exames
                              </button>
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