"use client";
import { useState, useEffect } from "react";
import TabItem from "../TabItem/index";
import TabContents from "../TabContents/index";

import { Tab, initTE } from "tw-elements";
import TabList from "../TabList";
import ItemListaPaciente from "../ItemListaPaciente";

initTE({ Tab });

export default function TabDadosPaciente({
  pacientes,
  setSelectedPatient,
  nf,
} // pendentes,
: any) {
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
        <TabList className="flex list-none flex-row flex-wrap border-b-0 pl-0">
          <TabItem
            href="tab-todos"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]"
            title="Todos"
            active={true}
          />
          <TabItem
            href="tab-pendentes"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]"
            title="Pendentes"
          />
          <TabItem
            href="tab-NF"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab data-[te-nav-active]:bg-[#DADADA]"
            title="NF"
          />
        </TabList>
        <div className="bg-[#DADADA] lista-pacientes_tab-content overflow-auto px-2 ">
          <TabContents tabId="tab-todos" active={true}>
            <ul role="list" className="divide-y divide-gray-100">
              {pacientes?.map((paciente: Paciente) => (
                <ItemListaPaciente
                  paciente={paciente}
                  idAtivo={idAtivo}
                  selectPatient={selectPatient}
                  key={paciente.id}
                />
              ))}
            </ul>
          </TabContents>

          <TabContents tabId="tab-pendentes" active={false}>
            <ul role="list" className="divide-y divide-gray-100">
              {[]?.map((paciente: Paciente) => (
                <ItemListaPaciente
                  paciente={paciente}
                  idAtivo={idAtivo}
                  selectPatient={selectPatient}
                  key={paciente.id}
                />
              ))}
            </ul>
          </TabContents>

          <TabContents tabId="tab-NF" active={false}>
            <ul role="list" className="divide-y divide-gray-100">
              {nf?.map((paciente: Paciente) => (
                <ItemListaPaciente
                  paciente={paciente}
                  idAtivo={idAtivo}
                  selectPatient={selectPatient}
                  key={paciente.id}
                />
              ))}
            </ul>
          </TabContents>
        </div>
      </div>
    </>
  );
}
