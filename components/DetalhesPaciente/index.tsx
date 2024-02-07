import { useEffect, useState } from "react";
import Image from "next/image";
import TabList from "../TabList";
import TabItem from "../TabItem";
import TabContents from "../TabContents/index";
import ExamesList from "../ExameList";
import Link from "next/link";
import useServerityIcon from "@/hooks/useSeverityIcon";
import SintomasForm from "../Sintomas";
import PacienteTab from "../PacienteTab";
import fetcher from "@/api/fetcher";
import HistoricoTratamentoList from "../HistoricoTratamento";
import PrescricaoForm from "../Prescricao";
/**
 * Renderiza o a página de detalhes do paciente.
 * @category Component
 */

const pageStyles = {
  tabItem:
    "block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-200 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#EAEAEA] rounded-lg",
  tabContentDiv:
    "flex mx-1 flex-col gap-x-6 py-5 px-6 bg-[#EAEAEA] detalhes-paciente",
};

export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  const [temperatura, setTemperatura] = useState<number>(36.5);

  const [internamento, setInternamento] = useState<Internacao>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internamento = await fetcher({
          metodo: "GET",
          rota: `/Internacao/GetInternacaoAtual?pacienteId=${paciente.id}`,
        });
        setInternamento(internamento);
      } catch (error) {}
    };
    if (paciente.id) fetchData();
  }, [paciente]);

  const enviarTemperatura = async () => {
    try {
      const response = await fetcher({
        metodo: "POST",
        rota: `/Internacao/CadastrarTemperatura/${paciente.id}`,
        cabecalho: { "Content-Type": "application/json" },
        body: JSON.stringify({ temperatura: temperatura }),
      });
      if (response.ok) {
        //console.log("foi");
      } else {
        //console.log(" nfoi");
      }
    } catch (error) {
      //console.log("n foi");
    }
  };

  return (
    <div>
      <>
        <TabList className="flex list-none flex-row flex-wrap border-b-0 pl-0 -mb-1.5 relative z-0">
          <TabItem
            href="tabs-neutral"
            className={pageStyles.tabItem}
            title="Paciente"
            active={true}
            disabled={!paciente || !paciente.id}
          />
          <TabItem
            href="tabs-exames"
            className={pageStyles.tabItem}
            title="Exames"
            disabled={!paciente || !paciente.id}
          />
          <TabItem
            href="tab-sintomas"
            className={pageStyles.tabItem}
            title="Sintomas"
            disabled={!paciente || !paciente.id}
          />
          <TabItem
            href="tab-prescricao"
            className={pageStyles.tabItem}
            title="Prescrição"
            disabled={!paciente || !paciente.id}
          />
          <TabItem
            href="tab-historico"
            className={pageStyles.tabItem}
            title="Histórico"
            disabled={!paciente || !paciente.id}
          />
        </TabList>
        <div
          id="contents"
          className="bg-[#EAEAEA] relative rounded-b-xl overflow-y-auto rounded-tr-xl px-1 z-1"
        >
          <div className="overflow-y-auto">
            <TabContents tabId="tabs-neutral" active={true}>
              <PacienteTab paciente={paciente} />
            </TabContents>
            <TabContents tabId="tabs-exames" active={false}>
              <div className={pageStyles.tabContentDiv}>
                <ExamesList id={paciente.id?.toString() || ""} />
              </div>
            </TabContents>
            <TabContents tabId="tab-sintomas" active={false}>
              <div className={pageStyles.tabContentDiv}>
                <SintomasForm id={paciente.id?.toString() || ""} />
              </div>
            </TabContents>
            <TabContents tabId="tab-prescricao" active={false}>
              <PrescricaoForm id={paciente.id?.toString() || ""} />
            </TabContents>
            <TabContents tabId="tab-historico" active={false}>
              <div className={pageStyles.tabContentDiv}>
                <HistoricoTratamentoList id={paciente.id?.toString() || ""} />
              </div>
            </TabContents>
          </div>
        </div>
      </>
    </div>
  );
}
