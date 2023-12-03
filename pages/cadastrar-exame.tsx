import SeoConfig from "@/components/SeoConfig";
import CadastrarExameForm from "@/components/CadastrarExame";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CadastrarExame = () => {

  const [pacientes, setPacientes] = useState<Paciente[]>([{
    id: 0,
    numeroProntuario: "",
    nome: "a",
    cpf: "",
    cns: "",
  }]);
  
  const [medicos, setMedicos] = useState<Profissional[]>([{
    id: 0,
    cpf: "",
    nome: "",
    login: "",
    cargo: "",
    certificado: ""
  }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatientsSemAlta",
          { method: "GET" },
        );

        if (!response.ok) throw new Error("Erro na solicitação");

        const pacientes = await response.json();

        setPacientes(pacientes);
      } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatientsSemAlta",
          { method: "GET" },
        );

        if (!response.ok) throw new Error("Erro na solicitação");

        const pacientes = await response.json();

        setMedicos(pacientes);
      } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <SeoConfig title="Cadastrar Exame" />
        <Header />
        {pacientes && (
          <CadastrarExameForm
            pacientes={pacientes}
            medicos={medicos}
          />
        )}
      </div>
    </>
  );
};

export default CadastrarExame;
