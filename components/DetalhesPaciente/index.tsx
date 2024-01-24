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

  const [internamento, setInternamento] = useState<Internacao>();

  const [listaMedicamentos, setListaMedicamentos] = useState<Medicamento[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internamento = await fetcher({
          metodo: "GET",
          rota: `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Internacao/GetInternacaoAtual?pacienteId=${paciente.id}`,
        });
        setInternamento(internamento);
      } catch (error) {}
    };
    if (paciente.id) fetchData();
  }, [paciente]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listaMedicamentos = await fetcher({
          metodo: "GET",
          rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Medicamento/GetAllMedicamentos",
        });
        setListaMedicamentos(listaMedicamentos);
      } catch (error) {}
    };
    fetchData();
  }, []);

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
        rota: `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Internacao/CadastrarTemperatura/${paciente.id}`,
        cabecalho: { "Content-Type": "application/json" },
        body: JSON.stringify({ temperatura: temperatura }),
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

  const gerarPrescricao = async () => {
    const response = await fetcher({
      rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Prescricao/CadastrarPrescricao",
      metodo: "POST",
      body: JSON.stringify({
        dataSolicitacao: "2024-01-18T00:32:48.828Z",
        itensCuidado: prescricao?.cuidados,
        itensMedicamento: prescricao?.medicacoes,
        urgente: true,
        idInternamento: internamento?.id,
      }),
    });
  };

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
                    onClick={gerarPrescricao}
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
                            {Object.values(UnidadeDosagem).map(
                              (opcao, index) => (
                                <option key={`${opcao}${index}`} value={opcao}>
                                  {opcao}
                                </option>
                              ),
                            )}
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
              <SintomasForm id={paciente.id?.toString() || ""} />
            </div>
          </TabContents>
        </div>
      </>
    </div>
  );
}
