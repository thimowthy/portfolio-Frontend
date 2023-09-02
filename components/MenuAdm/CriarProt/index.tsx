import React from "react";
import ProtocolFormContent from "./NovoProtocoloForm";
import styles from "./styles.module.css";
import BackIcon from "@/components/backIcon";
import Router from "next/router";

interface CreateProtocolProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  windowName: string;
}

const CreateProtocol: React.FC<CreateProtocolProps> = ({
  setOpenWindow,
  setCloseWindow,
  windowName
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
            {<ProtocolFormContent
              setOpenWindow={setOpenWindow}
              setCloseWindow={setCloseWindow}
            />}
          </div>
        </form>
      </div>
      {/* <FormBox
          title="Criar Protocolo"
          content={<ProtocolFormContent
            setOpenWindow={setOpenWindow}
            setCloseWindow={setCloseWindow} />}
          showButton={true}
          setOpenWindow={setOpenWindow}
          setCloseWindow={setCloseWindow}
          openWin="menu"
          closeWin={windowName}
          />
        */}
          
        </>
    );
  };

export default CreateProtocol;
