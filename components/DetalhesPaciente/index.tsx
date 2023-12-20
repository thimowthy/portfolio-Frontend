import { useEffect, useState } from "react";
import Image from "next/image";
import TabList from "../TabList";
import TabItem from "../TabItem";
import TabContents from "../TabContents/index";
import Edit from "../../public/pencil.svg";

import ModalCriacaoCuidado from "../ModalCriacaoCuidado";
import ModalCriacaoMedicamento from "../ModalCriacaoMedicamento";
import Delete from "../../public/trash2.svg";
import Plus from "../../public/plus.svg";
import ExamesList from "../ExameList";
import Link from "next/link";
import useServerityIcon from "@/hooks/useSeverityIcon";
import SintomasForm from "../Sintomas";
import { Medicamento } from "@/types/Medicamento";
import { ItemMedicamento } from "@/types/ItemMedicamento";
import { ItemCuidado } from "@/types/ItemCuidado";
import { UnidadeDosagem } from "@/types/Enum/UnidadeDosagem";
import { IntervaloTempo } from "@/types/Enum/IntervaloTempo";
import { Prescricao } from "@/types/Prescricao";
import PacienteTab from "../PacienteTab";
import fetcher from "@/api/fetcher";
/**
 * Renderiza o a página de detalhes do paciente.
 * @category Component
 */
export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  const [instabilidadeH, setInstabilidadeH] = useState(false);
  const [modalMedicamento, setModalMedicamento] = useState(false);
  const [modalCuidado, setModalCuidado] = useState(false);
  const [infeccao, setInfeccao] = useState("");

  const [medicacoes, setMedicacoes] = useState<ItemMedicamento[]>([]);
  const [cuidados, setCuidados] = useState<ItemCuidado[]>([]);
  const [medicamento, setMedicamento] = useState<Medicamento>();
  const [doseInput, setDoseInput] = useState("1");
  const [dose, setDose] = useState(1);
  const [dosagem, setDosagem] = useState<UnidadeDosagem>(
    UnidadeDosagem.COMPRIMIDO,
  );
  const [tempo, setTempo] = useState(1);
  const [intervalo, setIntervalo] = useState<IntervaloTempo>(
    IntervaloTempo.DIAS,
  );
  const [medicacao, setMedicacao] = useState<ItemMedicamento>();
  const [cuidado, setCuidado] = useState<ItemCuidado>();

  const [prescricao, setPrescricao] = useState<Prescricao>();

  const [temperatura, setTemperatura] = useState<number>(36.5);

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

  // const handleInfeccao = (infec: string) => {
  //   setInfeccao(infec);
  //   if (instabilidadeH) {
  //     const remedio = infeccoesComInstabilidadeHemodinamica.find(
  //       (el) => el.nome === infec,
  //     )?.ATBs[0].primeira_opcao;

  //     if (remedio) {
  //       setPrescricao({
  //         cuidados: [],
  //         remedios: [remedio],
  //         sintomas: [],
  //       });
  //     }
  //   } else {
  //     const remedio = infeccoesSemInstabilidadeHemodinamica.find(
  //       (el) => el.nome === infec,
  //     )?.ATBs[0].primeira_opcao;
  //     if (remedio) {
  //       setPrescricao({
  //         cuidados: [],
  //         remedios: [remedio],
  //         sintomas: [],
  //       });
  //     }
  //   }
  // };

  const handleAddCuidado = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (cuidado && cuidado?.descricao.trim() !== "") {
        setCuidados((prevCuidados) => [cuidado, ...prevCuidados]);
        setCuidado({ descricao: "" });
      }
    }
  };
  const handleAddMedicacao = () => {
    if (medicacao && medicacao.medicamento && medicacao.dose) {
      setMedicacoes((prevMedicacoes) => [medicacao, ...prevMedicacoes]);
    }
  };
  const handleRemoveCuidado = (index: number) => {
    setCuidados((prevCuidados) => {
      const newCuidados = [...prevCuidados];
      newCuidados.splice(index, 1);
      return newCuidados;
    });
  };
  const handleRemoveMedicacao = (index: number) => {
    setMedicacoes((prevMedicacoes) => {
      const newMedicacoes = [...prevMedicacoes];
      newMedicacoes.splice(index, 1);
      return newMedicacoes;
    });
  };

  useEffect(() => {
    setMedicacao({
      medicamento: medicamento,
      dose: dose,
      unidade_dosagem: dosagem,
      intervalo: tempo,
      intervalo_tempo: intervalo,
    });
  }, [medicamento, dose, dosagem, tempo, intervalo]);

  useEffect(() => {
    setPrescricao({
      medicacoes: medicacoes,
      cuidados: cuidados,
    });
  }, [medicacoes, cuidados]);

  const enviarTemperatura = async () => {
    try {
      const response = await fetcher({
        metodo: "POST",
        rota: `https://localhost:7091/Internacao/CadastrarTemperatura/${paciente.id}`,
        cabecalho: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { temperatura: temperatura }
        ),
      });
      if (response.ok) {
        //console.log("foi");
      } else {
        //console.log(" nfoi");
      }
    } catch (error) {
      //console.log("n foi");
    }
  };

  const gerarPrescricao = () => {
    // FAZER REQUISIÇÃO ENVIANDO A PRESCRIÇÃO PARA O INTERNAMENTO
  };

  const listaMedicamentos: Medicamento[] = [
    { id: 0, nome: "Cefepime" },
    { id: 1, nome: "Pipe-Zato" },
    { id: 2, nome: "Amicacina" },
    { id: 3, nome: "Meropenem" },
    { id: 4, nome: "Vancomicina" },
    { id: 5, nome: "Poliximina B" },
    { id: 6, nome: "Linezolida" },
    { id: 7, nome: "Azitromicina" },
    { id: 8, nome: "Metronidazol" },
    { id: 9, nome: "Aciclovir" },
    { id: 10, nome: "Fluconazol" },
  ];

  // const handleEspecificidadeRadio = (especificidade: string) => {
  //   const esp = especificidadesMrsa.find((el) => el.nome === especificidade);
  //   if (esp) {
  //     setPrescricao((prevState: Presc) => {
  //       return {
  //         sintomas: [...prevState.sintomas, esp?.opcoes[0]],
  //         cuidados: [...prevState.cuidados, ...esp.cuidados],
  //         remedios: [...prevState.remedios, ...esp.recomendacoes],
  //       };
  //     });
  //   }
  // };

  // const removeEspecificidadeRadio = (especificidade: string) => {
  //   const esp = especificidadesMrsa.find((el) => el.nome === especificidade);
  //   setPrescricao((prevState: Presc) => {
  //     const novosSintomas = prevState.sintomas.filter(
  //       (item) => item !== esp?.opcoes[0],
  //     );
  //     const novosCuidados = prevState.cuidados.filter(
  //       (item) => !esp?.cuidados.includes(item),
  //     );
  //     const novosRemedios = prevState.remedios.filter(
  //       (item) => !esp?.recomendacoes.includes(item),
  //     );
  //     return {
  //       sintomas: novosSintomas,
  //       cuidados: novosCuidados,
  //       remedios: novosRemedios,
  //     };
  //   });
  // };

  // const handleEspecificidadeCheck = (especificidade: string) => {
  //   const esp = especificidadesMrsa.find((el) =>
  //     el.opcoes.includes(especificidade),
  //   );
  //   setPrescricao((prevState: Presc) => {
  //     if (!prevState.sintomas.includes(especificidade)) {
  //       var novosSintomas = [...prevState.sintomas, especificidade];
  //     } else {
  //       var novosSintomas = prevState.sintomas.filter(
  //         (item) => item !== especificidade,
  //       );
  //     }
  //     const novosCuidados = prevState.cuidados.filter(
  //       (item) => !esp?.cuidados.includes(item),
  //     );
  //     const novosRemedios = prevState.remedios.filter(
  //       (item) => !esp?.recomendacoes.includes(item),
  //     );
  //     return {
  //       sintomas: novosSintomas,
  //       cuidados: novosCuidados,
  //       remedios: novosRemedios,
  //     };
  //   });
  //   console.log(prescricao);
  // };

  const openModalCreateMedicamento = () => {
    setModalMedicamento(true);
  };

  const openModalCreateCuidado = () => {
    setModalCuidado(true);
  };

  const handleDeleteCuidado = (element: any) => {
    /* const index = prescricao.cuidados?.findIndex((item) => item == element);
    const newCuidados = prescricao.cuidados?.splice(index, 1);
    setPrescricao((prevState: Presc) => {
      return {
        sintomas: [...prevState.sintomas],
        cuidados: newCuidados,
        remedios: [...prevState.remedios],
      };
    });
    prescricao.cuidados?.splice(index, 1); */
  };

  const handleDeleteMedicamento = () => {};

  useEffect(() => {
    const init = async () => {
      const { Ripple, Tooltip, initTE } = await import("tw-elements");
      setInfeccao("Nenhuma");
      //handleInfeccao("Nenhuma");
      initTE({ Ripple, Tooltip });
    };
    init();
  }, []);

  return (
    <div>
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
            href="tab-sintomas"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]"
            title="Sintomas"
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
            <PacienteTab paciente={paciente} />
          </TabContents>
          <TabContents tabId="tab-prescricao" active={false}>
            {paciente.id && (
              <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
                <div className="flex items-center w-full">
                  <h1 className="text-3xl mt-3">Prescrição</h1>
                  <button
                    className="flex items-center justify-center ml-auto bg-blue-700 hover:bg-blue-900 text-sm w-32 h-[40px] rounded font-semibold text-white justify-content"
                    onClick={() => {
                      console.log(prescricao);
                    }}
                  >
                    Prescrever
                  </button>
                </div>
                <div className="pt-4 flex gap-4 pb-8">
                  <div className="bg-white w-[50%] min-h-[200px] bg-[#a9aee3] p-4 rounded-lg">
                    <div>
                      <label htmlFor="add-medicacao">Adicionar medicação</label>
                      <div
                        id="add-medicacao"
                        className="my-2 border p-2 rounded-md shadow-md gap-2"
                      >
                        <div className="flex items-center">
                          <label htmlFor="medicamento">Medicamento</label>
                          <select
                            className="ml-auto pr-2 py-1 text-right rounded"
                            id="medicamento"
                            value={medicamento?.nome}
                            onChange={(e) => {
                              const medicamento = listaMedicamentos.find(
                                (med) => med.nome === e.target.value,
                              );
                              setMedicamento(medicamento);
                            }}
                          >
                            <option value="">Selecione...</option>
                            {listaMedicamentos.map((opcao) => (
                              <option key={opcao.id} value={opcao.nome}>
                                {opcao.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label htmlFor="dose">Dose</label>
                          <input
                            className="ml-auto w-20 text-right pr-2 py-1 rounded"
                            id="dose"
                            min={0}
                            type="number"
                            pattern="[0-9]+([\.,][0-9]+)?"
                            step="0.01"
                            maxLength={8}
                            onChange={(e) => {
                              const value = e.target.value;
                              setDoseInput(value);
                            }}
                            value={doseInput}
                          />
                          <select
                            className="ml-0 w-28 text-right pr-2 py-1 rounded"
                            id="dosagem"
                            value={dosagem}
                            onChange={(e) => {
                              const dose = Object.values(UnidadeDosagem).find(
                                (dose) => dose === e.target.value,
                              );
                              setDosagem(
                                dose ? dose : UnidadeDosagem.COMPRIMIDO,
                              );
                            }}
                          >
                            {Object.values(UnidadeDosagem).map((opcao) => (
                              <option key={opcao} value={opcao}>
                                {opcao}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label htmlFor="tempo">Intervalo de tempo</label>
                          <input
                            className="ml-auto w-14 text-right pr-2 py-1 rounded"
                            min={1}
                            id="tempo"
                            type="number"
                            maxLength={6}
                            onChange={(e) => setTempo(parseInt(e.target.value))}
                            value={tempo}
                          />
                          <select
                            className="ml-0 w-28 text-right pr-2 py-1 rounded"
                            id="intervalo-tempo"
                            value={intervalo}
                            onChange={(e) => {
                              const intervalo = Object.values(
                                IntervaloTempo,
                              ).find((dose) => dose === e.target.value);
                              setIntervalo(
                                intervalo ? intervalo : IntervaloTempo.DIAS,
                              );
                            }}
                          >
                            {Object.values(IntervaloTempo).map((opcao) => (
                              <option key={opcao} value={opcao}>
                                {opcao}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="ml-auto mt-2 w-10 h-6 flex items-center justify-center bg-orange-500 text-white rounded-xl"
                            onClick={() => handleAddMedicacao()}
                          >
                            <span className="text-xl font-bold font-mono">
                              +
                            </span>
                          </button>
                        </div>
                      </div>
                      <label htmlFor="lista-medicacoes">Medicações</label>
                      <div
                        id="lista-medicacoes"
                        className="p-4 border mt-1 bg-gray-100"
                      >
                        <ul>
                          {medicacoes.map((item, index) => (
                            <>
                              <li
                                key={index}
                                className="flex items-center mb-2 mt-1 bg-gray-100 p-2 rounded"
                              >
                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    className="mr-4 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                                    onClick={() => handleRemoveMedicacao(index)}
                                  >
                                    <span className="text-sm font-bold font-mono inline-block">
                                      x
                                    </span>
                                  </button>
                                </div>
                                <span>
                                  {item.medicamento?.nome +
                                    " " +
                                    item.dose +
                                    " " +
                                    item.unidade_dosagem +
                                    " de " +
                                    item.intervalo +
                                    "/" +
                                    item.intervalo +
                                    " " +
                                    item.intervalo_tempo}
                                </span>
                              </li>
                              <div className="border-b border-gray"></div>
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* <ul style={{ listStyle: "square" }}>
                      {prescricao.remedios.map((el) => (
                        <li key={el} className="p-2 flex items-center">
                          <div className="p-2 flex items-center justify-between">
                            <p className="min-w-[85%]">{el}</p> */}
                    {/* <a onClick={openModalEditMedicamento} className="ml-4 cursor-pointer w-[10%]">
                          <Image src={Edit} alt="Editar medicamento" className="ml-4 cursor-pointer" />
                        </a> */}
                    {/* <a className="cursor-pointer ml-4 w-[60px] h-[60px]">
                              <Image
                                src={Delete}
                                alt="Deletar medicamento"
                                className="cursor-pointer w-[60px] h-[60px]"
                              />
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                  <div className="bg-white w-[50%] min-h-[200px] bg-[#a9aee3] p-4 rounded-lg">
                    <label htmlFor="add-cuidado">Adicionar cuidado</label>
                    <div id="add-cuidado">
                      <input
                        className="border-2 border-solid w-full h-8 border-gray-300 focus:border-orange-500 focus:outline-none rounded p-2"
                        id="add-cuidado"
                        type="text"
                        onChange={(e) =>
                          setCuidado({ descricao: e.target.value })
                        }
                        value={cuidado?.descricao || ""}
                        onKeyDown={handleAddCuidado}
                      />
                    </div>
                    <label htmlFor="lista-cuidados">Cuidados</label>
                    <div
                      id="lista-cuidados"
                      className={"p-4 border mt-1 bg-gray-100"}
                    >
                      <ul>
                        {cuidados.map((item, index) => (
                          <>
                            <li
                              key={index}
                              className="flex items-center mb-2 mt-1 bg-gray-100 p-2 rounded"
                            >
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className="mr-4 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                                  onClick={() => handleRemoveCuidado(index)}
                                >
                                  <span className="text-sm font-bold font-mono inline-block">
                                    x
                                  </span>
                                </button>
                              </div>
                              <span>{item.descricao}</span>
                            </li>
                            <div className="border-b border-gray"></div>
                          </>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* <ul>
                      {prescricao.cuidados.map((el) => (
                        <li
                          key={el}
                          className="p-2 flex items-center justify-between"
                        >
                          <div className="p-2 flex items-center">
                            <p className="min-w-[85%]">{el}</p> */}
                  {/* <a className="ml-4 cursor-pointer w-[10%]" onClick={openModalEditCuidado}>
                          <Image src={Edit} alt="Editar cuidado" />
                        </a> */}
                  {/* <a
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
                    </ul> */}
                </div>
                {/* {modalCuidado && (
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
                )} */}
              </div>
            )}
          </TabContents>
          <TabContents tabId="tabs-exames" active={false}>
            <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
              <ExamesList id={paciente.id?.toString() || ""} />
            </div>
          </TabContents>
          <TabContents tabId="tab-sintomas" active={false}>
            <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
              <SintomasForm />
            </div>
          </TabContents>
        </div>
      </>
    </div>
  );
}
