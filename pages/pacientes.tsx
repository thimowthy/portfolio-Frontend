"use client";
import Header from "@/components/Header";
import SeoConfig from "@/components/SeoConfig";
import AddUser from "../public/add_user.svg";
import Image from "next/image";
import fetcher from "@/api/fetcher";
import Link from "next/link";
import { useEffect, useState } from "react";
import RowLoading from "@/components/SkeletonLoading/RowLoading";
import { tiposSanguineosMap } from "@/utils/maps";
import Swal from "sweetalert2";
import { AuthProvider } from "@/components/AuthProvider";

export default function Pacientes({
  listPacientes,
}: {
  listPacientes?: Paciente[];
}) {
  const [pacientes, setPacientes] = useState(listPacientes || []);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>();

  const loadPacientes = async () => {
    setPacientes([]);
    try {
      const pacientes = await fetcher({
        metodo: "GET",
        rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatients",
      });
      if (pacientes.length > 0) {
        pacientes.sort(function (a: any, b: any) {
          if (a.nome < b.nome) {
            return -1;
          }
          if (a.nome > b.nome) {
            return 1;
          }
          return 0;
        });
        setPacientes(pacientes);
        setPacientesFiltrados(pacientes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  const handleFilterPacientes = (busca: string) => {
    if (busca !== "") {
      let filtrados;
      let pacientesCopy = [...pacientes];
      const sanitizedBusca = busca.toLowerCase();
      if (busca.length > 0) {
        filtrados = pacientesCopy.filter(
          (paciente: Paciente) =>
            paciente?.nome?.toLowerCase().includes(sanitizedBusca) ||
            paciente?.numeroProntuario?.toLowerCase().includes(sanitizedBusca),
        );
        return setPacientesFiltrados(filtrados);
      }
      return setPacientesFiltrados(pacientes);
    }
    return setPacientesFiltrados(pacientes);
  };

  return (
    <>
      <SeoConfig title="Lista de pacientes" />
      <Header />
      <AuthProvider permission={["MEDICO"]} redirect="/dados-paciente">
        <div className="flex min-h-full min-w-full items-center">
          <div className="w-[100%] h-[80vh] mx-auto pt-6 px-7 bg-[#fff] rounded-lg flex flex-col relative">
            <div className="flex w-full justify-end mb-4 items-center ">
              <h1 className="mx-auto text-center font-bold text-2xl">
                Lista de Pacientes
              </h1>
              <div className="flex">
                <button
                  onClick={loadPacientes}
                  className="rounded-lg py-3 px-3 mr-3 bg-orange-500 text-[#fff] hover:bg-[#ED7C31] transition-colors"
                >
                  Atualizar
                </button>
                <Link
                  className="flex gap-3 box-border w-[250px] rounded-lg py-3 px-3 cursor-pointer bg-orange-500 text-[#fff] hover:bg-[#ED7C31] transition-colors"
                  href="/adicionar-paciente"
                >
                  <Image
                    src={AddUser}
                    alt="Adicionar Usuário"
                    className="invert"
                  />
                  Cadastrar novo paciente
                </Link>
              </div>
            </div>
            <div className="border p-4 border-gray-300 mb-8 rounded overflow-y-auto">
              <div className="relative overflow-x-auto">
                <div className="flex bg-white p-2 w-full mr-4 border border-gray-100">
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
                {!pacientesFiltrados || pacientesFiltrados?.length <= 0 ? (
                  <RowLoading />
                ) : (
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-900 border border-gray-100 mb-1">
                      <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">
                          Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                          CNS
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Data de nascimento
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Número de prontuário
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tipo sanguíneo
                        </th>
                      </tr>
                      <tr className="h-3"></tr>
                    </thead>
                    <tbody>
                      {pacientesFiltrados.map(
                        (paciente: Paciente, index: number) => (
                          <>
                            <tr
                              key={paciente.id}
                              className={
                                "focus:outline-none h-16 border border-gray-100 rounded"
                              }
                            >
                              <td
                                data-te-toggle="tooltip"
                                data-te-html="true"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                title="Editar"
                              >
                                <Link href={`/editar-paciente/${paciente.id}`}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 pl-1"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                </Link>
                              </td>
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                {paciente.nome}
                              </td>
                              <td className="px-6 py-4">{paciente.cns}</td>
                              <td className="px-6 py-4">
                                {paciente.dataNascimento}
                              </td>
                              <td className="px-6 py-4">
                                {paciente.numeroProntuario}
                              </td>
                              <td className="px-6 py-4">
                                {tiposSanguineosMap.get(paciente.tipoSanguineo)}
                              </td>
                            </tr>
                            <tr className="h-3"></tr>
                          </>
                        ),
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
