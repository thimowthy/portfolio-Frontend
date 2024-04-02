"use client";
import { useState, useEffect, MouseEventHandler, useRef } from "react";
import TabItem from "../TabItem/index";
import TabContents from "../TabContents/index";

import { Tab, initTE } from "tw-elements";
import TabList from "../TabList";
import ItemListaPaciente from "../ItemListaPaciente";
import router from "next/router";
import { useAuthRole } from "@/hooks/useAuthRole";

initTE({ Tab });

export default function TabDadosPaciente({
  pacientes,
  listaPacientes,
  setSelectedPatient,
  nf,
  loadPacientes,
  setNf,
  listaNf,
  setPacientes,
}: {
  pacientes: Paciente[];
  listaPacientes: Paciente[];
  nf: Paciente[];
  loadPacientes: MouseEventHandler<HTMLButtonElement>;
  setNf: Function;
  listaNf?: Paciente[];
  setPacientes: Function;
  setSelectedPatient: Function;
}) {
  const [idAtivo, setIdAtivo] = useState(0);
  const [activeTab, setActiveTab] = useState("tab-todos");

  const inputPacienteRef = useRef<HTMLInputElement>(null);

  const handleTabSelect = (selectedRef: string | React.ReactNode) => {
    setActiveTab(selectedRef as string);
  };
  const authRole = useAuthRole();
  const cargo = authRole?.cargo || "";

  const handleFilterPacientes = (busca: string) => {
    const sanitizedBusca = busca.toLowerCase();
    setPacientes(
      sanitizedBusca.length === 0
        ? listaPacientes
        : listaPacientes.filter(
            (paciente: Paciente) =>
              paciente?.nome?.toLowerCase().includes(sanitizedBusca) ||
              paciente?.numeroProntuario
                ?.toLowerCase()
                .includes(sanitizedBusca),
          ),
    );
  };

  const handleFilterNf = (busca: string) => {
    const sanitizedBusca = busca.toLowerCase();
    setNf(
      sanitizedBusca.length === 0
        ? listaNf
        : listaNf?.filter(
            (paciente: Paciente) =>
              paciente?.nome?.toLowerCase().includes(sanitizedBusca) ||
              paciente?.numeroProntuario
                ?.toLowerCase()
                .includes(sanitizedBusca),
          ),
    );
  };

  const onRefresh = (e: any) => {
    loadPacientes(e);
    setNf(listaNf);
    setPacientes(listaPacientes);
    inputPacienteRef.current && (inputPacienteRef.current.value = "");
  };

  /**
   * Função para selecionar um paciente da lista para exibir os detalhes.
   * @param {Paciente} paciente - Paciente selecionado
   * @returns {void} seta no estado da aplicação o paciente selecionado assim como seu ID ativo.
   */
  const selectPatient = (paciente: Paciente) => {
    setIdAtivo(paciente?.id);
    setSelectedPatient(paciente);
  };
  return (
    <>
      <div className="lista-pacientes">
        <div className="flex justify-center space-x-2"></div>
        <TabList className="flex list-none flex-row flex-wrap border-b-0 pl-0 -mb-1.5 relative z-0">
          <TabItem
            href="tab-todos"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab rounded-lg"
            title="Todos"
            selected={activeTab === "tab-todos"}
            onSelect={handleTabSelect}
            disabled={false}
          />
          <TabItem
            href="tab-NF"
            className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-gray-300 focus:isolate focus:border-transparent dark:text-[#16161D] default-tab rounded-lg"
            title="Neutropenia Febril"
            selected={activeTab === "tab-NF"}
            onSelect={handleTabSelect}
            disabled={false}
          />
        </TabList>
        <div className="bg-[#EAEAEA] lista-pacientes_tab-content overflow-y-auto px-6 relative rounded-b-xl rounded-tr-xl py-2 z-1">
          <div className="overflow-y-auto">
            <TabContents tabId="tab-todos" active={true}>
              <div className="flex mx-1 items-center mt-5 mb-4">
                <div className="flex bg-white rounded-xl p-2 w-full mr-4">
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
                    ref={inputPacienteRef}
                  />
                </div>
                {cargo && cargo === "MEDICO" && (
                  <button
                    className="ml-auto font-bold w-8 h-8 px-4 rounded-full flex text-xl text-white justify-center bg-orange-500"
                    type="button"
                    title="Adicionar paciente"
                    onClick={() => {
                      router.push("/adicionar-paciente");
                    }}
                  >
                    <span>+</span>
                  </button>
                )}
                <button
                  className="mr-auto ml-2 font-bold w-8 h-8 px-4 rounded-full flex text-xl text-white justify-center bg-orange-500 items-center"
                  type="button"
                  title="Atualizar pacientes"
                  onClick={onRefresh}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
                    </svg>
                  </span>
                </button>
              </div>
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

            <TabContents tabId="tab-NF" active={false}>
              <div className="flex mx-1 bg-white rounded-xl p-2 mt-5 mb-4">
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
      </div>
    </>
  );
}
