import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Diagnostico from "@/types/Diagnostico";
import Tratamento from "@/types/Tratamento";
import Protocolo from "@/types/Protocolo";
import Router from "next/router";
import SuccessToast from "@/components/toasts/successToast";
import ErrorToast from "@/components/toasts/errorToast";

interface ProtocolFormContentProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  diagnostico: Diagnostico;
  tratamento: Tratamento;
  prot: Protocolo;
  onSave: React.Dispatch<React.SetStateAction<Protocolo>>;
}

const ProtocolFormContent: React.FC<ProtocolFormContentProps> = ({
  setOpenWindow,
  setCloseWindow,
  diagnostico,
  tratamento,
  prot,
  onSave
  }) => {

  const [ showDiagText, setShowDiagText ] = useState(false);
  const [ showTratText, setShowTratText ] = useState(false);
  const [ sendToast, setSendToast ] = useState(false);
  const [ errorToast, setErrorToast ] = useState(false);
  const [ sendErrorToast, setSendErrorToast ] = useState(false);

  const [ protocolo, setProtocolo ] = useState<Protocolo>({
                                                            ...prot,
                                                            diagnostico: diagnostico,
                                                            tratamento: tratamento,
                                                          });

  const sendProtocolo = async (protocolo: Protocolo) => {
    try {
      // ATUALIZAR URL
      const response = await fetch("http://localhost:3001/protocolos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(protocolo),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Protocolo saved successfully:", responseData);
        setSendToast(true);
        Router.push("/menu");
      } else {
        setErrorToast(true);
        console.error("Failed to save Protocolo:", response.statusText);
      }
    } catch (error) {
      setSendErrorToast(true);
      console.error("An error occurred while sending the request:", error);
    }
  };                                                          
  const handleInputChange = (fieldName: string, value: string) => {
    setProtocolo((prevProtocolo) => {
      const updatedProtocolo = {
        ...prevProtocolo,
        [fieldName]: value,
      };
      onSave(updatedProtocolo);
      return updatedProtocolo;
    });
  };
                                                                                                          
  return (
    <div className={styles.formContainer}>
      <div className={styles.nameInput}>
        <label>Nome do Protocolo:</label>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Nome do Protocolo"
          value={protocolo.nome || ""}
          required
          onChange={(e) => handleInputChange("nome", e.target.value)}
        />
      </div>
      <div className={styles.versionInput}>
        <label>Versão:</label>
        <input
          type="text"
          className={styles.inputField}
          placeholder="1.0"
          value={protocolo.versao || ""}
          required
          onChange={(e) => handleInputChange("versao", e.target.value)}
        />
      </div>
      <div className={styles.yearInput}>
        <label>Ano:</label>
        <input
          type="text"
          className={styles.inputField}
          placeholder="2023"
          value={protocolo.ano || ""}
          required
          onChange={(e) => handleInputChange("ano", e.target.value)}
        />
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
      <div className = {styles.btn} id={styles.diagBtn}>
        <button
          className={styles.actionButton}
          type="button"
          onClick={() => {
            setOpenWindow("novo_diag");
            setCloseWindow("menu_prot");
          }}
          onMouseEnter={() => setShowDiagText(true)}
          onMouseLeave={() => setShowDiagText(false)}
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
          onMouseEnter={() => setShowTratText(true)}
          onMouseLeave={() => setShowTratText(false)}
        >Criar Tratamento</button>
      </div>
      <div className= {styles.btn} id={styles.saveBtn}>
        <button
          className={styles.saveButton}
          type="button"
          onClick={() => { 
            onSave(protocolo);
            sendProtocolo(protocolo);   
          }}
        >Salvar Protocolo</button>
      </div>
      <div className={styles.toasts}>
        {sendToast && (
          <SuccessToast
            title="Sucesso"
            message="Protocolo salvo com sucesso"
            onClose={() => { setSendToast(false); } } />
        )}
        {errorToast && (
          <ErrorToast
            title="Erro"
            message="Erro ao salvar protocolo"
            onClose={() => { setErrorToast(false); } } />
        )}
        {sendErrorToast && (
          <ErrorToast
            title="Erro"
            message="Erro ao enviar protocolo"
            onClose={() => { setSendErrorToast(false); } } />
        )}
      </div>
    </div>
  );
};

export default ProtocolFormContent;
