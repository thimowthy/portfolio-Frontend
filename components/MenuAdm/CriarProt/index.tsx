import React from "react";
import NovoProtocolForm from "./NovoProtocoloForm";
import styles from "./styles.module.css";
import BackIcon from "@/components/buttons/backIcon";
import Router from "next/router";
import Diagnostico from "@/types/Diagnostico";
import Tratamento from "@/types/Tratamento";
import Protocolo from "@/types/Protocolo";
import { ProtocoloDB } from "@/types/ProtocoloDB";

interface CreateProtocolProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  windowName: string;
  protocolo: ProtocoloDB;
  edit: Boolean;
  setProtocolo: React.Dispatch<React.SetStateAction<Protocolo | undefined>>;
}

const CreateProtocol: React.FC<CreateProtocolProps> = ({
  setOpenWindow,
  setCloseWindow,
  protocolo,
  edit,
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
              prot={protocolo}
              edit={edit}
              onSave={setProtocolo}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProtocol;
