'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import febre from '../../public/termometro.png';
import medicamento from '../../public/medicamento.png';

export default function TabDadosPaciente({
  pacientes,
  setSelectedPatient
}: any) {
  useEffect(() => {
    const init = async () => {
      const { Tab, initTE } = await import('tw-elements');
      initTE({ Tab });
    };
    init();
  }, []);

  return (
    <>
      {/* TODO: dividir em componentes separados */}
      <div className="lista-pacientes">
        <ul
          className="flex list-none flex-row flex-wrap border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          <li role="presentation" className="bg-white">
            <a
              href="#tabs-todos"
              className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target="#tabs-todos"
              data-te-nav-active
              role="tab"
              aria-controls="tabs-todos"
              aria-selected="true"
            >
              Todos
            </a>
          </li>
          <li role="presentation" className="bg-white">
            <a
              href="#tabs-pendentes"
              className="focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target="#tabs-pendentes"
              role="tab"
              aria-controls="tabs-pendentes"
              aria-selected="false"
            >
              Pendentes
            </a>
          </li>
          <li role="presentation" className="bg-white">
            <a
              href="#tabs-NF"
              className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target="#tabs-NF"
              role="tab"
              aria-controls="tabs-NF"
              aria-selected="false"
            >
              NF
            </a>
          </li>
        </ul>

        <div className="px-6 bg-white lista-pacientes_tab-content overflow-auto">
          <div
            className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-todos"
            role="tabpanel"
            aria-labelledby="tabs-todos-tab"
            data-te-tab-active
          >
            <ul role="list" className="divide-y divide-gray-100">
              {pacientes.map((paciente: Paciente) => (
                <li
                  key={paciente.prontuario}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex gap-x-4">
                    <Image
                      className="h-24 w-24 flex-none rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      width="250"
                      height="250"
                      alt="Estado do paciente"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900 text-2xl">
                        {paciente.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
                        Prontuário: {paciente.prontuario}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-center">
                    <Image
                      className="h-12 w-auto flex-none rounded-full"
                      src={paciente?.neutropeniaFebril ? febre : medicamento}
                      alt=""
                      width="50"
                      height="50"
                    />
                    <button
                      className="bg-blue-700 hover:bg-blue-900 px-5 mt-4 py-1 text-sm leading-5 rounded-full font-semibold text-white"
                      onClick={() => setSelectedPatient(paciente)}
                    >
                      Ver paciente
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-pendentes"
            role="tabpanel"
            aria-labelledby="tabs-pendentes-tab"
          >
            Conteúdo
          </div>
          <div
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-NF"
            role="tabpanel"
            aria-labelledby="tabs-NF-tab"
          >
            Tab 3 content
          </div>
        </div>
      </div>
    </>
  );
}
