import { useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import good from "../../public/good.png";
import neutral from "../../public/neutral.png";
import bad from "../../public/bad.png";
import veryBad from "../../public/very_bad.png";
import febre from "../../public/termometro.png";

export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  const imageURL = (paciente: Paciente) => {
    if (paciente.neutropenia && paciente.neutropeniaFebril) {
      return veryBad;
    } else if (paciente.neutropeniaFebril) {
      return bad;
    } else if (paciente.neutropenia) {
      return neutral;
    }
    return good;
  };
  useEffect(() => {
    const init = async () => {
      const { Ripple, Tooltip, initTE } = await import("tw-elements");
      initTE({ Ripple, Tooltip });
    };
    init();
  }, []);
  return (
    <div>
      <>
        <ul
          className="flex list-none flex-row flex-wrap border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          <li role="presentation" className="bg-[#DADADA]">
            <a
              href="#tabs-todos"
              className="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent dark:text-neutral-400 default-tab"
              data-te-toggle="pill"
              data-te-target="#tabs-todos"
              data-te-nav-active
              role="tab"
              aria-controls="tabs-todos"
              aria-selected="true"
            >
              Paciente
            </a>
          </li>
        </ul>
        <div className="flex flex-col gap-x-6 py-5 px-6 bg-[#DADADA] detalhes-paciente">
          {paciente.prontuario && (
            <>
              <div className="flex gap-x-4 pb-3">
                <Image
                  className="h-12 w-12 flex-none rounded-full"
                  src={imageURL(paciente) || ""}
                  width="250"
                  height="250"
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-xl font-semibold leading-6 text-gray-900 align-middle">
                    {paciente.name}
                  </p>
                  {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Prontuário: {paciente.prontuario}
                </p> */}
                </div>
              </div>
              <hr />
              <div className="pt-2">
                <h1 className="text-2xl">
                  Dados do paciente{" "}
                  {paciente.neutropeniaFebril && (
                    <span className="float-right text-danger flex">
                      Neutropenia Febril{" "}
                      <Image
                        className="w-4 ml-4"
                        src={febre}
                        alt="Termômetro - Febre"
                      />
                    </span>
                  )}
                </h1>
              </div>
              <div className="flex gap-x-4 pt-4 pb-4">
                <div>
                  <p>CPF: {paciente.cpf}</p>
                  <p>Data de nascimento: {paciente.dataNascimento}</p>
                  <p>Cartão SUS: {paciente.cartaoSus}</p>
                </div>

                <div>
                  <p>Prontuário: {paciente.prontuario}</p>
                  <p>Leito: {paciente.leito}</p>
                  <p>Unidade: {paciente.unidade}</p>
                </div>
              </div>
              <hr />
              <div className="pt-2">
                <h1 className="text-2xl">Progresso do tratamento</h1>
                <div className="flex flex-row rounded-full bg-white mt-4">
                  <div className="basis-1/4 bg-yellow-800 py-2 pl-2 rounded-bl-full rounded-tl-full">
                    <p className="text-white">D0: 10/07/2023</p>
                  </div>
                </div>
                <div className="pt-2 flex flex-row gap-x-2">
                  <div className="basis-1/2">
                    <p>Data de admissão: {paciente.dataAdmissao}</p>
                    <div className="rounded-md bg-green-200 p-2 mt-4">
                      <p className="text-xl">
                        Prontuário {paciente.prontuario}
                      </p>
                      <div className="py-2">
                        <p className="text-lg pl-2">Comorbidades:</p>
                        <p className="text-sm pl-4">{paciente.comorbidades}</p>
                      </div>
                      <div className="py-2">
                        <p className="text-lg pl-2">
                          Última prescrição: {paciente.prescricao?.data}
                        </p>
                        {paciente.prescricao?.medicamentos.map(
                          (prescricao: any) => (
                            <p
                              key={prescricao.prontuario}
                              className="text-sm pl-4"
                            >
                              {prescricao.medicacao +
                                prescricao.dosagem +
                                prescricao.periodo}
                            </p>
                          ),
                        )}
                      </div>
                      <div className="flex justify-end">
                        <a href="#" className="text-right text-sm">
                          Ver prontuário completo
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="basis-1/2">
                    <div className="flex justify-center flex-col items-end text-center">
                      <div>
                        <p className="text-center">Neutrófilos:</p>
                        <p className="text-red-500"> {"< 500cells/mm3"} </p>
                        <div className="flex justify-center">
                          <div className={styles.grave}></div>
                        </div>

                        <button className="bg-white hover:bg-grery-700 text-grey font-bold py-2 px-4 rounded mt-3 drop-shadow-md">
                          Acessar +exames
                        </button>
                      </div>
                    </div>

                    <div>
                      <h1 className="text-xl flex">
                        Febre?{" "}
                        <span
                          className="text-xl"
                          data-te-toggle="tooltip"
                          data-te-html="true"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="Texto de teste"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#3FB8FC"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                        </span>
                      </h1>
                      <div className="flex mt-2">
                        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 px-10">
                          Não
                        </button>

                        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 px-10">
                          Sim
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
}
