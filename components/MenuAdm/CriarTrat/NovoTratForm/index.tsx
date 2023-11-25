import React, { useEffect, useState } from "react";
import ReactFlow, { Node, Edge, Position, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./styles.module.css";
import { nodeStyle, decisionNodeStyle, edgeStyle } from "@/components/MenuAdm/nodes/nodeStyles";
import TratamentoNode from "@/types/tratNode";
import graphTratamento from "./../initialTratamento";
import createEdgesFromNodes from "@/hooks/returnTratEdges";
import Tratamento from "@/types/Tratamento";
import SuccessToast from "@/components/toasts/successToast";
import { UnidadeDosagem } from "@/types/Enum/UnidadeDosagem";
import { IntervaloTempo } from "@/types/Enum/IntervaloTempo";
import { Medicamento } from "@/types/Medicamento";
import { ItemMedicamento } from "@/types/ItemMedicamento";
import { ItemCuidado } from "@/types/ItemCuidado";
import { Prescricao } from "@/types/Prescricao";


interface TratFormContentProps {
  onTratamentoSubmit: (tratamento: Tratamento) => void;
}

const initialTratamento: Record<string, TratamentoNode> = graphTratamento;

const nodes: Node[] = [
  ...Object.keys(initialTratamento).map((key) => {
    const node = initialTratamento[key];
    return {
      id: node.id.toString(),
      position: { x: node.posicao[0], y: node.posicao[1] },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      style: node.tipo === 1 ? nodeStyle : decisionNodeStyle,
      data: {
        label: node.tipo === 1? (
          <>Evento {node.id - 3}<br/>{node.nome}</>
        ): <></>,
      },
      onClick: () => {
        console.log(`Node ${node.id} clicked`);
      },
    };
  }),
  {
    id: "0",
    data: {
    },
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
    selectable: false
  },
  {
    id: "n",
    data: {
    },
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
    selectable: false
  },
];

const edges: Edge[] = createEdgesFromNodes(initialTratamento).concat(
  { id: "e0-1", source: "0", target: "1", style: edgeStyle, markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
);

const TratFormContent: React.FC<TratFormContentProps> = ({ onTratamentoSubmit }) => {
  
  const [tratamento, setTratamento] = useState(initialTratamento);
  const [selectedNode, setSelectedNode] = useState("4");
  const [nodeType, setNodeType] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  
  const [listaMedicamentos, setListaMedicamentos] = useState<Medicamento[]>([
    { id:0, nome:"Dipirona" },
    { id:1, nome:"Ibuprofeno" },
  ]);
  
  
  const [opcao, setOpcao] = useState(1);
  const [medicamento, setMedicamento] = useState<Medicamento>();
  const [dose, setDose] = useState(1);
  const [dosagem, setDosagem] = useState<UnidadeDosagem>(UnidadeDosagem.COMPRIMIDO);
  const [tempo, setTempo] = useState(1);
  const [intervalo, setIntervalo] = useState<IntervaloTempo>(IntervaloTempo.DIAS);  

  const [medicacao, setMedicacao] = useState<ItemMedicamento>();
  const [medicacoes, setMedicacoes] = useState<ItemMedicamento[]>([]);
  const [cuidado, setCuidado] = useState<ItemCuidado>({ descricao: "" });
  const [cuidados, setCuidados] = useState<ItemCuidado[]>([]);

  const [prescricao, setPrescricao] = useState<Prescricao>();

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    let id = "node" + node.id.toString();
    let no = tratamento[id];
    setSelectedNode(id);
    setNodeType(no.tipo);
    setPrescricao({ medicacoes:no.prescricao?.medicacoes || [], cuidados: no.prescricao?.cuidados || [] });
    setCuidados(no.prescricao?.cuidados || []);
    setMedicacoes(no.prescricao?.medicacoes || []);
  };
  const handleTratamentoSubmit = () => {
    const novoTratamento: Tratamento = {
      nodes: tratamento
    };
   onTratamentoSubmit(novoTratamento);
    setToastVisible(true);
  };
  const handleConditionChange = (node:string, value:string) => {
    setTratamento((prevTratamento) => ({
      ...prevTratamento,
      [node]: {
        ...prevTratamento[node],
        condicao: value,
      },
    }));
  };
  const handleMessageChange = (node:string, value:string) => {
    setTratamento((prevTratamento) => ({
      ...prevTratamento,
      [node]: {
        ...prevTratamento[node],
        mensagem: value,
      },
    }));
  };
  const handleAddCuidado = (e: any) => {
    console.log(cuidado);
    if (e.key === "Enter") {
      e.preventDefault();
      if (cuidado?.descricao.trim() !== "") {
        setCuidados((prevCuidados) => [...prevCuidados, cuidado]);
        setCuidado({ descricao: "" });
      }
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
            {!nodeType && (
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
                <div className={styles.condInput}>
                  <label className={styles.label}>Condição</label>
                  <input
                    className={styles.input}
                    id="condition"
                    type="text"
                    placeholder="febre > 38"
                    disabled={true}
                    value={selectedNodeData?.condicao || ""}
                    onChange={(e) => {
                      const novoValor = e.target.value;
                      handleConditionChange(selectedNode, novoValor);
                    }}
                  />
                </div>
              </div>
            )}
            {nodeType && (
              <div className={styles.prescricaoInput}>
                <h1 className={styles.label}>Prescrição</h1>
                <div className={styles.medicacoesDiv}>
                  <label>Medicações</label>
                  <select
                    value={medicamento?.nome}
                    onChange={(e) => {
                      const selectedMedicamento = listaMedicamentos.find(med => med.id === parseInt(e.target.value));
                      setMedicamento(selectedMedicamento);
                    }}>
                    <option value="">Selecione...</option>
                    {listaMedicamentos.map((opcao) => (
                      <option key={opcao.id} value={opcao.nome}>
                        {opcao.nome}
                      </option>
                    ))}
                  </select>
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
                  <div className={"p-4 border mt-1 bg-gray-100"}>
                    <ul>
                      {medicacoes.map((item, index) => (
                        <li key={index} className="flex items-center mb-2 border mt-1 bg-gray-100 p-2 rounded">
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="mr-4 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                              onClick={() => handleRemoveMedicacao(index)}
                            >
                              <span className="text-sm font-bold font-mono inline-block">x</span>
                            </button>
                          </div>
                          <span>{ item.medicamento.nome + " " +
                                  item.dose + item.unidade_dosagem + " de " +
                                  item.intervalo + "/" + item.intervalo + " " +
                                  item.intervalo_tempo}</span>
                        </li> 
                      ))}
                    </ul>
                  </div>
                </div>  
                <div className={styles.cuidadosDiv}>
                  <label>Cuidados</label>
                  <input
                    className={styles.input}
                    id="cuidado"
                    type="text"
                    onChange={(e) => setCuidado({ descricao: e.target.value })}
                    value={cuidado.descricao}
                    onKeyDown={handleAddCuidado }
                  />
                  <div className={"p-4 border mt-1 bg-gray-100"}>
                    <ul>
                      {cuidados.map((item, index) => (
                        <li key={index} className="flex items-center mb-2 border mt-1 bg-gray-100 p-2 rounded">
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="mr-4 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                              onClick={() => handleRemoveCuidado(index)}
                            >
                              <span className="text-sm font-bold font-mono inline-block">x</span>
                            </button>
                          </div>
                          <span>{item.descricao}</span>
                        </li> 
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
              onClose={() => { setToastVisible(false); } } />
          )}
      </div>
    </div>
  );
};

export default TratFormContent;
