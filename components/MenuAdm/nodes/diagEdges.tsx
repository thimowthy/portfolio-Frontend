import { Edge, MarkerType } from "react-flow-renderer";
import { edgeStyle } from "./nodeStyles";

const initialEdges: Edge[] = [ 
    { id: "e0-1", source: "0", target: "1", type: "step", style: edgeStyle, markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
    { id: "e1-2", source: "1", target: "2", type: "step", style: edgeStyle, markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
    { id: "e1-3", source: "1", target: "3", type: "step", style: edgeStyle, markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
    { id: "e2-n", source: "2", target: "n", type: "step", style: edgeStyle, markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
    { id: "e3-n", source: "3", target: "n", type: "step", style: edgeStyle, markerEnd: { type: MarkerType.Arrow, color: "#689f92", width: 25, height: 25 }, },
];

export default initialEdges;