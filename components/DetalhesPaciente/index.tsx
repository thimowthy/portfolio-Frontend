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
import PacienteTab from "../PacienteTab";
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
