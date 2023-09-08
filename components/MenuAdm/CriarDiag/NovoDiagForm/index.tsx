import React, { useState } from "react";
import ReactFlow, { Node, Edge, MarkerType, Position } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./styles.module.css";
import { nodeStyle } from "@/components/MenuAdm/nodes/nodeStyles";
import DiagnosticoNode from "@/types/diagNode";
import graphDiagnostico from "../initialDiagnostico";
import initialEdges from "../../nodes/diagEdges";
import Diagnostico from "@/types/Diagnostico";
import SuccessToast from "@/components/toasts/successToast";

interface DiagFormContentProps {
  onDiagnosticoSubmit: (diagnostico: Diagnostico) => void;
}

const initialDiagnostico: Record<string, DiagnosticoNode> = graphDiagnostico;

const nodes: Node[] = [
  ...Object.keys(initialDiagnostico).map((key) => {
    const node = initialDiagnostico[key];
    return {
      id: node.id.toString(),
      position: { x: node.posicao[0], y: node.posicao[1] },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      style: nodeStyle,
      data: {
        label: (
          <>Evento {node.id}<br/>{node.nome}</>
        ),
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
    position: { x: 20, y: 25 },
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
    position: { x: 650, y: 260 },
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    selectable: false
  },
];

const edges: Edge[] = initialEdges;

const DiagFormContent: React.FC<DiagFormContentProps> = ({ onDiagnosticoSubmit }) => {
    
  const [ diagnostico, setDiagnostico ] = useState(initialDiagnostico);

  const [ selectedNode, setSelectedNode ] = useState("");

  const [ toastVisible, setToastVisible ] = useState(false);

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode("node" + node.id.toString());
  };
  const handleDiagnoticoSubmit = () => {
    const novoDiagnostico: Diagnostico = {
      nodes: diagnostico
    };
    onDiagnosticoSubmit(novoDiagnostico);
    setToastVisible(true);
  };

  const handleConditionChange = (node:string, value:string) => {
    setDiagnostico((prevDiagnostico) => ({
      ...prevDiagnostico,
      [node]: {
        ...prevDiagnostico[node],
        condicao: value,
      },
    }));
  };

  const getSelectedNodeData = () => {
    return diagnostico[selectedNode];
  };

  const selectedNodeData = getSelectedNodeData();

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.chartDiv}>
          <div style={{ width: "720px", height: "320px" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              elementsSelectable={true}
              nodesDraggable={false}
              panOnDrag={false}
              panOnScroll={false}
              preventScrolling={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              nodesConnectable={false}
              onNodeClick={handleNodeClick} />
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
                disabled={true} />
            </div>
            <div className={styles.varInput}>
              <label className={styles.label}>Variável</label>
              <input
                className={styles.input}
                id="var"
                type="text"
                placeholder="febre"
                value={selectedNodeData?.variavel || ""}
                disabled={true} />
            </div>
            <div className={styles.condInput}>
              <label className={styles.label}>Condição</label>
              <input
                className={styles.input}
                id="condition"
                type="text"
                placeholder="febre > 38"
                value={selectedNodeData?.condicao || ""}
                onChange={(e) => {
                  const novoValor = e.target.value;
                  handleConditionChange(selectedNode, novoValor);
                } } />
            </div>
          </div>
          <div className={styles.saveDiv}>
            <button
              className={styles.saveBtn}
              type="button"
              onClick={() => {
                //console.log(diagnostico);
                handleDiagnoticoSubmit();
              } }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
      <div className={styles.successToast}>
          {toastVisible && (
            <SuccessToast
              title="Sucesso"
              message="Diagnóstico salvo com sucesso"
              onClose={() => { setToastVisible(false); } } />
          )}
      </div>
    </>
  );
};

export default DiagFormContent;
