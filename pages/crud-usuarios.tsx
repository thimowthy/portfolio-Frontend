import dynamic from "next/dynamic";
import { useState } from "react";
import Header from "@/components/Header";
import { useEffect } from "react";

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

  return (
    <>
      <Header />
      {listUsers && <ListUsuario setCreateUser={setCreateUser} setListUsers={setListUsers} setUpdateUser={setUpdateUser} setDeleteUser={setDeleteUser} setUser={setUser}/>}
      {createUser && <SelectCargos
        cargoSelecionado={selectedRole}
        cargos={cargos}
        setSelectedRole={setSelectedRole}
      />}
      {createUser && <FormUsuario cargo={selectedRole} setListUsers={setListUsers} setCreateUser={setCreateUser}/>}
      {updateUser && <EditUsuario setListUsers={setListUsers} setUpdateUser={setUpdateUser} user={user}/>}
      {deleteUser && <DeleteUsuario user={user}/>}
    </>
  );
};

export default CrudUsuario;
