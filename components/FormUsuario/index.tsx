import { useState, FormEvent, useEffect } from "react";
import ErrorToast from "../toasts/errorToast";
import ArrowLeft from "../../public/arrow_left.svg";
import Image from "next/image";
import { set } from "date-fns";
import { formatCPF } from "@/utils/formatCPF";
import fetcher from "@/api/fetcher";
import { validateCPF } from "@/utils/validateCPF";

export default function FormUsuario({
  cargos,
  setCreateUser,
  setListUsers,
  setLoading,
}: any) {
  const [nome, setNome] = useState("");
  const [cpfFormated, setCpfFormated] = useState("");
  const [cargoAtual, setCargoAtual] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfOk, setCpfOk] = useState<Boolean>(true);
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [certificado, setCertificado] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [senhaOk, setSenhaOK] = useState<Boolean>(true);

  function backToList() {
    setCreateUser(false);
    setListUsers(true);
  }

  useEffect(() => {
    setCpfFormated(formatCPF(cpf));
  }, [cpf]);

  useEffect(() => {
    setSenhaOK(confirmar === senha);
  }, [confirmar, senha]);

  const removeMask = (str: string) => {
    return str.replace(/[-.]/g, "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (senhaOk) {
      event.preventDefault();
      try {
        setLoading(true);

        const formData = {
          nome,
          senha,
          login: userName,
          cpf: removeMask(cpf),
          profissao: cargoAtual,
          certificado,
        };

        const token = localStorage.getItem("Authorization");

        if (token) {
          const response = await fetcher({
            metodo: "POST",
            body: formData,
            rota: "/Usuario/Create",
          });

          if (response.id) {
            alert("Usuário criado com sucesso");
            setCreateUser(false);
            setListUsers(true);
          } else {
            alert("Erro ao criar usuário");
          }
        }
        setNome("");
        setSenha("");
        setUserName("");
        setCertificado("");
      } catch (error) {
        console.error(error);
        alert("Erro ao criar usuário");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-full items-center">
      <div className="flex flex-col w-fit mx-auto mt-7 bg-[#fff] rounded-lg">
        {error && (
          <ErrorToast
            title="Erro no cadastro"
            message="Erro ao cadastrar usuário"
            onClose={() => setError(false)}
          />
        )}
        <div
          className="flex items-center justify-center w-full h-12 gap-3 p-2 border-b-2 relative"
          onClick={() => backToList()}
        >
          <Image
            className="absolute left-4 cursor-pointer"
            src={ArrowLeft}
            alt="Voltar"
          />
          <h3 className="text-xl">Cadastro de Usuário</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flexbox px-8 py-4 gap-4">
            <div className="flex flex-col gap-y-1 mb-2 rounded-lg">
              <label htmlFor="nome" className="ml-1">
                Nome Completo
              </label>
              <input
                className="bg-gray-200 p-2 outline-none rounded w-full"
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome Completo"
                value={nome}
                minLength={6}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-4 justify-center mb-2 items-start w-full">
              <div className="flex flex-col rounded gap-y-1 w-full">
                <label htmlFor="certificado" className="ml-1">
                  Certificado
                </label>
                <input
                  type="text"
                  name="certificado"
                  id="certificado"
                  placeholder="Certificado"
                  className="bg-gray-200 p-2 outline-none rounded"
                  value={certificado}
                  onChange={(e) => setCertificado(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-1 rounded">
                <label htmlFor="cpf" className="ml-1">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  placeholder="CPF"
                  className={`bg-gray-200 p-2 border-2 outline-none rounded ${
                    cpfOk === false ? "border-red-500 " : ""
                  }`}
                  value={cpfFormated}
                  minLength={11}
                  maxLength={14}
                  onChange={(e) => setCpf(e.target.value)}
                  onBlur={() => setCpfOk(validateCPF(cpf))}
                  required
                />
                {!cpfOk && (
                  <span className="text-red-500 font-bold">CPF Inválido</span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full mb-2 gap-y-1 rounded">
              <label htmlFor="nome" className="ml-1">
                Usuário
              </label>
              <input
                className="bg-gray-200 p-2 outline-none rounded w-full"
                type="text"
                name="username"
                id="username"
                placeholder="Usuário"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            {cargoAtual?.toUpperCase() !== "ADMINISTRADOR" && (
              <div className="flex flex-col w-full mb-2 gap-y-1 rounded">
                {" "}
                <label htmlFor="cagos">Cargo</label>
                <select
                  name="cargos"
                  id="cargos"
                  className="bg-gray-200 p-2 outline-none rounded  w-full"
                  onChange={(e) => {
                    setCargoAtual(e.target.value);
                  }}
                  value={cargoAtual}
                >
                  <option value="">Selecione</option>
                  {cargos.map((cargo: Cargo) => (
                    <option value={cargo.valor} key={cargo.valor}>
                      {cargo.nome}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex flex-col mb-2 gap-y-1 rounded">
              <label htmlFor="senha" className="ml-1">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
                minLength={6}
                className="bg-gray-200 p-2 outline-none rounded"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mb-2 gap-y-1 rounded">
              <label htmlFor="confirmar" className="ml-1">
                Confirme a senha
              </label>
              <input
                type="password"
                name="senha"
                id="confirmar"
                placeholder="Senha"
                className={`bg-gray-200 p-2 border-2 rounded ${
                  senhaOk === false ? "border-red-500 " : ""
                }`}
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
              />
              {senhaOk === false && (
                <p className="text-red-500 text-sm mt-1">
                  Senhas incompatíveis.
                </p>
              )}
            </div>
            <div className="flex w-full items-center mt-3">
              <button
                type="submit"
                className="w-48 h-12 rounded-lg bg-orange-500 text-[#fff] hover:bg-[#ED7C31] transition-colors mt-2 mx-auto font-bold"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
