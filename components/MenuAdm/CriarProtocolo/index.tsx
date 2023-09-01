import React from "react";
import FormBox from "../FormBox/index";
import ProtocolFormContent from "./NovoProtocoloForm";

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
      <FormBox
        title="Criar Protocolo"
        content={<ProtocolFormContent />}
        showButton={true}
        setOpenWindow={setOpenWindow}
        setCloseWindow={setCloseWindow}
        openWin="menu"
        closeWin={windowName}
      />
    );
  };

export default CreateProtocol;
