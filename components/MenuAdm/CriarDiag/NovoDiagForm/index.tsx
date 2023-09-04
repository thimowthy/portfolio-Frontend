import React, { useState } from "react";
import ReactFlow, { Node, Edge, MarkerType, Position } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./styles.module.css";
import nodeStyle from "./styles.module.css";
import edgeStyle from "./styles.module.css";
import DiagnosticoNode from "@/types/diagNode";

const initialDiagnostico: Record<string, DiagnosticoNode> = {
  node1: {
    id: 1,
    ordem: 2,
    nome: "Neutropenia",
    variavel: "contagem",
    condicao: "contagem > 500",
    posicao: [ 150, 10 ],
    dest: [ 2 ],
  },
  node2: {
    id: 2,
    ordem: 2,
    nome: "Febre",
    variavel: "temperatura",
    condicao: "temperatura > 38.3",
    posicao: [ 400, 10 ],
    dest: [ -1 ],
  },
  node3: {
    id: 3,
    ordem: 2,
    nome: "Febre Ascendente",
    variavel: "horas_temp_maior_38",
    condicao: "horas_temp_maior_38 > 1",
    posicao: [ 400, 110 ],
    dest: [ -1 ],
  },
};

const initialNodes: Node[] = [
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
    position: { x: 20, y: 19 },
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

const initialEdges = [ { id: "e0-1", source: "0", target: "1", type: "step", style: edgeStyle, color: "#689f92", markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
                       { id: "e1-2", source: "1", target: "2", type: "step", style: edgeStyle, color: "#689f92", markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
                       { id: "e1-3", source: "1", target: "3", type: "step", style: edgeStyle, color: "#689f92", markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
                       { id: "e2-n", source: "2", target: "n", type: "step", style: edgeStyle, color: "#689f92", markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
                       { id: "e3-n", source: "3", target: "n", type: "step", style: edgeStyle, color: "#689f92", markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, }, ];

const DiagFormContent: React.FC = () => {
  
  const [ nodes, setNodes ] = useState<Node[]>(initialNodes);
  const [ edges, setEdges ] = useState<Edge[]>(initialEdges);
  
  const [ diagnostico, setDiagnostico ] = useState(initialDiagnostico);

  const [ selectedNode, setSelectedNode ] = useState("");

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode("node" + node.id.toString());
  };
  
  const handleFieldChange = (node:string, value:string) => {
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
            onNodeClick={handleNodeClick}
          />
        </div>
      </div>
      <div className={styles.editDiv}>
        <div className={styles.nameInput}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            id="name"
            type="text"
            placeholder="Febre"
            value={selectedNodeData?.nome}
            disabled={true} 
          />
        </div>
        <div className={styles.varInput}>
          <label className={styles.label}>Variável</label>
          <input
            className={styles.input}
            id="var"
            type="text"
            placeholder="febre"
            value={selectedNodeData?.variavel}
            disabled={true} 
          />
        </div>
        <div className={styles.condInput}>
          <label className={styles.label}>Restrição</label>
          <input
            className={styles.input}
            id="condition"
            type="text"
            placeholder="febre > 38"
            value={selectedNodeData?.condicao}
            onChange={(e) => {
              const novoValor = e.target.value;
              handleFieldChange(selectedNode, novoValor);
            }}
          />
        </div>
        <div className={styles.saveDiv}>
          <button
            className={styles.saveBtn}
            type="button"
            onClick={() => {console.log(diagnostico);}}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagFormContent;
