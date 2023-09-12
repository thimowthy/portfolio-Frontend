import { useState, FormEvent } from "react";
import ErrorToast from "../toasts/errorToast";
import { useRouter } from "next/navigation";
import ArrowLeft from "../../public/arrow_left.svg";
import Image from "next/image";

export default function FormUsuario({
  cargo,
  setCreateUser,
  setListUsers,
  setLoading,
}: any) {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [certificado, setCertificado] = useState("");
  const [userName, setUserName] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [error, setError] = useState(false);

  function backToList() {
    setCreateUser(false);
    setListUsers(true);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      const formData = {
        nome,
        senha,
        userName,
        cpf,
        profissao: cargo.valor,
        certificado,
        ativo: true,
      };

      const response = await fetch(
        "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Usuario/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      setTimeout(() => {
        setLoading(false);
        if (response.ok) {
          alert("Usuário criado com sucesso");
          setCreateUser(false);
          setListUsers(true);
        } else {
          alert("Erro ao atualizar usuário");
          //setError(true);
        }
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-[40%] h-[60%] mx-auto mt-7 bg-[#fff] rounded-lg">
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
        <h3 className="text-xl">Cadastro de {cargo.nome}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col px-8">
          <div className="flex items-center w-full">
            <div className="flex flex-col p-2 rounded-lg w-[50%]">
              <label htmlFor="nome" className="ml-1">
                Nome
              </label>
              <input
                className="bg-gray-200 p-2 outline-none rounded-lg w-full"
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col p-2 rounded-lg w-[50%]">
              <label htmlFor="nome" className="ml-1">
                Usuário
              </label>
              <input
                className="bg-gray-200 p-2 outline-none rounded-lg w-full"
                type="text"
                name="username"
                id="username"
                placeholder="Usuário"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col p-2 rounded-lg">
            <label htmlFor="cpf" className="ml-1">
              CPF
            </label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              placeholder="CPF"
              className="bg-gray-200 p-2 outline-none rounded-lg"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col p-2 rounded-lg">
            <label htmlFor="senha" className="ml-1">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha"
              className="bg-gray-200 p-2 outline-none rounded-lg"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col p-2 rounded-lg w-full">
            <label htmlFor="certificado" className="ml-1">
              Certificado
            </label>
            <input
              type="text"
              name="certificado"
              id="certificado"
              placeholder="Certificado"
              className="bg-gray-200 p-2 outline-none rounded-lg"
              value={certificado}
              onChange={(e) => setCertificado(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            {/* <div className="flex flex-col p-2 rounded-lg">
              <label htmlFor="codigo" className="ml-1">
                Código
              </label>
              <input
                type="number"
                className="bg-gray-200 p-2 outline-none rounded-lg w-14"
                name="codigo"
                id="codigo"
                disabled
                value={cargo.codigo}
                required
              />
            </div> */}
          </div>

          {/* <div className="flex p-2 rounded-lg items-center">
            <label htmlFor="ativo" className="ml-1">
              Ativo
            </label>
            <input
              type="checkbox"
              id="ativo"
              name="ativo"
              className="bg-gray-200 p-2 outline-none rounded-lg ml-2"
              checked={ativo}
              onChange={() => setAtivo(!ativo)}
            />
          </div> */}
        </div>
        <div className="flex w-full items-center mt-3">
          <button
            type="submit"
            className="w-48 h-12 rounded-lg bg-[#C55A11] text-[#fff] hover:bg-[#ED7C31] transition-colors mt-2 mx-auto font-bold"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
