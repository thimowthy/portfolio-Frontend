"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import fetcher from "@/api/fetcher";
import styles from "./styles.module.css";
import febreImg from "../../public/termometro.png";
import medicamento from "../../public/medicamento.png";
import good from "../../public/good.png";
import neutral from "../../public/neutral.png";
import bad from "../../public/bad.png";
import veryBad from "../../public/very_bad.png";

export default function TabDadosPaciente({
  pacientes,
  setSelectedPatient,
}: any) {
  const [error, setError] = useState(false);
  const [idAtivo, setIdAtivo] = useState(0);
  useEffect(() => {
    const init = async () => {
      const { Tab, initTE } = await import("tw-elements");
      initTE({ Tab });
    };
    init();

    const fetchTest = async () => {
      try {
        const result = await fetcher(
          "https://api.publicapis.org/entries",
          "GET",
          "{'teste': 'teste'}",
          "",
        );
      } catch (error) {
        //TODO: adicionar lógica para o erro de acordo com o tipo de erro ou página
      }
    };
    fetchTest();
  }, []);

  const selectPatient = (paciente: Paciente) => {
    setIdAtivo(paciente?.id || 0);
    setSelectedPatient(paciente);
  };

  const mostrarIcone = (paciente: Paciente) => {
    const neutropenico =
      paciente?.situacoesPaciente?.length > 0 &&
      paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
        ? paciente?.situacoesPaciente[0]?.diagnosticos[0].neutropenico
        : false;
    const febre =
      paciente?.situacoesPaciente?.length > 0 &&
      paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
        ? paciente?.situacoesPaciente[0]?.diagnosticos[0].febre
        : false;
    if (neutropenico && febre) {
      return (
        <div className="flex">
          <Image
            className="h-12 w-auto flex-none rounded-full"
            src={febreImg}
            alt=""
            width="50"
            height="50"
          />
          <Image
            className="h-12 w-auto flex-none rounded-full ml-4"
            src={medicamento}
            alt=""
            width="50"
            height="50"
          />
        </div>
      );
    } else if (neutropenico) {
      return (
        <Image
          className="h-12 w-auto flex-none rounded-full"
          src={medicamento}
          alt=""
          width="50"
          height="50"
        />
      );
    } else if (febre) {
      return (
        <Image
          className="h-12 w-auto flex-none rounded-full"
          src={febreImg}
          alt=""
          width="50"
          height="50"
        />
      );
    }
    return;
  };

  const imageURL = (paciente: Paciente) => {
    const neutropenico =
      paciente?.situacoesPaciente?.length > 0 &&
      paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
        ? paciente?.situacoesPaciente[0]?.diagnosticos[0].neutropenico
        : false;
    const febre =
      paciente?.situacoesPaciente?.length > 0 &&
      paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
        ? paciente?.situacoesPaciente[0]?.diagnosticos[0].febre
        : false;
    if (neutropenico && febre) {
      return veryBad;
    } else if (neutropenico) {
      return bad;
    } else if (febre) {
      return neutral;
    }
    return good;
  };

  return (
    <>
      {/* TODO: dividir em componentes separados */}
      <div className="lista-pacientes">
        <div className="flex justify-center space-x-2"></div>
        <ul
          className="flex list-none flex-row flex-wrap border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          <li role="presentation" className="bg-[#DADADA]">
            <a
              href="#tabs-todos"
              className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent  dark:text-neutral-400 default-tab"
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
          <li role="presentation" className="bg-[#DADADA]">
            <a
              href="#tabs-pendentes"
              className="focus:border-transparent block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate  dark:text-neutral-400 default-tab disabled"
              data-te-toggle="pill"
              data-te-target="#tabs-pendentes"
              role="tab"
              aria-controls="tabs-pendentes"
              aria-selected="false"
            >
              Pendentes
            </a>
          </li>
          <li role="presentation" className="bg-[#DADADA]">
            <a
              href="#tabs-NF"
              className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent  dark:text-neutral-400 default-tab disabled"
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

        <div className="bg-[#DADADA] lista-pacientes_tab-content overflow-auto px-2 ">
          <div
            className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-todos"
            role="tabpanel"
            aria-labelledby="tabs-todos-tab"
            data-te-tab-active
          >
            <ul role="list" className="divide-y divide-gray-100">
              {pacientes?.map((paciente: Paciente) => (
                <li
                  key={paciente.id}
                  className={`flex justify-between gap-x-6 py-5 px-4 my-2 bg-[#E1ECEA]   ${
                    paciente?.id == idAtivo ? styles.card_prontuario_ativo : ""
                  }
                  `}
                >
                  <div className="flex gap-x-4">
                    {
                      <Image
                        className="h-24 w-24 flex-none rounded-full"
                        src={imageURL(paciente)}
                        width="250"
                        height="250"
                        alt="Estado do paciente"
                      />
                    }
                    <div className="min-w-0 flex-auto">
                      <p className="text-xl font-semibold leading-6 text-gray-900 text-2xl">
                        {paciente.nome}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
                        {/* Prontuário: {paciente.id} */}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-center justify-end">
                    {mostrarIcone(paciente)}
                    <button
                      className="bg-blue-700 hover:bg-blue-900 px-5 mt-4 py-1 text-sm leading-5 rounded-lg font-semibold text-white"
                      onClick={() => selectPatient(paciente)}
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
