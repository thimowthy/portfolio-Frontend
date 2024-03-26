import SeoConfig from "@/components/SeoConfig";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CriarProtocolo from "@/components/MenuAdm/CriarProt";
import CriarDiagnostico from "@/components/MenuAdm/CriarDiag";
import CriarTratamento from "@/components/MenuAdm/CriarTrat";
import Protocolo from "@/types/Protocolo";
import Diagnostico from "@/types/Diagnostico";
import Tratamento from "@/types/Tratamento";
import { defaultTratamento } from "@/components/MenuAdm/nodes/tratFlow";
import { defaultDiagnostico } from "@/components/MenuAdm/nodes/diagFlow";
import { defaultProtocolo } from "@/components/MenuAdm/nodes/protFlow";
import { useRouter } from "next/router";
import { ProtocoloDB } from "@/types/ProtocoloDB";


const Protocolo = () => {

  const router = useRouter();
  
  const [protocoloDB, setProtocoloDB] = useState<ProtocoloDB>();  
  const [protocolo, setProtocolo] = useState<Protocolo>();  
  const [diagnostico, setDiagnostico] = useState<Diagnostico>(defaultDiagnostico);
  const [tratamento, setTratamento] = useState<Tratamento>(defaultTratamento);

  const [openWin, setOpenWin] = useState("menu_prot");
  const [closeWin, setCloseWin] = useState("");

  const [winCriarTrat, setWinCriarTrat] = useState(false);
  const [winCriarDiag, setWinCriarDiag] = useState(false);
  const [winMenuProt, setwinMenuProt] = useState(true);

  useEffect(() => { // CRIAR NOVO PROTOCOLO
    if (router.query.protocolo) {
      const protocoloDB = JSON.parse(router.query.protocolo as string);
      const protocolo: Protocolo = JSON.parse(protocoloDB.descricao);
      setProtocoloDB(protocoloDB);
      setProtocolo(protocolo);
      setDiagnostico(protocolo.diagnostico);
      setTratamento(protocolo.tratamento);
    }
    else {
      setProtocoloDB({ id: 0, nome: "", efetivado:false, descricao: JSON.stringify(defaultProtocolo) });
      setProtocolo(defaultProtocolo);
      setDiagnostico(defaultDiagnostico);
      setTratamento(defaultTratamento);
    }
  }, [router.query.protocolo]);

  useEffect(() => {
    setProtocolo((protocolo) => ({
      ...protocolo!,
      diagnostico: diagnostico,
      tratamento: tratamento,
    }));
  }, [diagnostico, tratamento]);

  useEffect(() => {
    if (protocolo) {
      setProtocoloDB((protocoloDB) => ({
        ...protocoloDB!,
        descricao: JSON.stringify(protocolo),
      }));
    }
  }, [protocolo]);

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
  }, [openWin, closeWin]);

  return (
    <>
      {protocoloDB && (   
        <div>
          <SeoConfig title="Criar Protocolo" />
          <Header />
          {winMenuProt && (
            <CriarProtocolo
              setOpenWindow={setOpenWin}
              setCloseWindow={setCloseWin}
              windowName="menu_prot"
              protocolo={protocoloDB}
              edit={Boolean(router.query.protocolo)}
              setProtocolo={setProtocolo}
            />
          )}
          {winCriarDiag && (
            <CriarDiagnostico
              setOpenWindow={setOpenWin}
              setCloseWindow={setCloseWin}
              windowName="novo_diag"
              onDiagnosticoSubmit={setDiagnostico}
              diagnostico={diagnostico}
            />
          )}
          {winCriarTrat && (
            <CriarTratamento
              setOpenWindow={setOpenWin}
              setCloseWindow={setCloseWin}
              windowName="novo_trat"
              onTratamentoSubmit={setTratamento}
              tratamento={tratamento}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Protocolo;
