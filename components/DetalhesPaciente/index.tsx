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
import Edit from "../../public/pencil.svg";

import ModalCriacaoCuidado from "../ModalCriacaoCuidado";
import ModalCriacaoMedicamento from "../ModalCriacaoMedicamento";
import Delete from "../../public/trash2.svg";
import Plus from "../../public/plus.svg";
import api from "@/helpers";
import ErrorToast from "../toasts/errorToast";
import SuccessToast from "../toasts/successToast";
import ExamesList from "../ExameList";
import Link from "next/link";
import useServerityIcon from "@/hooks/useSeverityIcon";
/**
 * Renderiza o a página de detalhes do paciente.
 * @category Component
 */
export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  const [instabilidadeH, setInstabilidadeH] = useState(false);
  const [modalMedicamento, setModalMedicamento] = useState(false);
  const [modalCuidado, setModalCuidado] = useState(false);
  const [infeccao, setInfeccao] = useState("");
  const [prescricao, setPrescricao] = useState({
    remedios: [""],
    cuidados: [""],
    sintomas: [""],
  });

  const infeccoesSemInstabilidadeHemodinamica = [
    {
      nome: "Nenhuma",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h",
        },
        {
          segunda_opcao: "Pipe-Tazo 4,5g 6/6h",
        },
      ],
    },
    {
      nome: "ESBL",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h + Amicacina 15mg/kg/dia",
        },
        {
          segunda_opcao: "Meropenem 1g 8/8h (paciente com disfunção renal)",
        },
      ],
    },
    {
      nome: "MRSA",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Cefepime 2g 8/8h",
        },
      ],
    },
    {
      nome: "Enterobactéria produtora de carbapenemase (ex: KPC)",
      ATBs: [
        {
          primeira_opcao: "Meropenem 2g 8/8h + Amicacina 15mg/kg/dia",
        },
        {
          segunda_opcao:
            "Meropenem 2g 8/8h + Polimixina B 25.000UI/kg/dia (÷ 2 ou 3)",
        },
      ],
    },
    {
      nome: "Enterococcus resistente à Vancomicina (VRE)",
      ATBs: [
        {
          primeira_opcao:
            "Cefepime 2g 8/8h (adicionar Linezolida 600mg 12/12h se infecção por VRE nos últimos 30 dias)",
        },
      ],
    },
  ];

  const infeccoesComInstabilidadeHemodinamica = [
    {
      nome: "Nenhuma",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        },
      ],
    },
    {
      nome: "ESBL",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        },
      ],
    },
    {
      nome: "MRSA",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        },
      ],
    },
    {
      nome: "Enterobactéria produtora de carbapenemase (ex: KPC)",
      ATBs: [
        {
          primeira_opcao:
            "Vancomicina 1g 12/12h + Meropenem 2g 8/8h + Amicacina 15mg/kg/dia",
        },
      ],
    },
    {
      nome: "Enterococcus resistente à Vancomicina (VRE)",
      ATBs: [
        {
          primeira_opcao: "Linezolida 600 mg 12/12h + Meropenem 1g 8/8h",
        },
      ],
    },
  ];

  const especificidadesMrsa = [
    {
      nome: "esp01",
      opcoes: [
        "Suspeita de infeccção relacionada ao catéter",
        "Infecção de pele ou partes moles",
        "Pneumonia",
        "Crescimento de Gram + na hemocultura",
      ],
      recomendacoes: [
        "Adicionar Vancomicina 15mg/kg/dose EV 12/12h ao esquema inicial",
      ],
      cuidados: [],
    },
    {
      nome: "esp02",
      opcoes: [
        "Suspeita de sepse de foco abdominal/pelve (solicitar TC)",
        "Enterocolite neutropênica (tiflite)",
        "Celulite perianal",
      ],
      recomendacoes: [
        "Acrescentar cobertura p/ anaeróbio (Metronidazol EV 500mg 8/8h)",
      ],
      cuidados: [],
    },
    {
      nome: "esp03",
      opcoes: ["Sinais/sintomas respiratórios", "RX tórax alterado"],
      recomendacoes: [
        "Adicionar Azitromicina 500mg EV/VO 1x/dia",
        "Considerar tratamento de Pneumocistose (SMT/TMP 15 a 20 mg de TMP/kg/dia ÷ 3/4) em pacientes com hipoxemia grave e uso prolongado de corticoides ou QTX com análogos da purina",
      ],
      cuidados: [
        "Solicitar TC de tórxax",
        "Considerar influenza, em particular nos meses de inverno",
      ],
    },
    {
      nome: "esp04",
      opcoes: ["Presença de úlceras em cavidade oral"],
      recomendacoes: ["Aciclovir EV 5mg/kg 3x/dia + Fluconazol EV 200mg/dia"],
      cuidados: [],
    },
    {
      nome: "esp05",
      opcoes: ["Presença de diarreia"],
      recomendacoes: [
        "Solicitar coprocultura, pesquisa de toxina A e B e leucócitos fecais. Se sintomas de colite: Metronidazol 500mg VO, 8/8h",
      ],
      cuidados: [],
    },
    {
      nome: "esp06",
      opcoes: ["Infecção relacionada ao catéter"],
      recomendacoes: [],
      cuidados: [
        "Remover o catéter se houver suspeita de infecção relacionada ao mesmo e choque séptico refratário aos antibióticos",
        "Coletar culturas e amostra de secreção do sítio de saída se houver secreção purulenta",
      ],
    },
  ];

  const handleInfeccao = (infec: string) => {
    setInfeccao(infec);
    if (instabilidadeH) {
      const remedio = infeccoesComInstabilidadeHemodinamica.find(
        (el) => el.nome === infec,
      )?.ATBs[0].primeira_opcao;

      if (remedio) {
        setPrescricao({
          cuidados: [],
          remedios: [remedio],
          sintomas: [],
        });
      }
    } else {
      const remedio = infeccoesSemInstabilidadeHemodinamica.find(
        (el) => el.nome === infec,
      )?.ATBs[0].primeira_opcao;
      if (remedio) {
        setPrescricao({
          cuidados: [],
          remedios: [remedio],
          sintomas: [],
        });
      }
    }
  };

  type Presc = {
    cuidados: Array<string>;
    sintomas: Array<string>;
    remedios: Array<string>;
  };

  const handleEspecificidadeRadio = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) => el.nome === especificidade);
    if (esp) {
      setPrescricao((prevState: Presc) => {
        return {
          sintomas: [...prevState.sintomas, esp?.opcoes[0]],
          cuidados: [...prevState.cuidados, ...esp.cuidados],
          remedios: [...prevState.remedios, ...esp.recomendacoes],
        };
      });
    }
  };

  const removeEspecificidadeRadio = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) => el.nome === especificidade);
    setPrescricao((prevState: Presc) => {
      const novosSintomas = prevState.sintomas.filter(
        (item) => item !== esp?.opcoes[0],
      );
      const novosCuidados = prevState.cuidados.filter(
        (item) => !esp?.cuidados.includes(item),
      );
      const novosRemedios = prevState.remedios.filter(
        (item) => !esp?.recomendacoes.includes(item),
      );
      return {
        sintomas: novosSintomas,
        cuidados: novosCuidados,
        remedios: novosRemedios,
      };
    });
  };

  const handleEspecificidadeCheck = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) =>
      el.opcoes.includes(especificidade),
    );
    setPrescricao((prevState: Presc) => {
      if (!prevState.sintomas.includes(especificidade)) {
        var novosSintomas = [...prevState.sintomas, especificidade];
      } else {
        var novosSintomas = prevState.sintomas.filter(
          (item) => item !== especificidade,
        );
      }
      const novosCuidados = prevState.cuidados.filter(
        (item) => !esp?.cuidados.includes(item),
      );
      const novosRemedios = prevState.remedios.filter(
        (item) => !esp?.recomendacoes.includes(item),
      );
      return {
        sintomas: novosSintomas,
        cuidados: novosCuidados,
        remedios: novosRemedios,
      };
    });
    console.log(prescricao);
  };

  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  let situacoesPacienteCopy = [...situacoesPaciente];
  const situacaoAtual = situacoesPacienteCopy?.pop();

  const selectLabelNeutrofilos = (quantidadeNeutrofilos: number) => {
    if (quantidadeNeutrofilos > 1000) {
      return styles.low;
    } else if (quantidadeNeutrofilos > 500) {
      return styles.medium;
    } else {
      return styles.grave;
    }
  };

  const colors: any = [
    [0, "bg-orange-900"],
    [1, "bg-yellow-800"],
    [2, "bg-yellow-700"],
    [3, "bg-amber-600"],
    [4, "bg-amber-500"],
  ];

  const colorMap = new Map(colors);

  const ImageURL = (paciente: Paciente) => {
    return useServerityIcon(paciente);
  };

  const openModalCreateMedicamento = () => {
    setModalMedicamento(true);
  };

  const openModalCreateCuidado = () => {
    setModalCuidado(true);
  };

  const handleDeleteCuidado = (element: any) => {
    const index = prescricao.cuidados?.findIndex((item) => item == element);
    const newCuidados = prescricao.cuidados?.splice(index, 1);
    setPrescricao((prevState: Presc) => {
      return {
        sintomas: [...prevState.sintomas],
        cuidados: newCuidados,
        remedios: [...prevState.remedios],
      };
    });
    prescricao.cuidados?.splice(index, 1);
  };
  const handleDeleteMedicamento = () => {};
  useEffect(() => {
    const init = async () => {
      const { Ripple, Tooltip, initTE } = await import("tw-elements");
      setInfeccao("Nenhuma");
      handleInfeccao("Nenhuma");
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
  const situacaoPaciente = paciente?.internacao?.situacoesPaciente || [];
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
          <TabItem
            href="tab-prescricao"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]"
            title="Prescrição"
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
                      {situacaoAtual &&
                        situacaoAtual?.situacaoDiagnostico?.febre && (
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

                      <p>Leito: {paciente?.internacao?.leito}</p>

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
                          title=">38,3°C medida única OU >38°C por mais de 1h"
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
                              liClassName={`basis-1/5 ${colorMap.get(
                                index,
                              )} py-2 pl-2 ${
                                index === 0
                                  ? "rounded-bl-full rounded-tl-full"
                                  : ""
                              } ${
                                index === 4
                                  ? "rounded-br-full rounded-tr-full"
                                  : ""
                              }`}
                              active={true}
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
                            active={index === 0}
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
                                  Data internação:{" "}
                                  {moment(
                                    paciente?.internacao?.dataAdmissao,
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
                                          item?.situacaoDiagnostico
                                            ?.neutrofilos || 0,
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
          </TabContents>
          <TabContents tabId="tab-prescricao" active={false}>
            {paciente.id && (
              <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
                <h1 className="text-2xl">Sintomas</h1>
                <div className="flex items-center gap-4 justify-center">
                  <div className="flex flex-col mt-2 gap-6 py-6 bg-[#E1ECEA] px-6 w-[50%] rounded-lg items-center justify-center">
                    <p>Instabilidade Hemodinâmica:</p>
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        name="resposta_form_01_sintomas"
                        id="ih_sim"
                        onChange={() => setInstabilidadeH(true)}
                        checked={instabilidadeH}
                      />
                      <label htmlFor="ih_sim">Sim</label>
                      <input
                        type="radio"
                        name="resposta_form_01_sintomas"
                        id="ih_nao"
                        onChange={() => setInstabilidadeH(false)}
                        checked={!instabilidadeH}
                      />
                      <label htmlFor="ih_nao">Não</label>
                    </div>
                  </div>
                  {instabilidadeH && (
                    <div className="flex flex-col mt-2 gap-6 p-6 bg-[#E1ECEA] px-6 w-[50%] rounded-lg items-center justify-center">
                      <p>Infeccção prévia:</p>
                      <div className="flex gap-3 box-border">
                        <select
                          id="select_infeccao"
                          style={{ width: "100%", maxWidth: "100%" }}
                          onChange={(e) => handleInfeccao(e.target.value)}
                        >
                          {infeccoesComInstabilidadeHemodinamica.map((el) => (
                            <option
                              key={el.nome}
                              defaultChecked={el.nome === "Nenhuma"}
                              value={el.nome}
                            >
                              {el.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {!instabilidadeH && (
                    <div className="flex flex-col mt-2 gap-6 p-6 bg-[#E1ECEA] px-6 w-[50%] rounded-lg items-center justify-center">
                      <p>Infeccção prévia:</p>
                      <div className="flex gap-3 box-border">
                        <select
                          id="select_infeccao"
                          style={{ width: "100%", maxWidth: "100%" }}
                          onChange={(e) => handleInfeccao(e.target.value)}
                        >
                          {infeccoesSemInstabilidadeHemodinamica.map((el) => (
                            <option
                              key={el.nome}
                              defaultChecked={el.nome === "Nenhuma"}
                              value={el.nome}
                            >
                              {el.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                {infeccao === "MRSA" && (
                  <>
                    <div className="grid grid-cols-2 justify-items-center pb-6">
                      {especificidadesMrsa.map((el) => (
                        <div
                          className="flex flex-col mt-3 gap-6 py-6 bg-[#E1ECEA] px-6 w-[300px] rounded-lg items-center justify-center"
                          key={el.nome}
                        >
                          {el.nome !== "esp04" &&
                            el.nome !== "esp05" &&
                            el.nome !== "esp06" && (
                              <div>
                                {el.opcoes.map((children) => (
                                  <>
                                    <div
                                      className="flex flex-col"
                                      key={children}
                                    >
                                      <div className="flex gap-6 items-center justify-start">
                                        <input
                                          type="checkbox"
                                          id={children}
                                          onChange={() =>
                                            handleEspecificidadeCheck(children)
                                          }
                                        />
                                        <label htmlFor={children}>
                                          {children}
                                        </label>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </div>
                            )}
                          {(el.nome === "esp04" ||
                            el.nome === "esp05" ||
                            el.nome === "esp06") && (
                            <div className="flex flex-col">
                              <p>{el.opcoes[0]}</p>
                              <div className="flex items-center justify-center gap-4">
                                <input
                                  type="radio"
                                  id={el.opcoes[0] + "sim"}
                                  name={el.opcoes[0]}
                                  onChange={() =>
                                    handleEspecificidadeRadio(el.nome)
                                  }
                                />
                                <label htmlFor={el.opcoes[0] + "sim"}>
                                  Sim
                                </label>
                                <input
                                  type="radio"
                                  id={el.opcoes[0] + "nao"}
                                  name={el.opcoes[0]}
                                  onChange={() =>
                                    removeEspecificidadeRadio(el.nome)
                                  }
                                />
                                <label htmlFor={el.opcoes[0] + "nao"}>
                                  Não
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <h1 className="text-3xl mt-3">Prescrição</h1>
                <div className="pt-4 flex gap-4 pb-8">
                  <div className="flex flex-col w-[50%] min-h-[200px] bg-[#a9aee3] p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl">Medicamentos</h2>
                      <a
                        className="cursor-pointer"
                        onClick={openModalCreateMedicamento}
                      >
                        <Image
                          src={Plus}
                          alt="Adicionar medicamento"
                          className="cursor-pointer"
                        />
                      </a>
                    </div>
                    <ul style={{ listStyle: "square" }}>
                      {prescricao.remedios.map((el) => (
                        <li key={el} className="p-2 flex items-center">
                          <div className="p-2 flex items-center justify-between">
                            <p className="min-w-[85%]">{el}</p>
                            {/* <a onClick={openModalEditMedicamento} className="ml-4 cursor-pointer w-[10%]">
                          <Image src={Edit} alt="Editar medicamento" className="ml-4 cursor-pointer" />
                        </a> */}
                            <a className="cursor-pointer ml-4 w-[60px] h-[60px]">
                              <Image
                                src={Delete}
                                alt="Deletar medicamento"
                                className="cursor-pointer w-[60px] h-[60px]"
                              />
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col w-[50%] min-h-[200px] bg-[#a9aee3] p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl">Cuidados</h2>
                      <a onClick={openModalCreateCuidado}>
                        <Image
                          src={Plus}
                          alt="Adicionar cuidado"
                          className="cursor-pointer "
                        />
                      </a>
                    </div>
                    <ul>
                      {prescricao.cuidados.map((el) => (
                        <li
                          key={el}
                          className="p-2 flex items-center justify-between"
                        >
                          <div className="p-2 flex items-center">
                            <p className="min-w-[85%]">{el}</p>
                            {/* <a className="ml-4 cursor-pointer w-[10%]" onClick={openModalEditCuidado}>
                          <Image src={Edit} alt="Editar cuidado" />
                        </a> */}
                            <a
                              className="cursor-pointer ml-2 w-[60px] h-[60px]"
                              onClick={() => handleDeleteCuidado(el)}
                            >
                              <Image
                                src={Delete}
                                alt="Deletar cuidado"
                                className="w-[60px] h-[60px]"
                              />
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {modalCuidado && (
                  <ModalCriacaoCuidado
                    setModalCuidado={setModalCuidado}
                    cuidados={prescricao.cuidados}
                  />
                )}
                {modalMedicamento && instabilidadeH && (
                  <ModalCriacaoMedicamento
                    lista={infeccoesComInstabilidadeHemodinamica}
                    setModalMedicamento={setModalMedicamento}
                    medicamentos={prescricao.remedios}
                  />
                )}
                {modalMedicamento && !instabilidadeH && (
                  <ModalCriacaoMedicamento
                    lista={infeccoesSemInstabilidadeHemodinamica}
                    setModalMedicamento={setModalMedicamento}
                    medicamentos={prescricao.remedios}
                  />
                )}
                <div className="flex items-center w-full justify-end">
                  <button className="bg-blue-700 hover:bg-blue-900 px-5 mt-4 py-3 text-sm w-[200px] h-[50px] leading-5 rounded-lg font-semibold text-white">
                    Prescrever
                  </button>
                </div>
              </div>
            )}
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
