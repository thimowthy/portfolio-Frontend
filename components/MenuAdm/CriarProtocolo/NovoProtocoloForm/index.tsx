import React from "react";
import styles from "./styles.module.css";

const ProtocolFormContent: React.FC = () => {
  return (
    <div className={styles.formContainer}>
      <label>Nome do Protocolo:</label>
      <input type="text" className={styles.inputField} />

      <label>Versão:</label>
      <input type="text" className={styles.inputField} />

      <div className={styles.buttonColumn}>
        <div className={styles.buttonInfo}>
          <button className={styles.actionButton}>Criar Diagnóstico</button>
        </div>
        <div className={styles.buttonInfo}>
          <button className={styles.actionButton}>Criar Tratamento</button>
        </div>
        <div className={styles.buttonInfo}>
          <button className={styles.actionButton}>Criar Cronograma</button>
        </div>
      </div>
      <button className={styles.saveButton}>Salvar Protocolo</button>
    </div>
  );
};

export default ProtocolFormContent;
