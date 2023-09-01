import SeoConfig from "@/components/SeoConfig";
import MenuForm from "@/components/MenuAdm/MenuForm/index";
import NovoProtForm from "@/components/MenuAdm/CriarProtocolo/index";

import Header from "@/components/Header";
import { useEffect, useState } from "react";

const MenuAdm = () => {
  const [ openWin, setOpenWin ] = useState("form");
  const [ closeWin, setCloseWin ] = useState("");

  const [ winCriarProt, setWinCriarProt ] = useState(false);
  const [ winCriarDiag, setWinCriarDiag ] = useState(false);
  const [ winMenu, setwinMenu ] = useState(true);

  const closeWindow = (window: string) => {
    switch (window) {
      case "menu":
        setwinMenu(false);
        break;
      case "novo_prot":
        setWinCriarProt(false);
        break;
      case "novo_diag":
        setWinCriarDiag(false);
        break;
    }
  };

  const openWindow = (window: string) => {
    switch (window) {
      case "menu":
        setwinMenu(true);
        break;
      case "novo_prot":
        setWinCriarProt(true);
        break;
      case "novo_diag":
        setWinCriarDiag(true);
        break;
    }
  };

  useEffect(() => {
    console.log("ABRIR ------>", openWin);
    openWindow(openWin);
  
    console.log("FECHAR ------>", closeWin);
    closeWindow(closeWin);

  }, [ openWin, closeWin ]);
  

  return (
    <div>
      <SeoConfig title="Menu" />
      <Header />

      {winMenu && (
        <MenuForm   
          setOpenWindow={setOpenWin}
          setCloseWindow={setCloseWin}
          windowName="menu"
        />
      )}
      {winCriarProt && (
        <NovoProtForm
          setOpenWindow={setOpenWin}
          setCloseWindow={setCloseWin}
          windowName="novo_prot"
        />
      )}
    </div>
  );
};

export default MenuAdm;
