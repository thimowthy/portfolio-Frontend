import React, { useState, useEffect } from "react";
import FormBox from "../FormBox";
import MenuFormContent from "./MenuForm/index";

interface MenuFormSectionProps {
  setOpenWindow: React.Dispatch<React.SetStateAction<string>>;
  setCloseWindow: React.Dispatch<React.SetStateAction<string>>;
  windowName: string;
}

const Menu: React.FC<MenuFormSectionProps> = ({
  setOpenWindow,
  setCloseWindow,
  windowName
  }) => {
    return (
      <FormBox
        title="PROTOCOLOS"
        content={
          <MenuFormContent
            setOpenWindow={setOpenWindow}
            setCloseWindow={setCloseWindow}
          />
        }
        showButton={false}
        setOpenWindow={setOpenWindow}
        setCloseWindow={setCloseWindow}
        openWin=""
        closeWin=""
      />
    );
  };

export default Menu;