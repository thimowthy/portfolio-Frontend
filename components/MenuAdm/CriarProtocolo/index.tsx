import React from "react";
import styles from "./styles.module.css";
import BackIcon from "@/components/backIcon";
import FormBox from "../FormBox/index";
import ProtocolFormContent from "./NovoProtocoloForm";

interface CreateProtocolProps {
  setWinCriarProt: React.Dispatch<React.SetStateAction<boolean>>;
  setFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProtocol: React.FC<CreateProtocolProps> = ({
  setWinCriarProt,
  setFormVisibility
  }) => {
    return (
      <FormBox
        title="Criar Protocolo"
        content={<ProtocolFormContent />}
        showButton={true}
        setWinCriarProt={setWinCriarProt}
        setFormVisibility={setFormVisibility}
      />
    );
  };

export default CreateProtocol;
