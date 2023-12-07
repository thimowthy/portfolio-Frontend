import Header from "@/components/Header";
import SeoConfig from "@/components/SeoConfig";
import { useEffect, useState } from "react";
import PreviousPageButton from "../components/buttons/previousPageButton";
import fetcher from "@/api/fetcher";
import Image from "next/image";
import Loader from "@/components/Loader";
import ErrorToast from "@/components/toasts/errorToast";
import SuccessToast from "@/components/toasts/successToast";
import TiposSanguineos from "@/types/TipoSanguineo";
import trashIcon from "@/public/trash.svg";

import { useRouter } from "next/router";

interface FormObject {
  nome: string;
  cpf: string;
  cns: string;
  dataNascimento: string;
  numeroProntuario: string;
  leito: string;
  tipoSanguineo: any;
  comorbidades: any;
  alergias: any;
}

const AdicionarPaciente = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormObject>({
    nome: "",
    cpf: "",
    cns: "",
    dataNascimento: "",
    numeroProntuario: "",
    leito: "",
    tipoSanguineo: "",
    comorbidades: "",
    alergias: "",
  });

  const [loading, setLoading] = useState(false);
  const [sucessFetchStatus, setSucessFetchStatus] = useState(false);
  const [error, setError] = useState(false);
  const [pacientesCadastrados, setPacientes] = useState<Paciente[]>([]);
  const [paciente, setPaciente] = useState<Paciente>();
  const [internado, setInternado] = useState<Boolean>(false);

  useEffect(() => {
    if (internado && paciente) {
      router.push({
        pathname: "/estratificacao-risco",
        query: {
          id: paciente.id,
          dataNascimento: paciente.dataNascimento,
          admissao: paciente.dataAdmissao,
          nome: paciente.nome,
          cpf: paciente.cpf,
          prontuario: paciente.numeroProntuario,
          cartaoSus: paciente.cns,
        },
      });
    }
  }, [internado, paciente, router]);

  useEffect(() => {
    const fetchInternamento = async () => {
      if (paciente) {
        try {
          const responseInternamento = await fetch(
            `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Internacao/GetInternacaoAtual?pacienteId=${paciente.id}`, 
            { method: "GET" },
          );
      
          if (!responseInternamento.ok) throw new Error("Erro na solicitação");
      
          const internamento = await responseInternamento.json();

          setFormData((prevFormData) => ({
            ...prevFormData,
            leito: internamento.Leito,
          }));

        } catch (error) {
          console.error("Ocorreu um erro durante a solicitação:", error);
        }
      }

    };
    fetchInternamento();
  }, [paciente]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePacientes = await fetch(
          "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatients",
          { method: "GET" },
        );

        if (!responsePacientes.ok) throw new Error("Erro na solicitação");

        const pacientes = await responsePacientes.json();
        setPacientes(pacientes);  

      } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
      }
    };
    fetchData();
  }, []);

  const stringfyList = (lista: any[]) => {
    if (!lista || !lista.length) {
      return "";
    }
  
    const nomesComorbidades = lista.map((item) => item.nome);
    return nomesComorbidades.join(", ");
  };

  const autoFillPacienteInputs = () => {
    const pacienteEncontrado = pacientesCadastrados.find(
      (paciente) => paciente.numeroProntuario === formData.numeroProntuario,
    );
  
    if (pacienteEncontrado) {
      setPaciente(pacienteEncontrado);

      setFormData((prevFormData) => ({
        ...prevFormData,
        nome: pacienteEncontrado.nome || "",
        cpf: pacienteEncontrado.cpf || "",
        cns: pacienteEncontrado.cns || "",
        dataNascimento: pacienteEncontrado.dataNascimento || "",
        numeroProntuario: pacienteEncontrado.numeroProntuario || "",
        tipoSanguineo: pacienteEncontrado.tipoSanguineo || "",
        comorbidades: stringfyList(pacienteEncontrado.comorbidades || []) || "",
        alergias: stringfyList(pacienteEncontrado.alergias || []) || "",
      }));
    } else {
      cleanUseStates();
    }
  };
  
  const cleanUseStates = () => {
    setFormData({
      nome: "",
      cpf: "",
      cns: "",
      dataNascimento: "",
      numeroProntuario: "",
      leito: "",
      tipoSanguineo: "",
      comorbidades: "",
      alergias: "",
    });
  };

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
    if (formDataClone.comorbidades) {
      const comorbidadesArr = formDataClone.comorbidades.split(",");
      const outputArr = [];
      if (comorbidadesArr.length > 0) {
        for (let comorbidade of comorbidadesArr) {
          outputArr.push({
            nome: comorbidade.trim(),
          });
        }
      }
      formDataClone.comorbidades = outputArr;
    }
    if (formDataClone.alergias) {
      const alergiasArr = formDataClone.alergias.split(",");
      const outputArr = [];
      if (alergiasArr.length > 0) {
        for (let alergia of alergiasArr) {
          outputArr.push({
            nome: alergia.trim(),
          });
        }
      }
      formDataClone.alergias = outputArr;
    }
    formDataClone.tipoSanguineo = parseInt(formDataClone.tipoSanguineo);
    setLoading(true);
    if (!paciente) {
      try {
        const result = await fetcher({
          rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/AddPaciente",
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
    }
    else {
      // FAZER REQUISIÇÃO PARA INTERNAR PACIENTE JÁ CADASTRADO
      // setar internado para true quando a requisição for bem sucedida
      setInternado(true);
      
    }
  };
  return (
    <>
      {sucessFetchStatus && (
        <SuccessToast
          className="toast-error"
          title="Sucesso!"
          message="O paciente foi cadastrado com sucesso!"
          onClose={() => {
            setSucessFetchStatus(false);
          }}
        />
      )}
      {error && (
        <ErrorToast
          autohide={true}
          className="toast-error"
          title="Erro no cadastro do paciente"
          message="Ocorreu um erro ao cadastrar o paciente. Verifique se todos os campos obrigatórios estão sendo preenchidos corretamente e tente novamente."
          onClose={() => setError(false)}
        />
      )}
      {loading && <Loader />}
      <SeoConfig title="Adicionar paciente" />
      <Header />
      <div className="flex min-h-full min-w-full justify-center items-center py-9">
        <div className="bg-white rounded-lg min-h-full w-[65%] pt-8 px-8   flex justify-center mt-12">
          <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
            <PreviousPageButton
              href="/pacientes"
              title=""
            />
            <h1 className="text-xl text-center font-bold mx-auto">
              {paciente?"Internar":"Cadastrar"} Paciente
            </h1>
            <div className="flex">
              <button
                className="ml-auto"
                title="Limpar campos"
                onClick={() => {
                  cleanUseStates(); 
                  setPaciente(undefined);
                }}>
                <Image src={trashIcon} alt="" width="30" height="30" style={{ opacity: 0.3 }} />
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200 w-full px-32 my-3"></div>
            <div className="flex flex-wrap -mx-3 mt-4">
              <div className="w-full md:w-1/2 px-3 ">
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
                  onBlur={autoFillPacienteInputs}
                  required
                  value={formData.numeroProntuario}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
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
                  disabled={Boolean(paciente)}
                />
              </div>
            </div>
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
                  disabled={Boolean(paciente)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 -my-2">
              <div className="w-full md:w-1/2 px-3 mt-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Data de nascimento
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="date"
                  placeholder="Data de nascimento, ex: 10/12/1988"
                  name="dataNascimento"
                  onChange={handleInput}
                  required
                  value={formData.dataNascimento}
                  disabled={Boolean(paciente)}
                />
              </div>
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
                  disabled={Boolean(paciente)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 -my-2">
              <div className="w-full md:w-1/2 px-3 my-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Comorbidades (separadas por vírgulas)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Ex: Diabetes, hipertensão"
                  name="comorbidades"
                  required
                  onChange={handleInput}
                  value={formData.comorbidades}
                  disabled={Boolean(paciente)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 my-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Alergias (separadas por vírgulas)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Ex: Dipirona, ovo, amendoim"
                  name="alergias"
                  required
                  onChange={handleInput}
                  value={formData.alergias}
                  disabled={Boolean(paciente)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 -my-2">
              <div className="w-full md:w-1/2 px-3 my-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Leito
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Leito"
                  name="leito"
                  onChange={handleInput}
                  value={formData.leito}
                  disabled={Boolean(paciente)}
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
                    disabled={Boolean(paciente)}
                  >
                    {TiposSanguineos.map((tipo) => (
                      <option key="tipo.id" value={tipo.id}>
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
            <div className="flex w-full my-4">
              <button
                type="submit"
                className="w-48 h-12 rounded-lg bg-orange-500 text-[#fff] hover:bg-orange-400 transition-colors mt-2 mx-auto font-bold"
              >
                { !paciente? "Cadastrar":"Internar Paciente"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdicionarPaciente;