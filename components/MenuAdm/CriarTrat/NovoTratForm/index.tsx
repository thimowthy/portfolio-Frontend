import React, { useState } from "react";
import ReactFlow, { Node, Edge, Position, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./styles.module.css";
import { nodeStyle, decisionNodeStyle, edgeStyle } from "@/components/MenuAdm/nodes/nodeStyles";
import TratamentoNode from "@/types/tratNode";
import graphTratamento from "./../initialTratamento";
import createEdgesFromNodes from "@/hooks/returnTratEdges";
import Tratamento from "@/types/Tratamento";
import SuccessToast from "@/components/toasts/successToast";


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
          <>Evento {node.id}<br/>{node.nome}</>
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
  const [selectedNode, setSelectedNode] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode("node" + node.id.toString());
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
  
  const getSelectedNodeData = () => {
    return tratamento[selectedNode];
  };

  const selectedNodeData = getSelectedNodeData();

  return (
    <div className={styles.formContainer}>
      <div className={styles.chartDiv}>
        <div style={{ width: "720px", height: "320px" }}>
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
          <div className={styles.varInput} style={{ display: selectedNodeData?.tipo === 1 ? "none" : "block" }}>
            <label className={styles.label}>Variável</label>
            <input
              className={styles.input}
              id="var"
              type="text"
              placeholder="febre"
              value={selectedNodeData?.variavel || ""}
              disabled={true} 
            />
          </div>
          <div className={styles.condInput} style={{ display: selectedNodeData?.tipo === 1 ? "none" : "block" }}>
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
          <div className={styles.msgInput} style={{ display: selectedNodeData?.tipo === 0 ? "none" : "block" }}>
            <label className={styles.label}>Mensagem</label>
            <textarea
              className={styles.input}
              id="mensagem"
              style={{
                height: "160px",
                resize: "none",
              }}
              placeholder="Prescrever medicação"
              value={selectedNodeData?.mensagem || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                handleMessageChange(selectedNode, newValue);
              }}
            />
          </div>
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
