import React from "react";
import FormBox from "../FormBox/index";
import TratFormContent from "./NovoTratForm/index";

interface CreateTratProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  windowName: string;
}

const CreateTrat: React.FC<CreateTratProps> = ({
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

export default CreateTrat;
