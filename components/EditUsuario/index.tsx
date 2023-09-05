import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ArrowLeft from "../../public/arrow_left.svg";
import Image from "next/image";

export default function EditUsuario({ setListUsers, setUpdateUser, user }: any) {

  const [ nome, setNome ] = useState(user.nome);
  const [ cpf, setCpf ] = useState(user.cpf);
  //const [ certificado, setCertificado ] = useState(""); ADD
  const [ userName, setUserName ] = useState(user.userName);
  const [ ativo, setAtivo ] = useState(true);
  const [ error, setError ] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = {
        nome,
        userName,
        cpf,
      };

      const response = await fetch(`https://localhost:7091/Usuario/PutUser/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if(response.ok){
        alert("Usuário atualizado com sucesso");
      } else {
        setError(true);
      }

    } catch (error) {
      console.error(error);
    }
  };

  function backToList(){
    setUpdateUser(false);
    setListUsers(true);
  }

  return (
    <div className="flex min-h-full items-center">
      <div className="flex flex-col w-[40%] h-[60%] mx-auto mt-7 bg-[#fff] rounded-lg">
        <div className="flex items-center justify-center w-full h-12 gap-3 p-2 border-b-2 relative" onClick={() => backToList()}>
          <Image className="absolute left-4 cursor-pointer" src={ArrowLeft} alt="Voltar"/>
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

            {/* <div className="flex flex-col p-2 rounded-lg w-full">
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
            </div> */}
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

            <div className="flex p-2 rounded-lg items-center">
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
            </div>
          </div>
          <div className="flex w-full items-center mt-3">
            <button
              type="submit"
              className="w-48 h-12 rounded-lg bg-[#C55A11] text-[#fff] hover:bg-[#ED7C31] transition-colors mt-2 mx-auto font-bold"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
