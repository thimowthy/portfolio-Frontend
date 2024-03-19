import React from "react";
import { useStoreApi, useReactFlow, Panel, Node } from "reactflow";

const panelStyle = {
  color: "#777",
  fontSize: 12,
};

const buttonStyle = {
  fontSize: 12,
  marginRight: 5,
  marginTop: 5,
};

export const CenterButton = () => {
  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes: Node[] = Array.from(nodeInternals).map(([, node]) => node);
    console.log(nodes);

    if (nodes.length > 0) {            
        const node = nodes[0];
        const x = node.position.x;
        const y = node.position.y;
        const zoom = 1;
        setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  return (
    <Panel position="top-right" style={panelStyle}>
      <div>
        <button type="button" className="h-2 border-2 p-4 items-center justify-center flex rounded-full" onClick={focusNode}>
          Centralizar
        </button>
      </div>
    </Panel>
  );
};