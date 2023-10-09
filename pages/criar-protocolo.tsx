import SeoConfig from "@/components/SeoConfig";
import Diagnostico from "@/types/Diagnostico";
import Tratamento from "@/types/Tratamento";
import CriarProtocolo from "@/components/MenuAdm/CriarProt";
import CriarDiagnostico from "@/components/MenuAdm/CriarDiag";
import CriarTratamento from "@/components/MenuAdm/CriarTrat";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { defaultTratamento } from "@/components/MenuAdm/nodes/tratFlow";
import { defaultDiagnostico } from "@/components/MenuAdm/nodes/diagFlow";
import { defaultProtocolo } from "@/components/MenuAdm/nodes/protFlow";
import Protocolo from "@/types/Protocolo";

const Protocolo = () => {
    
  const [ diagnostico, setDiagnostico ] = useState<Diagnostico>(defaultDiagnostico);
  const [ tratamento, setTratamento ] = useState<Tratamento>(defaultTratamento);
  const [ protocolo, setProtocolo ] = useState<Protocolo>(defaultProtocolo);

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
  
  useEffect(() => {
    //console.log(protocolo);
  }, [ protocolo ]);

  return (
      <div>
        <SeoConfig title="Criar Protocolo" />
        <Header />
        { winMenuProt && (
        <CriarProtocolo
          setOpenWindow={setOpenWin}
          setCloseWindow={setCloseWin}
          windowName="menu_prot"
          diagnostico={diagnostico}
          tratamento={tratamento}
          protocolo={protocolo}
          setProtocolo={setProtocolo}
        />)}
        { winCriarDiag && (
        <CriarDiagnostico
          setOpenWindow={setOpenWin}
          setCloseWindow={setCloseWin}
          windowName="novo_diag"
          onDiagnosticoSubmit={setDiagnostico}
        />)}
        { winCriarTrat && (
        <CriarTratamento
          setOpenWindow={setOpenWin}
          setCloseWindow={setCloseWin}
          windowName="novo_trat"
          onTratamentoSubmit={setTratamento}
        />)}
      </div>
  );
};

export default Protocolo;
