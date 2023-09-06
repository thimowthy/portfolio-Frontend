import React, { useState } from "react";
import ReactFlow, { Node, Edge, MarkerType, Position } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./styles.module.css";
//import nodeStyle from "./styles.module.css";
//import edgeStyle from "./styles.module.css";
import TratamentoNode from "@/types/tratNode";

const initialTratamento: Record<string, TratamentoNode> = {
  node1: {
    id: 1,
    tipo: 0,
    nome: "Instabilidade Hemodinâmica",
    variavel: "instabilidade_hemodinamica",
    condicao: "instabilidade_hemodinamica",
    mensagem: "",
    dest: {
        sim: 2,
        nao: 3
    },
    posicao: [ 150, 695 ],
  },
  node2: {
      id: 2,
      tipo: 0,
      nome: "Infecção Prévia",
      variavel: "infeccao",
      condicao: "infeccao",
      mensagem: "",
      dest: {
          nao: 4,
          esbl: 5,
          mrsa: 6,
          epc: 7,
          vre: 8
      },
      posicao:[ 400, 210 ]
  },
  node3: {
      id: 3,
      tipo: 0,
      nome: "Infecção Prévia",
      variavel: "infeccao",
      condicao: "infeccao",
      mensagem: "",
      dest: {
          nao: 9,
          esbl: 10,
          mrsa: 11,
          epc: 12,
          vre: 13
      },
      posicao:[ 400, 1200 ]
  },
  node4: {
      id: 4,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Cefepime 2g 8/8h 2ª opção - Pipe-Tazo 4,5g 6/6h",
      dest: 14,
      posicao:[ 650, 10 ]
  },
  node5: {
      id: 5,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Cefepime 2g 8/8h + Amicacina 15mg/kg/dia 2ª opção (pacientes com disfunção renal) - Meropenem 1g 8/8h",
      dest: 14,
      posicao:[ 650, 110 ]
  },
  node6: {
      id: 6,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Vancomicina 15mg/kg 12/12h + Cefepime 2g 8/8h",
      dest: 14,
      posicao:[ 650, 210 ]
  },
  node7: {
      id: 7,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Meropenem 2g 8/8h + Amicacina 15mg/kg/dia 2ª opção - Meropenem 2g 8/8h + Polimixina B 25.000UI/Kg/dia (÷ 2 ou 3)",
      dest: 14,
      posicao:[ 650, 310 ]
  },
  node8: {
      id: 8,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Cefepime 2g 8/8h (adicionar Linezolida 600mg 12/12h se infecção por VRE nos últimos 30 dias)",
      dest: 14,
      posicao:[ 650, 410 ]
  },
  node9: {
      id: 9,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
      dest: 14,
      posicao:[ 650, 1000 ]
  },
  node10: {
      id: 10,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
      dest: 14,
      posicao:[ 650, 1100 ]
  },
  node11: {
      id: 11,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
      dest: 14,
      posicao:[ 650, 1200 ]
  },
  node12: {
      id: 12,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Vancomicina 1g 12/12h + Meropenem 2g 8/8h + Amicacina 15mg/kg/dia",
      dest: 14,
      posicao:[ 650, 1300 ]
  },
  node13: {
      id: 13,
      tipo: 1,
      nome: "Notificar Prescrição",
      variavel: "",
      condicao: "",
      mensagem: "Linezolida 600mg 12/12h + Meropenem 1g 8/8h",
      dest: 14,
      posicao:[ 650, 1400 ]
  },
  node14: {
      id: 14,
      tipo: 0,
      nome: "Infecção Viral?",
      variavel: "instabilidade_hemodinamica, infeccao_pele, pneumonia, gram_crescente",
      condicao: "infeccao_cateter OU infeccao_pele OU pneumonia OU gram_crescente",
      mensagem: "",
      dest: {
          sim: 15,
          nao: 16
      },
      posicao:[ 1200, 695 ]
  },
  node15: {
      id: 15,
      tipo: 1,
      nome: "Adicionar Medicação",
      variavel: "",
      condicao: "",
      mensagem: "Adicionar Vancomicina 15mg/kg/dose EV 12/12h ao esquema inicial",
      dest: 16,
      posicao:[ 1300, 750 ]
  },
  node16: {
      id: 16,
      tipo: 0,
      nome: "Sintomas Respiratórios?",
      variavel: "sintomas_resp, rx_torax_alterado",
      condicao: "sintomas_resp OU rx_torax_alterado",
      mensagem: "",
      dest: {
          sim: 17,
          nao: 18
      },
      posicao:[ 1450, 695 ]
  },
  node17: {
      id: 17,
      tipo: 1,
      nome: "Revisar Tratamento",
      variavel: "",
      condicao: "",
      mensagem: "- Solicitar TC de tórax - Adicionar Azitromicina 500mg EV/VO 1x/dia - Considerar tratamento de Pneumocistose (SMT/TMP 15 a 20mg de TMP/kg/dia ÷3/4) em pacientes com hipoxemia grave e uso prolongado de corticoides ou QTX com análogos da purina - Considerar Influenza, em particular nos meses de inverno",
      dest: 18,
      posicao:[ 1550, 750 ]
  },
  node18: {
    id: 18,
    tipo: 0,
    nome: "Sepse?",
    variavel: "sepse_abdominal, tiflite, celulite_perianal",
    condicao: "sepse_abdominal OU tiflite OU celulite_perianal",
    mensagem: "",
    dest: {
        sim: 19,
        nao: 20
    },
    posicao:[ 1700, 695 ]
  },
  node19: {
      id: 19,
      tipo: 1,
      nome: "Adicionar Medicação",
      variavel: "",
      condicao: "",
      mensagem: "Acrescentar cobertura p/ anaeróbio (Metronidazol EV 500mg 8/8h)",
      dest: 20,
      posicao:[ 1800, 750 ]
    },
  node20: {
      id: 20,
      tipo: 0,
      nome: "Úlceras bucais?",
      variavel: "ulcera_bucal",
      condicao: "ulcera_bucal",
      mensagem: "",
      dest: {
          sim: 21,
          nao: 22
      },
      posicao:[ 1950, 695 ]
    },
  node21: {
      id: 21,
      tipo: 1,
      nome: "Prescrever Medicação",
      variavel: "",
      condicao: "",
      mensagem: "Aciclovir EV 5mg/kg 3x/dia + Fluconazol EV 200mg/dia",
      dest: 22,
      posicao:[ 2050, 750 ]
  },
  node22: {
      id: 22,
      tipo: 0,
      nome: "Diarreia?",
      variavel: "diarreia",
      condicao: "diarreia",
      mensagem: "",
      dest: {
          sim: 23,
          nao: 24
      },
      posicao:[ 2200, 695 ]
  },
  node23: {
    id: 23,
    tipo: 1,
    nome: "Diagnosticar colite",
    variavel: "",
    condicao: "",
    mensagem: " Solicitar coprocultura, pesquisa de toxina A e B e leucócitos fecais - Se sinais/sintomas de colite: Metronidazol 500mg VO 8/8h",
    dest: 24,
    posicao:[ 2300, 750 ]
  },
  node24: {
    id: 24,
    tipo: 0,
    nome: "Infecão cateter?",
    variavel: "infec_cateter",
    condicao: "infec_cateter",
    mensagem: "",
    dest: {
        sim: 25,
        nao: "n"
    },
    posicao:[ 2450, 695 ]
},
  node25: {
      id: 25,
      tipo: 1,
      nome: "Infecção cateter",
      variavel: "",
      condicao: "",
      mensagem: "Remover o cateter se houver suspeita de infecção relacionada ao cateter E choque séptico refratário aos antibióticos - Coletar culturas e amostra de secreção do sítio de saída se houver secreção purulenta",
      dest: "n",
      posicao:[ 2550, 750 ]
  }
};

const nodeStyle: React.CSSProperties = {
  background: "#C9DDD8",
  color: "#2A423C",
  border: "1px solid #689F92",
  height: "70px",
  width: "150px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const decisionNodeStyle: React.CSSProperties = {
  background: "#C9DDD8",
  color: "#2A423C",
  border: "1px solid #689F92",
  height: "70px",
  width: "70px",
  clipPath: "polygon(0% 50%,50% 0%,50% 0%,100% 50%,100% 50%,50% 100%, 50% 100%,  0 50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const edgeStyle: React.CSSProperties = {
  stroke: "#a4c5bd",
};

const createEdgesFromNodes = (nodes: Record<string, TratamentoNode>): Edge[] => {
  return Object.entries(nodes).flatMap(([ nodeId, node ]) =>
    node.tipo === 0
      ? Object.entries(node.dest).map(([ label, targetNodeId ]) => ({
          id: `e${node.id}-${targetNodeId}`,
          source: node.id.toString(),
          target: targetNodeId.toString(),
          label: label,
          style: edgeStyle,
          markerEnd: {
            type: MarkerType.Arrow,
            color: "#689f92",
            width: 25,
            height: 25,
          },
        }))
      : [
          {
            id: `e${node.id}-${node.dest}`,
            source: node.id.toString(),
            target: node.dest.toString(),
            label:"",
            style: edgeStyle,
            markerEnd: {
              type: MarkerType.Arrow,
              color: "#689f92",
              width: 25,
              height: 25,
            },
          },
        ]
  );
};
const initialEdges = createEdgesFromNodes(initialTratamento);

console.log(initialEdges);

const initialNodes: Node[] = [
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
    position: { x: 2700, y: 715 },
    sourcePosition: Position.Left,
    targetPosition: Position.Left,
    selectable: false
  },
];


const TratFormContent: React.FC = () => {
  
  const [ nodes, setNodes ] = useState<Node[]>(initialNodes);
  const [ edges, setEdges ] = useState<Edge[]>(initialEdges);
  
  const [ diagnostico, setDiagnostico ] = useState(initialTratamento);

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
            panOnDrag={true}
            panOnScroll={false}
            preventScrolling={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={false}
            nodesConnectable={true}
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

export default TratFormContent;
