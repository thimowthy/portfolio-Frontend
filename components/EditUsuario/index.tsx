import { useState, FormEvent, useEffect } from "react";
import ArrowLeft from "../../public/arrow_left.svg";
import Image from "next/image";
import fetcher from "@/api/fetcher";
import { formatCPF } from "@/utils/formatCPF";
import { validateCPF } from "@/utils/validateCPF";

export default function EditUsuario({
  setListUsers,
  setUpdateUser,
  user,
  cargos,
  setLoading,
}: any) {
  const [nome, setNome] = useState(user.nome);
  const [cargoAtual, setCargoAtual] = useState(user.cargo.toLowerCase());
  const [cpf, setCpf] = useState(user.cpf);
  const [cpfFormated, setCpfFormated] = useState("");
  const [cpfOk, setCpfOk] = useState<Boolean>(true);
  const [certificado, setCertificado] = useState(user.certificado);
  const [userName, setUserName] = useState(user.login);

  useEffect(() => {
    setCpfFormated(formatCPF(cpf));
  }, [cpf]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cpfOk) {
      try {
        const formData = {
          id: user.id,
          nome,
          login: userName,
          cpf,
          certificado,
          cargo: cargoAtual,
          senha: user.senha,
          ativo: true,
        };

        setLoading(true);

        const token = localStorage.getItem("Authorization");

        if (token) {
          const response = await fetcher({
            rota: `/Usuario/PutUser/${user.id}`,
            metodo: "PUT",
            body: formData,
          });
          setUpdateUser(false);
          setListUsers(true);
          alert("Usuário atualizado com sucesso");
        }
      } catch (error) {
        alert("Erro ao atualizar usuário");
        setUpdateUser(true);
        // setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  function backToList() {
    setUpdateUser(false);
    setListUsers(true);
  }

  return (
    <div className="flex min-h-full items-center">
      <div className="flex flex-col w-[40%] h-[60%] mx-auto mt-7 bg-[#fff] rounded-lg pb-5">
        <div
          className="flex items-center justify-center w-full h-12 gap-3 p-2 border-b-2 relative"
          onClick={() => backToList()}
        >
          <Image
            className="absolute left-4 cursor-pointer"
            src={ArrowLeft}
            alt="Voltar"
          />
          <h3 className="text-xl">Edição de usuário</h3>
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
            <div className="flex items-center w-full">
              <div className="flex flex-col p-2 rounded-lg w-full">
                <label htmlFor="cpf" className="ml-1">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  placeholder="CPF"
                  className={`bg-gray-200 p-2 border-2 outline-none rounded-lg ${cpfOk === false ? "border-red-500 " : ""
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
              {cargoAtual?.toUpperCase() !== "ADMINISTRADOR" && (
                <div className="flex flex-col p-2 rounded-lg w-full">
                  <label htmlFor="cagos">Selecione o cargo desejado</label>
                  <select
                    name="cargos"
                    id="cargos"
                    className="bg-gray-200 p-2 outline-none rounded-lg"
                    onChange={(e) => {
                      setCargoAtual(e.target.value);
                    }}
                    value={cargoAtual}
                  >
                    {cargos.map((cargo: Cargo) => (
                      <option value={cargo.valor} key={cargo.valor}>
                        {cargo.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex items-center w-full">
              <div className="flex flex-col p-2 rounded-lg w-full">
                <label htmlFor="cpf" className="ml-1">
                  Certificado
                </label>
                <input
                  type="text"
                  name="certificado"
                  id="certificado"
                  placeholder="Certificado"
                  className={`bg-gray-200 p-2 border-2 outline-none rounded-lg 
                  }`}
                  value={certificado}
                  onChange={(e) => setCertificado(e.target.value)}
                />
              </div>
              {/* <div className="flex flex-col p-2 rounded-lg w-full">
                <label htmlFor="cpf" className="ml-1">
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Senha"
                  className={"bg-gray-200 p-2 border-2 outline-none rounded-lg "}
                  value={"ttt"}
                  minLength={11}
                  maxLength={14}
                  onChange={(e) => setCpf(e.target.value)}
                  onBlur={() => setCpfOk(validateCPF(cpf))}
                  required
                />
              </div> */}
            </div>
          </div>
          <div className="flex w-full items-center mt-3">
            <button
              type="submit"
              className="w-48 h-12 rounded-lg bg-orange-500 text-[#fff] hover:bg-[#ED7C31] transition-colors mt-2 mx-auto font-bold"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
