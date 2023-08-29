import React, { useState, useEffect } from "react";
import FormBox from "../FormBox";
import MenuFormContent from "./MenuForm/index";

interface MenuFormSectionProps {
  setWinCriarProt: React.Dispatch<React.SetStateAction<boolean>>;
  setFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuFormSectionProps> = ({
  setWinCriarProt,
  setFormVisibility
  }) => {
    return (
      <FormBox
        title="PROTOCOLOS"
        content={<MenuFormContent
                    setWinCriarProt={setWinCriarProt}
                    setFormVisibility={setFormVisibility}/>}
        showButton={false}
        setWinCriarProt={setWinCriarProt}
        setFormVisibility={setFormVisibility}
      />
    );
  };

export default Menu;