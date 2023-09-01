"use client";
import { useState } from "react";
import TabItem from "../TabItem/index";
import TabContents from "../TabContents/index";

export default function TabDadosPaciente({
  pacientes,
  setSelectedPatient,
}: any) {
  const [idAtivo, setIdAtivo] = useState(0);
  /**
   * Função para selecionar um paciente da lista para exibir os detalhes.
   * @param {Paciente} paciente - Paciente selecionado
   * @returns {void} seta no estado da aplicação o paciente selecionado assim como seu ID ativo.
   */
  const selectPatient = (paciente: Paciente) => {
    setIdAtivo(paciente?.id || 0);
    setSelectedPatient(paciente);
  };
  return (
    <>
      <div className="lista-pacientes">
        <div className="flex justify-center space-x-2"></div>
        <ul
          className="flex list-none flex-row flex-wrap border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          <TabItem
            href="#tabs-todos"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent  dark:text-neutral-400 default-tab"
            title="Todos"
          />
          <TabItem
            href="#tabs-pendentes"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent  dark:text-neutral-400 default-tab"
            title="Pendentes"
          />
          <TabItem
            href="#tabs-NF"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent  dark:text-neutral-400 default-tab"
            title="NF"
          />
        </ul>
        <div className="bg-[#DADADA] lista-pacientes_tab-content overflow-auto px-2 ">
          <TabContents
            pacientes={pacientes}
            idAtivo={idAtivo}
            selectPatient={selectPatient}
            tabId="tabs-todos"
          />
        </div>
      </div>
    </>
  );
}
