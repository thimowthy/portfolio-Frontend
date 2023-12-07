import React, { useEffect, useState } from "react";
import ReactFlow, { Node, Edge, Position, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./styles.module.css";
import {
  nodeStyle,
  decisionNodeStyle,
  edgeStyle,
} from "@/components/MenuAdm/nodes/nodeStyles";
import createEdgesFromNodes from "@/hooks/returnTratEdges";
import Tratamento from "@/types/Tratamento";
import SuccessToast from "@/components/toasts/successToast";
import { UnidadeDosagem } from "@/types/Enum/UnidadeDosagem";
import { IntervaloTempo } from "@/types/Enum/IntervaloTempo";
import { Medicamento } from "@/types/Medicamento";
import { ItemMedicamento } from "@/types/ItemMedicamento";
import { ItemCuidado } from "@/types/ItemCuidado";
import { Prescricao } from "@/types/Prescricao";
import { tratamentoInicial } from "./initialTratamento";
import TratamentoNode from "@/types/tratNode";


interface TratFormContentProps {
  onTratamentoSubmit: (tratamento: Tratamento) => void;
  trat: Tratamento;
}

const nodes: Node[] = [
  ...Object.keys(tratamentoInicial).map((key) => {
    const node = tratamentoInicial[key];
    return {
      id: node.id.toString(),
      position: { x: node.posicao[0], y: node.posicao[1] },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      style: node.tipo === 1 ? nodeStyle : decisionNodeStyle,
      data: {
        label:
          node.tipo === 1 ? (
            <>
              Evento {node.id - 3}
              <br />
              {node.nome}
            </>
          ) : (
            <></>
          ),
      },
    };
  }),
  {
    id: "0",
    data: {},
    style: {
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      backgroundColor: "#477167",
      color: "white",
    },
    position: { x: 20, y: 710 },
    sourcePosition: Position.Right,
    targetPosition: Position.Right,
    selectable: false,
  },
  {
    id: "n",
    data: {},
    style: {
      width: "30px",
      height: "30px",
      backgroundColor: "#477167",
      borderRadius: "50%",
      boxShadow: "0 0 0 2px #fff, 0 0 0 3px #477167",
    },
    position: { x: 3000, y: 697.5 },
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
    selectable: false,
  },
];

const edges: Edge[] = createEdgesFromNodes(tratamentoInicial).concat({
  id: "e0-1",
  source: "0",
  target: "1",
  style: edgeStyle,
  markerEnd: {
    type: MarkerType.Arrow,
    color: "#689f92",
    width: 25,
    height: 25,
  },
});
const noInicial = "node4";
const presc = tratamentoInicial[noInicial].prescricao;
const precricaoInicial = presc?presc:{ medicacoes:[], cuidados:[] };

const TratFormContent: React.FC<TratFormContentProps> = ({ onTratamentoSubmit, trat }) => {
  
  const [tratamento, setTratamento] = useState<Record<string, TratamentoNode>>(trat.nodes);
  const [selectedNode, setSelectedNode] = useState(noInicial);
  const [nodeType, setNodeType] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

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

  const [prescricao, setPrescricao] = useState<Prescricao>(trat.nodes[noInicial].prescricao || precricaoInicial);
  const [medicacoes, setMedicacoes] = useState<ItemMedicamento[]>(prescricao.medicacoes);
  const [cuidados, setCuidados] = useState<ItemCuidado[]>(prescricao.cuidados);
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

  useEffect(() => {
    if (doseInput) {
      setDose(parseFloat(doseInput));
    }
  }, [doseInput]);

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

  useEffect(() => {
    tratamento[selectedNode].prescricao = prescricao;
  }, [prescricao, selectedNode, tratamento]);

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    let id = "node" + node.id.toString();
    let no = tratamento[id];
    if (no) {
      setSelectedNode(id);
      setNodeType(no.tipo);
      setPrescricao({
        medicacoes: no.prescricao?.medicacoes || [],
        cuidados: no.prescricao?.cuidados || [],
      });
      setCuidados(no.prescricao?.cuidados || []);
      setMedicacoes(no.prescricao?.medicacoes || []);
    }
  };
  const handleTratamentoSubmit = () => {
    const novoTratamento: Tratamento = {
      nodes: tratamento,
    };
    onTratamentoSubmit(novoTratamento);
    setToastVisible(true);
  };
  const handleConditionChange = (node: string, value: string) => {
    setTratamento((prevTratamento) => ({
      ...prevTratamento,
      [node]: {
        ...prevTratamento[node],
        condicao: value,
      },
    }));
  };
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

  const selectedNodeData = tratamento[selectedNode];

  return (
    <div className={styles.formContainer}>
      <div className={styles.chartDiv}>
        <div style={{ width: "640px", height: "320px" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            elementsSelectable={true}
            nodesDraggable={false}
            panOnDrag={true}
            panOnScroll={false}
            preventScrolling={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={false}
            nodesConnectable={false}
            onNodeClick={handleNodeClick}
            maxZoom={2.5}
            minZoom={0.2}
            fitView={true}
          />
        </div>
      </div>
      <div className={styles.editDiv}>
        <div className={styles.inputDiv}>
          {!Boolean(nodeType) && (
            <div className={styles.condicaoDiv}>
              <div className={styles.nameInput}>
                <label className={styles.label}>Nome</label>
                <input
                  className={styles.input}
                  id="name"
                  type="text"
                  placeholder="Febre"
                  value={selectedNodeData?.nome || ""}
                  disabled={true}
                />
              </div>
              <div className={styles.descInput}>
                <label className={styles.label}>Descrição</label>
                <textarea
                  className="w-full h-32 p-4 border border-1 border-gray-300 rounded resize-none"
                  id="condition"
                  placeholder="febre > 38"
                  disabled={true}
                  value={selectedNodeData?.descricao || ""}
                  onChange={(e) => {
                    const novoValor = e.target.value;
                    handleConditionChange(selectedNode, novoValor);
                  }}
                />
              </div>
            </div>
          )}
          {Boolean(nodeType) && (
            <div className={styles.prescricaoInput}>
              <h1 className={styles.label}>
                Prescrição (Evento {tratamento[selectedNode].id - 3})
              </h1>
              <div className="ml-2 mt-4">
                <label htmlFor="add-medicacao">Adicionar medicação</label>
                <div
                  id="add-medicacao"
                  className="mb-2 border p-2 rounded-md shadow-md gap-2"
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
                        setDosagem(dose ? dose : UnidadeDosagem.COMPRIMIDO);
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
                        const intervalo = Object.values(IntervaloTempo).find(
                          (dose) => dose === e.target.value,
                        );
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
                      <span className="text-xl font-bold font-mono">+</span>
                    </button>
                  </div>
                </div>

                {/* <textarea
                    className={styles.input}
                    id="mensagem"
                    style={{
                      height: "60px",
                      resize: "none",
                    }}
                    placeholder="Prescrever medicação"
                    value={selectedNodeData?.mensagem || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      handleMessageChange(selectedNode, newValue);
                    }}
                  /> */}
                <label htmlFor="lista-medicacoes">Medicações</label>
                <div
                  id="lista-medicacoes"
                  className={"p-4 border mt-1 bg-gray-100"}
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
              <div className="border-b p-"></div>
              <div className="ml-2 mt-4">
                <label htmlFor="add-cuidado">Adicionar cuidado</label>
                <input
                  className={styles.input}
                  id="add-cuidado"
                  type="text"
                  onChange={(e) => setCuidado({ descricao: e.target.value })}
                  value={cuidado?.descricao || ""}
                  onKeyDown={handleAddCuidado}
                />
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
            </div>
          )}
        </div>
        <div className={styles.saveDiv}>
          <button
            className={styles.saveBtn}
            type="button"
            onClick={() => {
              //console.log(tratamento);
              handleTratamentoSubmit();
            }}
          >
            Salvar
          </button>
        </div>
      </div>
      <div className={styles.successToast}>
        {toastVisible && (
          <SuccessToast
            title="Sucesso"
            message="Tratamento salvo com sucesso"
            onClose={() => {
              setToastVisible(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TratFormContent;
