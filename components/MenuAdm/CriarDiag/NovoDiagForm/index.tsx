import React, { useState } from "react";
import styles from "./styles.module.css";
import FlowNode from "@/components/MenuAdm/nodes/FlowNode";
const DiagFormContent: React.FC = () => {
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.chartDiv}>
        <FlowNode
          name="Neutropenia"
          condition="contagem > 500"
        />
      </div>
      <div className={styles.editDiv}>
        <div className={styles.nameInput}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            id="name"
            type="text"
            placeholder="Neutropenia">
          </input>
        </div>
        <div className={styles.condInput}>
        <label className={styles.label}>Restrição</label>
          <input
            className={styles.input}
            id="condition"
            type="text"
            placeholder="Contagem de Neutrófilos > 500">  
          </input>
        </div>
      </div>
    </div>
  );
};

export default DiagFormContent;
