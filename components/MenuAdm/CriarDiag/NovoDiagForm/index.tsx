import React, { useEffect, useState } from "react";
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
  diag: Diagnostico;
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
          <>
            Evento {node.id}
            <br />
            {node.nome}
          </>
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
    position: { x: 20, y: 25 },
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
    position: { x: 650, y: 260 },
    sourcePosition: Position.Top,
    targetPosition: Position.Top,
    selectable: false,
  },
];

const edges: Edge[] = initialEdges;

const DiagFormContent: React.FC<DiagFormContentProps> = ({ onDiagnosticoSubmit, diag }) => {
    
  const [diagnostico, setDiagnostico] = useState<Record<string, DiagnosticoNode>>(diag.nodes);
  
  const [valor, setValor] = useState<Record<string, string>>(
    Object.keys(diag.nodes).reduce((acc, chave) => {
      acc[chave] = diag.nodes[chave].valor.toString();
      return acc;
    }, {} as Record<string, string>)
  );
  const [selectedNode, setSelectedNode] = useState("node1");

  const [toastVisible, setToastVisible] = useState(false);

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode("node" + node.id.toString());
  };
  const handleDiagnosticoSubmit = () => {
    const novoDiagnostico: Diagnostico = {
      nodes: diagnostico,
    };
    onDiagnosticoSubmit(novoDiagnostico);
    setToastVisible(true);
  };

  useEffect(() => {
    if (valor) {
      let val = parseFloat(valor[selectedNode]);
      handleConditionChange(val);
    }
  }, [valor]);

  const handleConditionChange = (value: number) => {
    setDiagnostico((prevDiagnostico) => ({
      ...prevDiagnostico,
      [selectedNode]: {
        ...prevDiagnostico[selectedNode],
        valor: value,
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
          <div style={{ width: "690px", height: "320px" }}>
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
              onNodeClick={handleNodeClick}
            />
          </div>
        </div>
        <div className={styles.editDiv}>
          <div className={styles.inputDiv}>
          {(selectedNodeData && 
            <div>
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
              <div className={styles.varInput}>
                  <label className={styles.label}>Variável</label>
                  <p className={styles.input} id="var" placeholder="febre">
                    {selectedNodeData?.variavel || ""}
                  </p>
              </div>
              <div className={styles.condInput}>
              </div>
              <label className={styles.label}>Condição</label>
              <div className={styles.input}>
                <p>{selectedNodeData?.condicao.slice(0, -1)}</p>
                <input
                  className="w-16 h-8 ml-2 text-left pl-2 border rounded"
                  id="condition"
                  type="number"
                  min={0}
                  pattern="[0-9]+([\.,][0-9]+)?"
                  value={valor[selectedNode]}
                  onChange={(e) => {
                    setValor((prevValor) => {
                      const novoValor = { ...prevValor };
                      novoValor[selectedNode] = e.target.value;
                      return novoValor;
                    });
                  }}
                />
              </div>
            </div>
          )}
          {(!selectedNodeData && 
            <div className="flex items-center justify-center text-center h-full">
              <p className="text-gray-400 font-bold text-2xl">Selecione um <br/> evento</p>
            </div>
          )}
          </div>
          <div className={styles.saveDiv}>
            <button
              className={styles.saveBtn}
              type="button"
              onClick={() => {
                //console.log(diagnostico);
                handleDiagnosticoSubmit();
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
            onClose={() => {
              setToastVisible(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default DiagFormContent;
