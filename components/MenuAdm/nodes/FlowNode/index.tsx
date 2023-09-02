import React from "react";
import styles from "./styles.module.css"; // Importe o arquivo CSS

interface FlowNodeProps {
  name: string;
  condition: string;
}

const FlowNode: React.FC<FlowNodeProps> = ({ name, condition }) => {
  const handleClick = () => {
    //console.log(`Clicou em ${name}`);
  };

  return (
    <div
      className={styles.flowNode}
      onClick={handleClick}
    >
      <div>
        <strong>Nome:</strong> {name}
      </div>
      <div>
        <strong>Condição:</strong> {condition}
      </div>
    </div>
  );
};

export default FlowNode;
