import React from "react";
import FormBox from "../FormBox/index";
import TratFormContent from "./NovoTratForm/index";

interface CreateDiagProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  windowName: string;
}

const CreateDiag: React.FC<CreateDiagProps> = ({
  setOpenWindow,
  setCloseWindow,
  windowName
  }) => {
    return (
      <FormBox
        title="Criar Tratamento"
        content={<TratFormContent />}
        showButton={true}
        setOpenWindow={setOpenWindow}
        setCloseWindow={setCloseWindow}
        openWin="menu_prot"
        closeWin={windowName}
      />
    );
  };

export default CreateDiag;
