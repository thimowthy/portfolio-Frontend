import React from "react";
import NovoProtocolForm from "./NovoProtocoloForm";
import styles from "./styles.module.css";
import BackIcon from "@/components/buttons/backIcon";
import Router from "next/router";
import Diagnostico from "@/types/Diagnostico";
import Tratamento from "@/types/Tratamento";
import Protocolo from "@/types/Protocolo";

interface CreateProtocolProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  windowName: string;
  diagnostico: Diagnostico;
  tratamento: Tratamento;
  protocolo: Protocolo;
  setProtocolo: React.Dispatch<React.SetStateAction<Protocolo>>;
}

const CreateProtocol: React.FC<CreateProtocolProps> = ({
  setOpenWindow,
  setCloseWindow,
  diagnostico,
  tratamento,
  protocolo,
  setProtocolo,
}) => {
  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <form className={styles.menuForm}>
          <div className={styles.menuHeader}>
            <button
              id="backBtn"
              style={{ display: "none" }}
              type="button"
              onClick={() => {
                Router.push("/menu");
              }}
            />
            <label htmlFor="backBtn" className={styles.backButton}>
              <BackIcon width={40} height={40} color="#333" />
            </label>
            <h1 className={styles.headerTitle}>Criar Protocolo</h1>
          </div>
          <div className={styles.sep}></div>
          <div className={styles.content}>
            <NovoProtocolForm
              setOpenWindow={setOpenWindow}
              setCloseWindow={setCloseWindow}
              diagnostico={diagnostico}
              tratamento={tratamento}
              prot={protocolo}
              onSave={setProtocolo}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProtocol;
