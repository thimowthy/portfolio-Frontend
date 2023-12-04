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
    id: 2,
    cpf: "12345678900",
    nome: "Doutor Hans Chucrute",
    login: "AAA",
    cargo: "MEDICO",
    certificado: "ABFSD%#F"
  }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePacientes = await fetch(
          "https://localhost:7091/Paciente/GetListPatientsSemAlta",
          { method: "GET" },
        );
        
        if (!responsePacientes.ok)
          throw new Error("Erro na solicitação");
        
        const pacientes = await responsePacientes.json();
        setPacientes(pacientes);

        const responseMedicos = await fetch(
          "https://localhost:7091/Usuario/GetListUsers?filtroCargo=MEDICO",
          { method: "GET" },
        );
        
        if (!responseMedicos.ok)
          throw new Error("Erro na solicitação");
        
        const medicos = await responseMedicos.json();
        setMedicos(medicos);

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
