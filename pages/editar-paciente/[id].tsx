"use client";

import fetcher from "@/api/fetcher";
import RowLoading from "@/components/SkeletonLoading/RowLoading";
import PreviousPageButton from "@/components/buttons/previousPageButton";
import TiposSanguineos from "@/types/TipoSanguineo";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ErrorToast from "@/components/toasts/errorToast";
import SuccessToast from "@/components/toasts/successToast";

interface FormObject {
  nome: string;
  cpf: string;
  cns: string;
  dataNascimento: string;
  numeroProntuario: string;
  tipoSanguineo: any;
}

async function loadPaciente(id: any) {
  try {
    const paciente = await fetcher({
      metodo: "GET",
      rota: `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetById?pacienteId=${id}`,
    });
    return paciente;
  } catch (err) {
    console.log(err);
  }
}

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [sucessFetchStatus, setSucessFetchStatus] = useState(false);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [paciente, setPaciente] = useState<any>({});
  const [formData, setFormData] = useState<FormObject>({
    nome: "",
    cpf: "",
    cns: "",
    dataNascimento: "",
    numeroProntuario: "",
    tipoSanguineo: "",
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const requiredFields = [
      "nome",
      "cns",
      "cpf",
      "numeroProntuario",
      "dataNascimento",
    ];
    for (const field of requiredFields) {
      const fieldValue = formData[field as keyof typeof formData];
      console.log(fieldValue);
      if (!fieldValue) {
        setError(true);
        return false;
      }
    }
    const formDataClone = { ...formData };
    formDataClone.tipoSanguineo = parseInt(formDataClone.tipoSanguineo);
    setLoading(true);
    try {
      const result = await fetcher({
        rota:
          "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/EditPaciente?pacienteId=" +
          id,
        metodo: "POST",
        body: formDataClone,
      });
      if (result) {
        setError(false);
        setSucessFetchStatus(true);
      }
      setLoading(false);
      setTimeout(() => {
        router.push("/pacientes");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    async function load() {
      setIsFetching(true);
      const p = await loadPaciente(id);
      setPaciente(p);
    }
    if (router.isReady) {
      load();
      setFormData((prevState) => ({
        ...prevState,
        ["nome"]: paciente.nome,
        ["cns"]: paciente.cns,
        ["cpf"]: paciente.cpf,
        ["dataNascimento"]: paciente.dataNascimento,
        ["tipoSanguineo"]: paciente.tipoSanguineo,
        ["numeroProntuario"]: paciente.tipoSanguineo,
      }));
    }
  }, [router.isReady]);
  // async function load() {
  //   setIsFetching(true);
  //   await loadPaciente();
  // };
  // const loadedPaciente = loadPaciente(id);
  // setPaciente(loadPaciente);
  return (
    <>
      {sucessFetchStatus && (
        <SuccessToast
          className="toast-error"
          title="Sucesso!"
          message="O paciente foi alterado com sucesso!"
          onClose={() => {
            setSucessFetchStatus(false);
          }}
        />
      )}
      {error && (
        <ErrorToast
          autohide={true}
          className="toast-error"
          title="Erro ao alterar paciente"
          message="Ocorreu um erro ao alterar o paciente. Verifique se todos os campos obrigatórios estão sendo preenchidos corretamente e tente novamente."
          onClose={() => setError(false)}
        />
      )}
      <div className="flex min-h-full min-w-full justify-center items-center py-9">
        <div className="bg-white rounded-lg min-h-full w-[70%] py-9 px-4 flex justify-center">
          {paciente ? (
            <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
              <PreviousPageButton
                className="mb-3"
                title="Voltar para lista de pacientes"
                href="/pacientes"
              />
              <h1 className="text-lg text-center font-bold">
                Adicionar paciente
              </h1>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3 my-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Nome
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    required
                    onChange={handleInput}
                    value={formData.nome}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 my-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    CPF
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="CPF"
                    name="cpf"
                    required
                    onChange={handleInput}
                    value={formData.cpf}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 my-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    CNS
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="CNS"
                    name="cns"
                    required
                    onChange={handleInput}
                    value={formData.cns}
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 my-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Data de nascimento
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Data de nascimento, ex: 10/12/1988"
                    name="dataNascimento"
                    onChange={handleInput}
                    required
                    value={formData.dataNascimento}
                  />
                </div>
              </div>
              {/* <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 my-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Comorbidades (separadas por vírgulas)
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Ex: Diabetes, hipertensão" name="comorbidades" required onChange={handleInput} value={formData.comorbidades} />
              </div>
              <div className="w-full md:w-1/2 px-3 my-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Alergias (separadas por vírgulas)
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Ex: Dipirona, ovo, amendoim" name="alergias" required onChange={handleInput} value={formData.alergias} />
              </div>
            </div> */}
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 my-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Número prontuário
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Número do prontuário"
                    name="numeroProntuario"
                    onChange={handleInput}
                    required
                    value={formData.numeroProntuario}
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 my-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    Tipo sanguíneo
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      onChange={handleInput}
                      name="tipoSanguineo"
                      value={formData.tipoSanguineo}
                    >
                      {TiposSanguineos.map((tipo) => (
                        <option
                          key="tipo.id"
                          value={tipo.id}
                          selected={paciente.tipoSanguineo === tipo.id}
                        >
                          {tipo.nome}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full my-3">
                <button
                  type="submit"
                  className="w-48 h-12 rounded-lg bg-[#C55A11] text-[#fff] hover:bg-[#ED7C31] transition-colors mt-2 mx-auto font-bold"
                >
                  Atualizar
                </button>
              </div>
            </form>
          ) : (
            <RowLoading />
          )}
        </div>
      </div>
    </>
  );
}
