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

const CrudUsuario = () => {
  const [ selectedRole, setSelectedRole ] = useState({});
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
      <SelectCargos
        cargoSelecionado={selectedRole}
        cargos={cargos}
        setSelectedRole={setSelectedRole}
      />
      <FormUsuario cargo={selectedRole} />
    </>
  );
};

export default CrudUsuario;
