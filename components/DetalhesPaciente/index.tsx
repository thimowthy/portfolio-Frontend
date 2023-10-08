import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import good from "../../public/good.png";
import neutral from "../../public/neutral.png";
import bad from "../../public/bad.png";
import veryBad from "../../public/very_bad.png";
import febreImg from "../../public/termometro.png";
import moment from "moment";
import Link from "next/link";
import TabList from "../TabList";
import TabItem from "../TabItem";
import TabContents from "../TabContents/index";
import EditUser from "../../public/pencil.svg";

import api from "@/helpers";
import ErrorToast from "../toasts/errorToast";
import SuccessToast from "../toasts/successToast";

export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  const [instabilidadeH, setInstabilidadeH] = useState(false);
  const [infeccao, setInfeccao] = useState("");
  const [prescricao, setPrescricao] = useState({
    remedios: [""],
    cuidados: [""],
    sintomas: [""]
  });

  const infeccoesSemInstabilidadeHemodinamica = [
    {
      nome: "Nenhuma",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h"
        },
        {
          segunda_opcao: "Pipe-Tazo 4,5 6/6gh"
        }
      ]
    },
    {
      nome: "ESBL",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h + Amicacina 15mg/kg/dia"
        },
        {
          segunda_opcao: "Meropenem 1g 8/8h (paciente com disfunção renal)"
        },
      ]
    },
    {
      nome: "MRSA",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Cefepime 2g 8/8h"
        }
      ]
    },
    {
      nome: "Enterobactéria produtora de carbapenemase (ex: KPC)",
      ATBs: [
        {
          primeira_opcao: "Meropenem 2g 8/8h + Amicacina 15mg/kg/dia"
        },
        {
          segunda_opcao: "Meropenem 2g 8/8h + Polimixina B 25.000UI/kg/dia (÷ 2 ou 3)"
        },
      ]
    },
    {
      nome: "Enterococcus resistente à Vancomicina (VRE)",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h (adicionar Linezolida 600mg 12/12h se infecção por VRE nos últimos 30 dias)"
        }
      ]
    }
  ];

  const infeccoesComInstabilidadeHemodinamica = [
    {
      nome: "Nenhuma",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h"
        }
      ]
    },
    {
      nome: "ESBL",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h"
        }
      ]
    },
    {
      nome: "MRSA",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h"
        }
      ]
    },
    {
      nome: "Enterobactéria produtora de carbapenemase (ex: KPC)",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 1g 12/12h + Meropenem 2g 8/8h + Amicacina 15mg/kg/dia"
        }
      ]
    },
    {
      nome: "Enterococcus resistente à Vancomicina (VRE)",
      ATBs: [
        {
          primeira_opcao: "Linezolida 600 mg 12/12h + Meropenem 1g 8/8h"
        }
      ]
    }

  ];

  const especificidadesMrsa = [
    {
      nome: "esp01",
      opcoes: ["Suspeita de infeccção relacionada ao catéter", "Infecção de pele ou partes moles", "Pneumonia", "Crescimento de Gram + na hemocultura"],
      recomendacoes: ["Adicionar Vancomicina 15mg/kg/dose EV 12/12h ao esquema inicial"],
      cuidados: []
    },
    {
      nome: "esp02",
      opcoes: ["Suspeita de sepse de foco abdominal/pelve (solicitar TC)", "Enterocolite neutropênica (tiflite)", "Celulite perianal"],
      recomendacoes: ["Acrescentar cobertura p/ anaeróbio (Metronidazol EV 500mg 8/8h)"],
      cuidados: []
    },
    {
      nome: "esp03",
      opcoes: ["Sinais/sintomas respiratórios", "RX tórax alterado"],
      recomendacoes: ["Adicionar Azitromicina 500mg EV/VO 1x/dia", "Considerar tratamento de Pneumocistose (SMT/TMP 15 a 20 mg de TMP/kg/dia ÷ 3/4) em pacientes com hipoxemia grave e uso prolongado de corticoides ou QTX com análogos da purina"],
      cuidados: ["Solicitar TC de tórxax", "Considerar influenza, em particular nos meses de inverno"]
    },
    {
      nome: "esp04",
      opcoes: ["Presença de úlceras em cavidade oral"],
      recomendacoes: ["Aciclovir EV 5mg/kg 3x/dia + Fluconazol EV 200mg/dia"],
      cuidados: []
    },
    {
      nome: "esp05",
      opcoes: ["Presença de diarreia"],
      recomendacoes: ["Solicitar coprocultura, pesquisa de toxina A e B e leucócitos fecais. Se sintomas de colite: Metronidazol 500mg VO, 8/8h"],
      cuidados: []
    },
    {
      nome: "esp06",
      opcoes: ["Infecção relacionada ao catéter"],
      recomendacoes: [],
      cuidados: ["Remover o catéter se houver suspeita de infecção relacionada ao mesmo e choque séptico refratário aos antibióticos", "Coletar culturas e amostra de secreção do sítio de saída se houver secreção purulenta"]
    }
  ];

  const handleInfeccao = (infec: string) => {
    setInfeccao(infec);
    if (instabilidadeH) {
      const remedio = infeccoesComInstabilidadeHemodinamica.find((el) => el.nome === infec)?.ATBs[0].primeira_opcao;

      if (remedio) {
        setPrescricao({
          cuidados: [],
          remedios: [remedio],
          sintomas: []
        });
      }

    } else {
      const remedio = infeccoesSemInstabilidadeHemodinamica.find((el) => el.nome === infec)?.ATBs[0].primeira_opcao;
      if (remedio) {

        setPrescricao({
          cuidados: [],
          remedios: [remedio],
          sintomas: []
        });
      }

    }
  };

  type Presc = {
    cuidados: Array<string>
    sintomas: Array<string>
    remedios: Array<string>
  }

  const handleEspecificidadeRadio = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) => el.nome === especificidade);
    if (esp) {
      setPrescricao((prevState: Presc) => {
        return {
          sintomas: [...prevState.sintomas, esp?.opcoes[0]],
          cuidados: [...prevState.cuidados, ...esp.cuidados],
          remedios: [...prevState.remedios, ...esp.recomendacoes]
        };
      });
    }
  };

  const removeEspecificidadeRadio = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) => el.nome === especificidade);
    setPrescricao((prevState: Presc) => {
      const novosSintomas = prevState.sintomas.filter(item => item !== esp?.opcoes[0]);
      const novosCuidados = prevState.cuidados.filter(item => !esp?.cuidados.includes(item));
      const novosRemedios = prevState.remedios.filter(item => !esp?.recomendacoes.includes(item));
      return {
        sintomas: novosSintomas,
        cuidados: novosCuidados,
        remedios: novosRemedios
      };
    });
  };

  const handleEspecificidadeCheck = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) => el.opcoes.includes(especificidade));
    setPrescricao((prevState: Presc) => {
      if (!prevState.sintomas.includes(especificidade)) {
        var novosSintomas = [...prevState.sintomas, especificidade];
      } else {
        var novosSintomas = prevState.sintomas.filter(item => item !== especificidade);
      }
      const novosCuidados = prevState.cuidados.filter(item => !esp?.cuidados.includes(item));
      const novosRemedios = prevState.remedios.filter(item => !esp?.recomendacoes.includes(item));
      return {
        sintomas: novosSintomas,
        cuidados: novosCuidados,
        remedios: novosRemedios
      };
    });
    console.log(prescricao);
  };

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
      setInfeccao("Nenhuma");
      handleInfeccao("Nenhuma");
      initTE({ Ripple, Tooltip });
    };
    init();
  }, []);

  return (
    <div>
      <>
        <TabList className="flex list-none flex-row flex-wrap border-b-0 pl-0">
          <TabItem href="tab-paciente" className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]" title="Paciente" active={true} />
          <TabItem href="tab-prescricao" className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]" title="Prescrição" />
        </TabList>
        <div className="bg-[#DADADA] lista-pacientes_tab-content overflow-auto px-2 ">
          <TabContents tabId="tab-paciente" active={true}>

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
                      <p className="text-xl font-semibold leading-6 text-gray-900 align-middle">
                        {paciente.nome}
                      </p>
                      {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Prontuário: {paciente.prontuario}
                </p> */}
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
                        paciente?.situacoesPaciente[0].diagnosticos[0].febre && (
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
                          ? moment(paciente?.dataNascimento).format("DD/MM/YYYY")
                          : ""}
                      </p>
                      <p>Cartão SUS: {paciente.cartaoSus}</p>
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
                  </div>

                  <hr />
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
                          <p>Data de admissão: {paciente.dataAdmissao} D0 TAB </p>
                        </div>
                        <div className="basis-1/2">
                          <div className="flex justify-center flex-col items-end text-center">
                            <div>
                              <p className="text-center">Neutrófilos:</p>
                              <p className="text-red-500">
                                {paciente?.situacoesPaciente !== undefined &&
                                  paciente?.situacoesPaciente[0]?.diagnosticos[0]
                                    ?.neutrofilos}
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
                          <p>Data de admissão: {paciente.dataAdmissao} D1 TAB</p>
                        </div>
                        <div className="basis-1/2">
                          <div className="flex justify-center flex-col items-end text-center">
                            <div>
                              <p className="text-center">Neutrófilos:</p>
                              <p className="text-red-500">
                                {paciente?.situacoesPaciente !== undefined &&
                                  paciente?.situacoesPaciente[0]?.diagnosticos[0]
                                    ?.neutrofilos}
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
                          <p>Data de admissão: {paciente.dataAdmissao} D3 TAB</p>
                        </div>
                        <div className="basis-1/2">
                          <div className="flex justify-center flex-col items-end text-center">
                            <div>
                              <p className="text-center">Neutrófilos:</p>
                              <p className="text-red-500">
                                {paciente?.situacoesPaciente !== undefined &&
                                  paciente?.situacoesPaciente[0]?.diagnosticos[0]
                                    ?.neutrofilos}
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
                          <p>Data de admissão: {paciente.dataAdmissao} D4 TAB</p>
                        </div>
                        <div className="basis-1/2">
                          <div className="flex justify-center flex-col items-end text-center">
                            <div>
                              <p className="text-center">Neutrófilos:</p>
                              <p className="text-red-500">
                                {paciente?.situacoesPaciente !== undefined &&
                                  paciente?.situacoesPaciente[0]?.diagnosticos[0]
                                    ?.neutrofilos}
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
                          <p>Data de admissão: {paciente.dataAdmissao} LAST TAB</p>
                        </div>
                        <div className="basis-1/2">
                          <div className="flex justify-center flex-col items-end text-center">
                            <div>
                              <p className="text-center">Neutrófilos:</p>
                              <p className="text-red-500">
                                {paciente?.situacoesPaciente !== undefined &&
                                  paciente?.situacoesPaciente[0]?.diagnosticos[0]
                                    ?.neutrofilos}
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

                    <div>
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
                              cartaoSus: paciente.cartaoSus,
                            },
                          }}
                          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 px-10"
                        >
                          Sim
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabContents>
          <TabContents tabId="tab-prescricao" active={false}>
            {paciente.id && <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
              <h1 className="text-2xl">Sintomas</h1>
              <div className="flex items-center gap-4 justify-center">

                <div className="flex flex-col mt-2 gap-6 py-6 bg-slate-500 px-6 w-[50%] rounded-lg items-center justify-center">
                  <p>Instabilidade Hemodinâmica:</p>
                  <div className="flex gap-3">
                    <input type="radio" name="resposta_form_01_sintomas" id="ih_sim" onChange={() => setInstabilidadeH(true)} checked={instabilidadeH} />
                    <label htmlFor="ih_sim">Sim</label>
                    <input type="radio" name="resposta_form_01_sintomas" id="ih_nao" onChange={() => setInstabilidadeH(false)} checked={!instabilidadeH} />
                    <label htmlFor="ih_nao">Não</label>
                  </div>
                </div>
                {instabilidadeH &&
                  <div className="flex flex-col mt-2 gap-6 py-6 bg-slate-500 px-6 w-[50%] rounded-lg items-center justify-center">
                    <p>Infeccção prévia:</p>
                    <div className="flex gap-3 box-border">
                      <select id="select_infeccao" style={{ width: "100%", maxWidth: "100%" }} onChange={(e) => handleInfeccao(e.target.value)}>
                        {infeccoesComInstabilidadeHemodinamica.map((el) => <option key={el.nome} defaultChecked={el.nome === "Nenhuma"} value={el.nome}>{el.nome}</option>)}
                      </select>
                    </div>
                  </div>
                }
                {!instabilidadeH &&
                  <div className="flex flex-col mt-2 gap-6 py-6 bg-slate-500 px-6 w-[50%] rounded-lg items-center justify-center">
                    <p>Infeccção prévia:</p>
                    <div className="flex gap-3 box-border">
                      <select id="select_infeccao" style={{ width: "100%", maxWidth: "100%" }} onChange={(e) => handleInfeccao(e.target.value)}>
                        {infeccoesSemInstabilidadeHemodinamica.map((el) => <option key={el.nome} defaultChecked={el.nome === "Nenhuma"} value={el.nome}>{el.nome}</option>)}
                      </select>
                    </div>
                  </div>
                }
              </div>
              {infeccao === "MRSA" &&
                <>
                  <div className="grid grid-cols-2 justify-items-center pb-6">

                    {especificidadesMrsa.map((el) =>
                      <div className="flex flex-col mt-3 gap-6 py-6 bg-slate-500 px-6 w-[300px] rounded-lg items-center justify-center" key={el.nome}>
                        {el.nome !== "esp04" && el.nome !== "esp05" && el.nome !== "esp06" &&
                          <div>

                            {
                              el.opcoes.map((children) =>
                                <>
                                  <div className="flex flex-col" key={children}>
                                    <div className="flex gap-6 items-center justify-start">
                                      <input type="checkbox" id={children} onChange={() => handleEspecificidadeCheck(children)} />
                                      <label htmlFor={children}>{children}</label>
                                    </div>
                                  </div>
                                </>)
                            }
                          </div>
                        }
                        {(el.nome === "esp04" || el.nome === "esp05" || el.nome === "esp06") && (
                          <div className="flex flex-col">
                            <p>{el.opcoes[0]}</p>
                            <div className="flex items-center justify-center gap-4">
                              <input type="radio" id={el.opcoes[0] + "sim"} name={el.opcoes[0]} onChange={() => handleEspecificidadeRadio(el.nome)} />
                              <label htmlFor={el.opcoes[0] + "sim"}>Sim</label>
                              <input type="radio" id={el.opcoes[0] + "nao"} name={el.opcoes[0]} onChange={() => removeEspecificidadeRadio(el.nome)} />
                              <label htmlFor={el.opcoes[0] + "nao"}>Não</label>
                            </div>
                          </div>
                        )}

                      </div>)}
                  </div>
                </>
              }
              <div className="pt-4 flex gap-4 pb-8">
                <div className="flex flex-col w-[50%] min-h-[200px] h-[300px] bg-purple-300 p-4 rounded-lg">
                  <h2 className="text-2xl">Medicamentos</h2>
                  <ul style={{ "listStyle": "square" }}>
                    {prescricao.remedios.map((el) =>
                    (<li key={el} className="p-2 flex items-center">
                      <p>{el}</p>
                      <Image src={EditUser} alt="Editar medicamento" />
                    </li>
                    )
                    )
                    }
                  </ul>
                </div>
                <div className="flex flex-col w-[50%] min-h-[200px] h-[300px] bg-purple-300 p-4 rounded-lg">
                  <h2 className="text-2xl">Cuidados</h2>
                  <ul>
                    {prescricao.cuidados.map((el) =>
                      (<li key={el}>{el}</li>)
                    )
                    }
                  </ul>
                </div>
              </div>
            </div>}
          </TabContents>
        </div>
      </>
    </div >
  );
}
