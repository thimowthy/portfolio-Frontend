import dynamic from "next/dynamic";
import { useState } from "react";
import Header from "@/components/Header";
import { useEffect } from "react";
import SeoConfig from "@/components/SeoConfig";
import Loader from "@/components/Loader";
import fetcher from "@/api/fetcher";

const SelectCargos = dynamic(() => import("../components/SelectUsuario"), {
  ssr: false
});
const FormUsuario = dynamic(() => import("../components/FormUsuario"), {
  ssr: false
});
const ListUsuario = dynamic(() => import("../components/ListUsuarios"));
const EditUsuario = dynamic(() => import("../components/EditUsuario"));
const DeleteUsuario = dynamic(() => import("../components/DeleteUsuario"));

const CrudUsuario = () => {
  const [ user, setUser ] = useState({});
  const [ selectedRole, setSelectedRole ] = useState({});
  const [ listUsers, setListUsers ] = useState(true);
  const [ createUser, setCreateUser ] = useState(false);
  const [ updateUser, setUpdateUser ] = useState(false);
  const [ deleteUser, setDeleteUser ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ users, setUsers ] = useState([]);
  const cargos = [
    { nome: "Médico", valor: "medico", codigo: 35 },
    { nome: "Enfermeiro", valor: "enfermeiro", codigo: 42 },
    //{ nome: "Odontólogo", valor: "odontologo", codigo: 21 },
    { nome: "Farmacêutico", valor: "farmaceutico", codigo: 38 },
    //{ nome: "Nutricionista", valor: "nutricionista", codigo: 12 }
  ];

  useEffect(() => {
    setSelectedRole(cargos[1]);
  }, []);

  const fetchUsers = async () => {
    try {
      // Realize a solicitação de busca de usuários aqui
      setLoading(true);
      const usersList = await fetcher({ rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Usuario/GetListUsers", metodo: "GET", cabecalho: "Content-Type: application/json" });
      const filteredList = usersList.filter((u: Usuario) => u.ativo);
      setUsers(filteredList);
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
      {listUsers && <ListUsuario setCreateUser={setCreateUser} setListUsers={setListUsers} setUpdateUser={setUpdateUser} setDeleteUser={setDeleteUser} setUser={setUser} setLoading={setLoading} loading={loading} fetchUsers={fetchUsers} users={users} />}
      {createUser && <SelectCargos
        cargoSelecionado={selectedRole}
        cargos={cargos}
        setSelectedRole={setSelectedRole}
      />}
      {createUser && <FormUsuario cargo={selectedRole} setListUsers={setListUsers} setCreateUser={setCreateUser} setLoading={setLoading} />}
      {updateUser && <EditUsuario setListUsers={setListUsers} setUpdateUser={setUpdateUser} user={user} setLoading={setLoading} />}
      {deleteUser && <DeleteUsuario user={user} open={true} setDeleteUser={setDeleteUser} setLoading={setLoading} fetchUsers={fetchUsers} />}
    </>
  );
};

export default CrudUsuario;
