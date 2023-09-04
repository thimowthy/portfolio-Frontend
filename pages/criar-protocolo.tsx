import SeoConfig from "@/components/SeoConfig";
import CriarProtocolo from "@/components/MenuAdm/CriarProt";
import CriarDiagnostico from "@/components/MenuAdm/CriarDiag";
import CriarTratamento from "@/components/MenuAdm/CriarTrat";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

const LoginPage = () => {
    
  const [ openWin, setOpenWin ] = useState("menu_prot");
  const [ closeWin, setCloseWin ] = useState("");

  const [ winCriarTrat, setWinCriarTrat ] = useState(false);
  const [ winCriarDiag, setWinCriarDiag ] = useState(false);
  const [ winMenuProt, setwinMenuProt ] = useState(true);

  const closeWindow = (window: string) => {
    switch (window) {
      case "menu_prot":
        setwinMenuProt(false);
        break;
      case "novo_diag":
        setWinCriarDiag(false);
        break;
      case "novo_trat":
        setWinCriarTrat(false);
        break;
    }
  };

  const openWindow = (window: string) => {
    switch (window) {
      case "menu_prot":
        setwinMenuProt(true);
        break;
      case "novo_diag":
        setWinCriarDiag(true);
        break;
      case "novo_trat":
        setWinCriarTrat(true);
        break;
    }
  };

  useEffect(() => {
    openWindow(openWin);
    closeWindow(closeWin);

  }, [ openWin, closeWin ]);

  return (
      <div>
        <SeoConfig title="Criar Protocolo" />
        <Header />
        { winMenuProt && (
        <CriarProtocolo
          setOpenWindow={setOpenWin}
          setCloseWindow={setCloseWin}
          windowName="menu_prot"
        />)}
        { winCriarDiag && (
        <CriarDiagnostico
          setOpenWindow={setOpenWin}
          setCloseWindow={setCloseWin}
          windowName="novo_diag"
        />)}
        { winCriarTrat && (
        <CriarTratamento
          setOpenWindow={setOpenWin}
          setCloseWindow={setCloseWin}
          windowName="novo_trat"
        />)}
      </div>
  );
};

export default LoginPage;
