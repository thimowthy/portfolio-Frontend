import React, { useEffect, useRef, useState } from "react";
import TabList from "../TabList";
import TabItem from "../TabItem";
import TabContents from "../TabContents/index";
import ExamesList from "../ExameList";
import SintomasForm from "../Sintomas";
import PacienteTab from "../PacienteTab";
import HistoricoTratamentoList from "../HistoricoTratamento";
import PrescricaoForm from "../Prescricao";

/**
 * Renderiza o a página de detalhes do paciente.
 * @category Component
 */

const pageStyles = {
  tabItem:
    "block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-200 focus:isolate focus:border-transparent dark:text-[#16161D] hover:bg-gray-200 default-tab rounded-lg",
  tabContentDiv:
    "flex mx-1 flex-col gap-x-6 py-5 px-6 bg-[#EAEAEA] detalhes-paciente",
};

export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  const prescricaoTabRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState("tabs-neutral");

  const handleTabSelect = (selectedRef: string | React.ReactNode) => {
    setActiveTab(selectedRef as string);
  };

  useEffect(() => {
    const element = prescricaoTabRef.current;
    console.log(element);
  }, [prescricaoTabRef]);

  return (
    <div>
      <>
        <TabList className="flex list-none flex-row flex-wrap border-b-0 pl-0 -mb-1.5 relative">
          <TabItem
            href="tabs-neutral"
            className={pageStyles.tabItem}
            title="Paciente"
            selected={activeTab === "tabs-neutral"}
            disabled={!paciente || !paciente.id}
            onSelect={handleTabSelect}
          />
          <TabItem
            href="tabs-exames"
            className={pageStyles.tabItem}
            title="Exames"
            selected={activeTab === "tabs-exames"}
            disabled={!paciente || !paciente.id}
            onSelect={handleTabSelect}
          />
          <TabItem
            href="tabs-sintomas"
            className={pageStyles.tabItem}
            title="Sintomas"
            selected={activeTab === "tabs-sintomas"}
            disabled={!paciente || !paciente.id}
            onSelect={handleTabSelect}
          />
          <li role="presentation">
            <a
              href={"#tabs-prescricao"}
              className={`${pageStyles.tabItem}  ${
                !paciente || !paciente.id ? "disabled" : ""
              } ${
                activeTab === "tabs-prescricao"
                  ? "data-[te-nav-active]:bg-[#EAEAEA]"
                  : ""
              }`}
              data-te-toggle="pill"
              data-te-target={"#tabs-prescricao"}
              role="tab"
              aria-controls={"#tabs-prescricao"}
              data-te-nav-active={activeTab === "tabs-prescricao"}
              aria-selected={!paciente || !paciente.id || undefined}
              onClick={() => setActiveTab("tabs-prescricao")}
              ref={(el) => {
                prescricaoTabRef.current = el;
              }}
            >
              Prescrição
            </a>
          </li>
          <TabItem
            href="tabs-historico"
            className={pageStyles.tabItem}
            title="Histórico"
            selected={activeTab === "tabs-historico"}
            disabled={!paciente || !paciente.id}
            onSelect={handleTabSelect}
          />
        </TabList>
        <div
          id="contents"
          className="bg-[#EAEAEA] relative rounded-b-xl overflow-y-auto rounded-tr-xl"
        >
          <div className="overflow-y-auto">
            {activeTab === "tabs-neutral" && (
              <TabContents
                tabId="tabs-neutral"
                active={activeTab === "tabs-neutral"}
              >
                <PacienteTab paciente={paciente} />
              </TabContents>
            )}
            {activeTab === "tabs-exames" && (
              <TabContents
                tabId="tabs-exames"
                active={activeTab === "tabs-exames"}
              >
                <div className={pageStyles.tabContentDiv}>
                  <ExamesList id={paciente.id?.toString() || ""} />
                </div>
              </TabContents>
            )}
            {activeTab === "tabs-sintomas" && (
              <TabContents
                tabId="tabs-sintomas"
                active={activeTab === "tabs-sintomas"}
              >
                <div className={pageStyles.tabContentDiv}>
                  <SintomasForm
                    id={paciente.id?.toString() || ""}
                    prescricaoTabRef={prescricaoTabRef}
                  />
                </div>
              </TabContents>
            )}
            {activeTab === "tabs-prescricao" && (
              <TabContents
                tabId="tabs-prescricao"
                active={activeTab === "tabs-prescricao"}
              >
                <PrescricaoForm id={paciente.id?.toString() || ""} />
              </TabContents>
            )}
            {activeTab === "tabs-historico" && (
              <TabContents
                tabId="tabs-historico"
                active={activeTab === "tabs-historico"}
              >
                <div className={pageStyles.tabContentDiv}>
                  <HistoricoTratamentoList id={paciente.id?.toString() || ""} />
                </div>
              </TabContents>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
