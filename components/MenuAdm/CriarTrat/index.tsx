import React from "react";
import FormBox from "../FormBox/index";
import TratFormContent from "./NovoTratForm/index";
import Tratamento from "@/types/Tratamento";

interface CreateTratProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  windowName: string;
  onTratamentoSubmit: React.Dispatch<React.SetStateAction<Tratamento>>;
  tratamento: Tratamento;
}

const CreateTrat: React.FC<CreateTratProps> = ({
  setOpenWindow,
  setCloseWindow,
  windowName,
  onTratamentoSubmit,
  tratamento
  }) => {
    return (
      <FormBox
        title="Criar Tratamento"
        content={
        <TratFormContent 
          onTratamentoSubmit={onTratamentoSubmit}
          trat={tratamento}
        />}
        showButton={true}
        setOpenWindow={setOpenWindow}
        setCloseWindow={setCloseWindow}
        openWin="menu_prot"
        closeWin={windowName}
      />
    );
  };

export default CreateTrat;
