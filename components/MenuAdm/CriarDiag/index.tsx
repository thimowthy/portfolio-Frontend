import React from "react";
import styles from "./styles.module.css";
import FormBox from "../FormBox/index";
import DiagFormContent from "./NovoDiagForm/index";

interface CreateDiagProps {
  closeWindow: React.Dispatch<React.SetStateAction<string>>;
  openWindow: React.Dispatch<React.SetStateAction<string>>;
}

const CreateDiag: React.FC<CreateDiagProps> = ({
  closeWindow,
  openWindow
  }) => {
    return (
      <FormBox
        title="Criar Diagnóstico"
        content={<DiagFormContent />}
        showButton={true}
        closeWindow={closeWindow}
        openWindow={openWindow}
      />
    );
  };

export default CreateDiag;
