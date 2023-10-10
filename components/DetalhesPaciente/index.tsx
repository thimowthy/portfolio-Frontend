import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import good from "../../public/good.png";
import neutral from "../../public/neutral.png";
import bad from "../../public/bad.png";
import veryBad from "../../public/very_bad.png";
import febreImg from "../../public/termometro.png";
import moment from "moment";
import TabList from "../TabList";
import TabItem from "../TabItem";
import TabContents from "../TabContents/index";
import api from "@/helpers";
import ErrorToast from "../toasts/errorToast";
import SuccessToast from "../toasts/successToast";
import ExamesList from "../ExameList";
import Link from "next/link";
/**
 * Renderiza o a página de detalhes do paciente.
 * @category Component
 */
export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  const quantidadeNeutrofilos =
    paciente?.situacoesPaciente !== undefined &&
    paciente?.situacoesPaciente?.length > 0 &&
    paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
      ? paciente?.situacoesPaciente[0]?.diagnosticos[0]?.neutrofilos
      : null;
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

  const selectLabelNeutrofilos = (quantidadeNeutrofilos: number) => {
    if (quantidadeNeutrofilos > 1000) {
      return styles.low;
    } else if (quantidadeNeutrofilos > 500) {
      return styles.medium;
    } else {
      return styles.grave;
    }
  };

  const imageURL = (paciente: Paciente) => {
    if (neutropenico && febre) {
      return veryBad;
    } else if (neutropenico) {
      return bad;
    } else if (febre) {
      return neutral;
    }
    return good;
  };
  useEffect(() => {
    const init = async () => {
      const { Ripple, Tooltip, initTE } = await import("tw-elements");
      initTE({ Ripple, Tooltip });
    };
    init();
  }, []);
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

  return (
    <div>
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
      <>
        <TabList className="flex list-none flex-row flex-wrap border-b-0 pl-0">
          <TabItem
            href="tabs-neutral"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]"
            title="Paciente"
            active={true}
            disabled={!paciente || !paciente.id}
          />

          <TabItem
            href="tabs-exames"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]"
            title="Exames 📝"
            disabled={!paciente || !paciente.id}
          />
        </TabList>
        <div id="contents" className="bg-[#DADADA]">
          <TabContents tabId="tabs-neutral" active={true}>
            <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
              {paciente.id && (
                <>
                  <div className="flex gap-x-4 pb-3">
                    <Image
                      className="h-12 w-12 flex-none rounded-full"
                      src={imageURL(paciente) || ""}
                      width="250"
                      height="250"
                      alt=""
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
                      {paciente?.situacoesPaciente !== undefined &&
                        paciente?.situacoesPaciente[0] &&
                        paciente?.situacoesPaciente[0].diagnosticos[0] &&
                        paciente?.situacoesPaciente[0].diagnosticos[0]
                          .neutropenico &&
                        paciente?.situacoesPaciente[0].diagnosticos[0]
                          .febre && (
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
                      <p>CPF: {paciente.cpf}</p>
                      <p>
                        Data de nascimento:{" "}
                        {paciente?.dataNascimento
                          ? moment(paciente?.dataNascimento).format(
                              "DD/MM/YYYY",
                            )
                          : ""}
                      </p>
                      <p>Cartão SUS: {paciente.cns}</p>
                    </div>

                    <div>
                      <p>Prontuário: {paciente.numeroProntuario}</p>
                      <p>
                        Leito:{" "}
                        {paciente?.situacoesPaciente !== undefined &&
                        paciente?.situacoesPaciente[0]
                          ? paciente?.situacoesPaciente[0].leito
                          : ""}
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
                        <TabItem
                          href="D0"
                          liClassName="basis-1/5 bg-orange-900 py-2 pl-2 rounded-bl-full rounded-tl-full"
                          active={true}
                        >
                          <p className="text-white">D0: 10/07/2023</p>
                        </TabItem>
                        <TabItem
                          href="D1"
                          liClassName="basis-1/5 bg-yellow-800 py-2 pl-2"
                        >
                          <p className="text-white">D1: 11/07/2023</p>
                        </TabItem>
                        <TabItem
                          href="D3"
                          liClassName="basis-1/5 bg-yellow-700 py-2 pl-2"
                        >
                          <p className="text-white">D3: 13/07/2023</p>
                        </TabItem>
                        <TabItem
                          href="D5"
                          liClassName="basis-1/5 bg-amber-600 py-2 pl-2"
                        >
                          <p className="text-white">D5: 15/07/2023</p>
                        </TabItem>
                        <TabItem
                          href="last"
                          liClassName="basis-1/5 bg-amber-500 py-2 pl-2 rounded-br-full rounded-tr-full"
                        >
                          <p className="text-white">Atual: 17/07/2023</p>
                        </TabItem>
                      </TabList>
                      {/* TODO: ENDFOR */}
                      <TabContents tabId="D0" active={true}>
                        <div className="pt-2 flex flex-row gap-x-2">
                          <div className="basis-1/2">
                            <p>
                              Data de admissão: {paciente.dataAdmissao} D0 TAB{" "}
                            </p>
                            <p>Data internação: 21/10/2023</p>
                            <p>Febre: 37.5</p>
                          </div>
                          <div className="basis-1/2">
                            <div className="flex justify-center flex-col items-end text-center">
                              <div>
                                <p className="text-center">Neutrófilos:</p>
                                <p className="text-red-500">
                                  {paciente?.situacoesPaciente !== undefined &&
                                    paciente?.situacoesPaciente[0]
                                      ?.diagnosticos[0]?.neutrofilos}
                                  /mm3
                                </p>
                                <div className="flex justify-center">
                                  <div
                                    className={selectLabelNeutrofilos(
                                      quantidadeNeutrofilos || 0,
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

                      <TabContents tabId="D1" active={false}>
                        <div className="pt-2 flex flex-row gap-x-2">
                          <div className="basis-1/2">
                            <p>
                              Data de admissão: {paciente.dataAdmissao} D1 TAB
                            </p>
                            <p>Data internação: 21/10/2023</p>
                            <p>Febre: 38.5</p>
                          </div>
                          <div className="basis-1/2">
                            <div className="flex justify-center flex-col items-end text-center">
                              <div>
                                <p className="text-center">Neutrófilos:</p>
                                <p className="text-red-500">
                                  {paciente?.situacoesPaciente !== undefined &&
                                    paciente?.situacoesPaciente[0]
                                      ?.diagnosticos[0]?.neutrofilos}
                                  /mm3
                                </p>
                                <div className="flex justify-center">
                                  <div
                                    className={selectLabelNeutrofilos(
                                      quantidadeNeutrofilos || 0,
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

                      <TabContents tabId="D3" active={false}>
                        <div className="pt-2 flex flex-row gap-x-2">
                          <div className="basis-1/2">
                            <p>
                              Data de admissão: {paciente.dataAdmissao} D3 TAB
                            </p>
                          </div>
                          <div className="basis-1/2">
                            <div className="flex justify-center flex-col items-end text-center">
                              <div>
                                <p className="text-center">Neutrófilos:</p>
                                <p className="text-red-500">
                                  {paciente?.situacoesPaciente !== undefined &&
                                    paciente?.situacoesPaciente[0]
                                      ?.diagnosticos[0]?.neutrofilos}
                                  /mm3
                                </p>
                                <div className="flex justify-center">
                                  <div
                                    className={selectLabelNeutrofilos(
                                      quantidadeNeutrofilos || 0,
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

                      <TabContents tabId="D5" active={false}>
                        <div className="pt-2 flex flex-row gap-x-2">
                          <div className="basis-1/2">
                            <p>
                              Data de admissão: {paciente.dataAdmissao} D4 TAB
                            </p>
                          </div>
                          <div className="basis-1/2">
                            <div className="flex justify-center flex-col items-end text-center">
                              <div>
                                <p className="text-center">Neutrófilos:</p>
                                <p className="text-red-500">
                                  {paciente?.situacoesPaciente !== undefined &&
                                    paciente?.situacoesPaciente[0]
                                      ?.diagnosticos[0]?.neutrofilos}
                                  /mm3
                                </p>
                                <div className="flex justify-center">
                                  <div
                                    className={selectLabelNeutrofilos(
                                      quantidadeNeutrofilos || 0,
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

                      <TabContents tabId="last" active={false}>
                        <div className="pt-2 flex flex-row gap-x-2">
                          <div className="basis-1/2">
                            <p>
                              Data de admissão: {paciente.dataAdmissao} LAST TAB
                            </p>
                          </div>
                          <div className="basis-1/2">
                            <div className="flex justify-center flex-col items-end text-center">
                              <div>
                                <p className="text-center">Neutrófilos:</p>
                                <p className="text-red-500">
                                  {paciente?.situacoesPaciente !== undefined &&
                                    paciente?.situacoesPaciente[0]
                                      ?.diagnosticos[0]?.neutrofilos}
                                  /mm3
                                </p>
                                <div className="flex justify-center">
                                  <div
                                    className={selectLabelNeutrofilos(
                                      quantidadeNeutrofilos || 0,
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
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabContents>

          <TabContents tabId="tabs-exames" active={false}>
            <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
              <ExamesList id={paciente.id?.toString() || ""} />
            </div>
          </TabContents>
        </div>
      </>
    </div>
  );
}
