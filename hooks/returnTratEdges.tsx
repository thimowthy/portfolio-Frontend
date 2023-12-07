import TratamentoNode from "@/types/tratNode";
import { Edge, MarkerType } from "reactflow";

const edgeStyle: React.CSSProperties = {
  stroke: "#a4c5bd",
};

const createEdgesFromNodes = (
  nodes: Record<string, TratamentoNode>,
): Edge[] => {
  return Object.entries(nodes).flatMap(([nodeId, node]) =>
    node.tipo === 0
      ? Object.entries(node.dest).map(([label, targetNodeId]) => ({
          id: `e${node.id}-${targetNodeId}`,
          source: node.id.toString(),
          target: targetNodeId.toString(),
          label: label,
          style: edgeStyle,
          labelStyle: { textTransform: "uppercase" },
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
            label: "",
            style: edgeStyle,
            type: "smoothstep",
            labelStyle: { textTransform: "uppercase" },
            markerEnd: {
              type: MarkerType.Arrow,
              color: "#689f92",
              width: 25,
              height: 25,
            },
          },
        ],
  );
};

export default createEdgesFromNodes;
