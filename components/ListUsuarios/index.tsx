import { useEffect } from "react";
import Image from "next/image";
import AddUser from "../../public/add_user.svg";
import EditUser from "../../public/pencil.svg";
import DeleteUser from "../../public/trash.svg";

export default function ListUsuarios({
  setCreateUser,
  setListUsers,
  setUpdateUser,
  setUser,
  setDeleteUser,
  loading,
  fetchUsers,
  users,
}: any) {
  useEffect(() => {
    fetchUsers();
  }, []);

  function handleAddUser() {
    setListUsers(false);
    setCreateUser(true);
  }

  function handleEditUser(user: Usuario) {
    setUser(user);
    setListUsers(false);
    setUpdateUser(true);
  }

  function handleDeleteUser(user: Usuario) {
    setUser(user);
    setDeleteUser(true);
  }

  return (
    <>
      <div className="flex min-h-full min-w-full items-center">
        <div className="w-[100%] h-[70vh] mx-auto pt-10 px-7 bg-[#fff] rounded-lg flex flex-col overflow-y-auto relative">
          <h1 className="text-center text-2xl pb-6">Usuários do Sistema</h1>
          <div
            className="flex gap-3 bg-lime-200 box-border w-[250px] rounded-lg py-3 px-3 absolute right-8 top-7 cursor-pointer"
            onClick={() => handleAddUser()}
          >
            <Image src={AddUser} alt="Adicionar Usuário" />
            Cadastrar novo usuário
          </div>
          {!users.length && !loading ? (
            <p className="text-center pt-16">Nenhum usuário cadastrado.</p>
          ) : (
            <>
              <section className="bg-[#dddddd] w-full rounded-lg flex justify-around items-center px-7 py-3">
                <p style={{ width: "20%" }}>Nome</p>
                <p style={{ width: "15%" }}>Nome de usuário</p>
                <p style={{ width: "15%" }}>CPF</p>
                <p style={{ width: "15%" }}>Cargo</p>
                <p style={{ width: "15%" }}>Certificado</p>
                <p style={{ width: "10%" }}>Editar</p>
                <p style={{ width: "10%" }}>Excluir</p>
              </section>

              <ul>
                {users.map((user: Usuario) => (
                  <li
                    key={user.id}
                    className="w-full h-14 rounded-lg flex justify-around items-center px-7"
                  >
                    <p style={{ width: "20%" }}>{user.nome}</p>
                    <p style={{ width: "15%" }}>{user.userName}</p>
                    <p style={{ width: "15%" }}>{user.cpf}</p>
                    <p style={{ width: "15%" }}>{user.profissao}</p>
                    <p style={{ width: "15%" }}>{user.certificado}</p>
                    <p
                      style={{ width: "10%" }}
                      onClick={() => handleEditUser(user)}
                    >
                      <Image
                        className="cursor-pointer"
                        src={EditUser}
                        alt="Editar Usuário"
                      />
                    </p>
                    <p
                      style={{ width: "10%" }}
                      onClick={() => handleDeleteUser(user)}
                    >
                      <Image
                        className="cursor-pointer"
                        src={DeleteUser}
                        alt="Deletar Usuário"
                        width={30}
                        height={30}
                      />
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
