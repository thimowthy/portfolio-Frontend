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
  nf, // pendentes,
} // pendetes,
: any) {
  const [listaPacientes, setListaPacientes] = useState(pacientes);
  const [listaNf, setListaNf] = useState(nf);
  const [listaPendetes, setListaPendentes] = useState([]);
  const [idAtivo, setIdAtivo] = useState(0);
  const handleFilterPacientes = (busca: string) => {
    let pacientesFiltrados;
    const sanitizedBusca = busca.toLowerCase();
    if (busca.length > 0) {
      pacientesFiltrados = pacientes.filter(
        (paciente: Paciente) =>
          paciente?.nome?.toLowerCase().includes(sanitizedBusca) ||
          paciente?.numeroProntuario?.toLowerCase().includes(sanitizedBusca),
      );
      setListaPacientes(pacientesFiltrados);
    } else {
      setListaPacientes(pacientes);
    }
  };

  const handleFilterNf = (busca: string) => {
    let pacientesNfFiltrados;
    const sanitizedBusca = busca.toLowerCase();
    if (busca.length > 0) {
      pacientesNfFiltrados = nf.filter(
        (paciente: Paciente) =>
          paciente?.nome?.toLowerCase().includes(sanitizedBusca) ||
          paciente?.numeroProntuario?.toLowerCase().includes(sanitizedBusca),
      );
      setListaNf(pacientesNfFiltrados);
    } else {
      setListaNf(nf);
    }
  };

  // TODO: REPLACE [] TO PENDETES ARRAY AFTER BACK-END IS FINISHED
  const handleFilterPendentes = (busca: string) => {
    let pacientesPendentesFiltrados;
    const sanitizedBusca = busca.toLowerCase();
    if (busca.length > 0) {
      pacientesPendentesFiltrados = [].filter(
        (paciente: Paciente) =>
          paciente?.nome?.toLowerCase().includes(sanitizedBusca) ||
          paciente?.numeroProntuario?.toLowerCase().includes(sanitizedBusca),
      );
      setListaPendentes(pacientesPendentesFiltrados);
    } else {
      setListaPendentes([]);
    }
  };
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
        <div className="bg-[#DADADA] lista-pacientes_tab-content overflow-auto px-6">
          <TabContents tabId="tab-todos" active={true}>
            <div className="flex bg-white rounded-xl p-2 mt-5 mb-4">
              <div className="pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                className="block w-full focus:border-none active:border-none focus:outline-none"
                type="text"
                placeholder="Busque por nome ou prontuário do paciente"
                onChange={(e) => handleFilterPacientes(e.target.value)}
              />
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {listaPacientes?.map((paciente: Paciente) => (
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
            <div className="flex bg-white rounded-xl p-2 mt-5 mb-4">
              <div className="pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                className="block w-full focus:border-none active:border-none focus:outline-none"
                type="text"
                placeholder="Busque por nome ou prontuário do paciente"
                onChange={(e) => handleFilterPendentes(e.target.value)}
              />
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {listaPendetes?.map((paciente: Paciente) => (
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
            <div className="flex bg-white rounded-xl p-2 mt-5 mb-4">
              <div className="pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                className="block w-full focus:border-none active:border-none focus:outline-none"
                type="text"
                placeholder="Busque por nome ou prontuário do paciente"
                onChange={(e) => handleFilterNf(e.target.value)}
              />
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {listaNf?.map((paciente: Paciente) => (
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
