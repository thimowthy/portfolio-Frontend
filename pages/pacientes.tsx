"use client";
import Header from "@/components/Header";
import SeoConfig from "@/components/SeoConfig";
import AddUser from "../public/add_user.svg";
import Image from "next/image";
import fetcher from "@/api/fetcher";
import Link from "next/link";
import { useState } from "react";
import RowLoading from "@/components/SkeletonLoading/RowLoading";
import { tiposSanguineosMap } from "@/utils/maps";
import Swal from "sweetalert2";

export default function Pacientes({
  listPacientes,
}: {
  listPacientes?: Paciente[];
}) {
  const [pacientes, setPacientes] = useState(listPacientes || []);

  const [loading, setLoading] = useState(false);

  const loadPacientes = async () => {
    setPacientes([]);
    try {
      const pacientes = await fetcher({
        metodo: "GET",
        rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatients",
      });
      if (pacientes.length > 0) {
        setPacientes(pacientes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePaciente = async (id: any) => {
    try {
      Swal.showLoading();
      const pacientes = await fetcher({
        metodo: "GET",
        rota:
          "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatients/" +
          id,
      });
      Swal.hideLoading();
      Swal.fire({
        title: "Sucesso!",
        text: "Paciente deletado com sucesso!",
        icon: "success",
      });
    } catch (err) {
      Swal.hideLoading();
      Swal.fire({
        title: "Erro",
        text: "Ocorreu um erro ao deletar esse usuário!",
        icon: "error",
      });
      console.log(err);
    }
  };

  const handleDeleteClicked = async (
    nome: string | undefined,
    id: number | undefined,
  ) => {
    Swal.fire({
      title: `Tem certeza que deseja deletar o paciente ${nome}?`,
      text: "Não será possível reverter essa alteração",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      denyButtonText: "Cancelar",
      confirmButtonText: "Deletar mesmo assim!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePaciente(id);
      }
    });
  };

  return (
    <>
      <SeoConfig title="Lista de pacientes" />
      <Header />
      <div className="flex min-h-full min-w-full items-center">
        <div className="w-[100%] h-[80vh] mx-auto pt-6 px-7 bg-[#fff] rounded-lg flex flex-col relative">
          <div className="flex w-full justify-end mb-4 items-center ">
            <h1 className="mx-auto text-center font-bold text-2xl">Lista de Pacientes</h1>
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
                <Image src={AddUser} alt="Adicionar Usuário" className="invert" />
                Cadastrar novo paciente
              </Link>
            </div>

          </div>
          <div className="border p-4 border-gray-300 mb-8 rounded overflow-y-auto">
            <div className="relative overflow-x-auto">
              {!pacientes || pacientes?.length <= 0 ? (
                <RowLoading />
              ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3"></th>
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
                  </thead>
                  <tbody>
                    {pacientes.map((paciente: Paciente, index: number) => (
                      <tr
                        key={paciente.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } border-b dark:border-gray-700`}
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
                              className="w-6 h-6"
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
                          data-te-toggle="tooltip"
                          data-te-html="true"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="Deletar paciente"
                        >
                          <button
                            onClick={() =>
                              handleDeleteClicked(paciente.nome, paciente.id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {paciente.nome}
                        </td>
                        <td className="px-6 py-4">{paciente.cns}</td>
                        <td className="px-6 py-4">{paciente.dataNascimento}</td>
                        <td className="px-6 py-4">{paciente.numeroProntuario}</td>
                        <td className="px-6 py-4">
                          {tiposSanguineosMap.get(paciente.tipoSanguineo)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>  
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps<GetServerSideProps>() {
  const listPacientes = await fetcher({
    metodo: "GET",
    rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatients",
  });

  return {
    props: {
      listPacientes,
    },
  };
}
