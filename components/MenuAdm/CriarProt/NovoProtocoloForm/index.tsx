import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Diagnostico from "@/types/Diagnostico";
import Tratamento from "@/types/Tratamento";
import Protocolo from "@/types/Protocolo";
import Router from "next/router";
import SuccessToast from "@/components/toasts/successToast";
import ErrorToast from "@/components/toasts/errorToast";
import { ProtocoloDB } from "@/types/ProtocoloDB";
import { defaultProtocolo } from "../../nodes/protFlow";
import fetcher from "@/api/fetcher";

interface ProtocolFormContentProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  prot: ProtocoloDB;
  edit: Boolean;
  onSave: React.Dispatch<React.SetStateAction<Protocolo | undefined>>;
}

const ProtocolFormContent: React.FC<ProtocolFormContentProps> = ({
  setOpenWindow,
  setCloseWindow,
  prot,
  edit,
  onSave,
}) => {
  const [showDiagText, setShowDiagText] = useState(false);
  const [showTratText, setShowTratText] = useState(false);
  const [sendToast, setSendToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [sendErrorToast, setSendErrorToast] = useState(false);
  const [protocoloDB, setProtocoloDB] = useState<ProtocoloDB>(prot);
  const [protocolo, setProtocolo] = useState<Protocolo>(defaultProtocolo);

  useEffect(() => {
    setProtocolo(JSON.parse(protocoloDB.descricao));
  }, [protocoloDB]);

  const sendProtocolo = async (protocolo: Protocolo) => {
    if (edit) {
      try {
        const response: Response = await fetcher({
          metodo: "PUT",
          rota: `/Protocolo/AtualizaProtocolo/${protocoloDB.id}`,
          cabecalho: { "Content-Type": "application/json" },
          body: JSON.stringify(JSON.stringify(protocolo)),
        });
        setSendToast(true);
        Router.push("/menu");
      } catch (error) {
        setSendErrorToast(true);
      }
    } else {
      try {
        const response: Response = await fetcher({
          metodo: "POST",
          rota: "/Protocolo/CadastrarProtocolo",
          cabecalho: { "Content-Type": "application/json" },
          body: JSON.stringify(JSON.stringify(protocolo)),
        });
        setSendToast(true);
        Router.push("/menu");
      } catch (error) {
        setSendErrorToast(true);
      }
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
  const handleSubmit = () => {
    if (protocolo.nome && protocolo.versao && protocolo.ano) {
      onSave(protocolo);
      sendProtocolo(protocolo);
    } else {
      setSendErrorToast(true);
    }
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
          type="number"
          min="1900"
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
            condição médica com base em uma série de condições e restrições
            lógicas.
          </p>
        )}
        {showTratText && (
          <p className={styles.textInfo}>
            Um fluxograma de tratamento é uma representação visual das etapas e
            decisões envolvidas no tratamento de uma condição médica específica.
            Ele é projetado para fornecer uma visão geral clara e organizada do
            plano de tratamento, incluindo as intervenções médicas, terapias,
            medicamentos e ações a serem tomadas em diferentes estágios da
            doença.
          </p>
        )}
      </div>
      <div className={styles.btn} id={styles.diagBtn}>
        <button
          className={styles.actionButton}
          type="button"
          onClick={() => {
            setOpenWindow("novo_diag");
            setCloseWindow("menu_prot");
          }}
          onMouseEnter={() => setShowDiagText(true)}
          onMouseLeave={() => setShowDiagText(false)}
        >
          Criar Diagnóstico
        </button>
      </div>
      <div className={styles.btn} id={styles.tratBtn}>
        <button
          className={styles.actionButton}
          type="button"
          onClick={() => {
            setOpenWindow("novo_trat");
            setCloseWindow("menu_prot");
          }}
          onMouseEnter={() => setShowTratText(true)}
          onMouseLeave={() => setShowTratText(false)}
        >
          Criar Tratamento
        </button>
      </div>
      <div className={styles.btn} id={styles.saveBtn}>
        <button
          className={styles.saveButton}
          type="button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Salvar Protocolo
        </button>
      </div>
      <div className={styles.toasts}>
        {sendToast && (
          <SuccessToast
            title="Sucesso"
            message="Protocolo salvo com sucesso"
            onClose={() => {
              setSendToast(false);
            }}
          />
        )}
        {errorToast && (
          <ErrorToast
            title="Erro"
            message="Erro ao salvar protocolo"
            onClose={() => {
              setErrorToast(false);
            }}
          />
        )}
        {sendErrorToast && (
          <ErrorToast
            title="Campos Obrigatórios"
            message="Todos os campos devem ser preenchidos."
            onClose={() => {
              setSendErrorToast(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProtocolFormContent;
