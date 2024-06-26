import dynamic from "next/dynamic";
import { useState } from "react";
import Header from "@/components/Header";
import { useEffect } from "react";
import SeoConfig from "@/components/SeoConfig";
import Loader from "@/components/Loader";
import fetcher from "@/api/fetcher";

const FormUsuario = dynamic(() => import("../components/FormUsuario"), {
  ssr: false,
});
const ListUsuario = dynamic(() => import("../components/ListUsuarios"), {
  ssr: false,
});
const EditUsuario = dynamic(() => import("../components/EditUsuario"), {
  ssr: false,
});
const DeleteUsuario = dynamic(() => import("../components/DeleteUsuario"), {
  ssr: false,
});

const CrudUsuario = () => {
  const [user, setUser] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [listUsers, setListUsers] = useState(true);
  const [createUser, setCreateUser] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const cargos = [
    { nome: "Médico", valor: "medico", codigo: 35 },
    { nome: "Enfermeiro", valor: "enfermeiro", codigo: 42 },
    //{ nome: "Odontólogo", valor: "odontologo", codigo: 21 },
    { nome: "Farmacêutico", valor: "farmaceutico", codigo: 38 },
    { nome: "Laboratório", valor: "laboratorista", codigo: 55 },
    { nome: "Administrador", valor: "administrador", codigo: 11 },
    //{ nome: "Nutricionista", valor: "nutricionista", codigo: 12 }
  ];

  useEffect(() => {
    setSelectedRole(cargos[1]);
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("Authorization");

    try {
      setLoading(true);
      const usersList = await fetcher({
        rota: "/Usuario/GetListUsers",
        metodo: "GET",
        cabecalho: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(usersList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SeoConfig title="Usuários" />
      <Header />
      {loading && <Loader />}
      {listUsers && (
        <ListUsuario
          setCreateUser={setCreateUser}
          setListUsers={setListUsers}
          setUpdateUser={setUpdateUser}
          setDeleteUser={setDeleteUser}
          setUser={setUser}
          setLoading={setLoading}
          loading={loading}
          fetchUsers={fetchUsers}
          users={users}
        />
      )}
      {createUser && (
        <FormUsuario
          cargos={cargos}
          setListUsers={setListUsers}
          setCreateUser={setCreateUser}
          setLoading={setLoading}
        />
      )}
      {updateUser && (
        <EditUsuario
          setListUsers={setListUsers}
          setUpdateUser={setUpdateUser}
          user={user}
          cargos={cargos}
          setLoading={setLoading}
        />
      )}
      {deleteUser && (
        <DeleteUsuario
          user={user}
          open={true}
          setDeleteUser={setDeleteUser}
          setLoading={setLoading}
          fetchUsers={fetchUsers}
        />
      )}
    </>
  );
};

export default CrudUsuario;
