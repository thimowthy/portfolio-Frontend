import React from "react";
import FormBox from "../FormBox/index";
import DiagFormContent from "./NovoDiagForm/index";
import Diagnostico from "@/types/Diagnostico";

interface CreateDiagProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  windowName: string;
  onDiagnosticoSubmit:React.Dispatch<React.SetStateAction<Diagnostico>>;
}

const CreateDiag: React.FC<CreateDiagProps> = ({
  setOpenWindow,
  setCloseWindow,
  windowName,
  onDiagnosticoSubmit
  }) => {
    return (
      <FormBox
        title="Criar Diagnóstico"
        content={
          <DiagFormContent
            onDiagnosticoSubmit={onDiagnosticoSubmit}
          />
        }
        showButton={true}
        setOpenWindow={setOpenWindow}
        setCloseWindow={setCloseWindow}
        openWin="menu_prot"
        closeWin={windowName}
      />
    );
  };

export default CreateDiag;
