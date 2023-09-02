import React, { useState } from "react";
import styles from "./styles.module.css";

interface ProtocolFormContentProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
}

const ProtocolFormContent: React.FC<ProtocolFormContentProps> = ({
  setOpenWindow,
  setCloseWindow
  }) => {

  const [ showDiagText, setShowDiagText ] = useState(false);
  const [ showTratText, setShowTratText ] = useState(false);
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.nameInput}>
        <label>Nome do Protocolo:</label>
        <input type="text" className={styles.inputField} placeholder="Nome do Protocolo"/>
      </div>
      <div className={styles.versionInput}>
        <label>Versão:</label>
        <input type="text" className={styles.inputField} placeholder="1.0"/>
      </div>
      <div className={styles.yearInput}>
        <label>Ano:</label>
        <input type="text" className={styles.inputField} placeholder="2023"/>
      </div>
      <div className = {styles.btn} id={styles.diagBtn}>
        <button
          className={styles.actionButton}
          type="button"
          onClick={() => {
            setOpenWindow("novo_diag");
            setCloseWindow("menu_prot");
          }}
          onMouseEnter={() => setShowTratText(true)}
          onMouseLeave={() => setShowTratText(false)}
        >Criar Diagnóstico</button>
      </div>
      <div className= {styles.btn} id={styles.tratBtn}>
        <button
          className={styles.actionButton}
          type="button"
          onClick={() => {
            setOpenWindow("novo_trat");
            setCloseWindow("menu_prot");
          }}
          onMouseEnter={() => setShowDiagText(true)}
          onMouseLeave={() => setShowDiagText(false)}
        >Criar Tratamento</button>
      </div>
      <div className= {styles.btn} id={styles.saveBtn}>
        <button
          className={styles.saveButton}
          type="button"
        >Salvar Protocolo</button>
      </div>
      <div className={styles.textDiv}>
        {showDiagText && (
          <p className={styles.textInfo}>
            Um fluxograma de diagnóstico é uma representação visual que ilustra
            o processo de determinar a presença ou ausência de uma determinada
            condição médica com base em uma série de condições e restrições lógicas.
          </p>
        )}
        {showTratText && (
          <p className={styles.textInfo}>
            Um fluxograma de tratamento é uma representação visual das etapas
            e decisões envolvidas no tratamento de uma condição médica específica. Ele
            é projetado para fornecer uma visão geral clara e organizada do plano de
            tratamento, incluindo as intervenções médicas, terapias, medicamentos e
            ações a serem tomadas em diferentes estágios da doença.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProtocolFormContent;
