import SeoConfig from "@/components/SeoConfig";
import CadastrarExameForm from "@/components/CadastrarExame";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import fetcher from "@/api/fetcher";

const CadastrarExame = () => {

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Profissional[]>([]);

  const fetchPacientes = async () => {
    try {
      const pacientes = await fetcher({
        metodo: "GET",
        rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatientsSemAlta",
      });
      if (pacientes.length > 0) {
        setPacientes(pacientes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMedicos = async () => {
    try {
      const medicos = await fetcher({
        metodo: "GET",
        rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Usuario/GetListUsers?filtroCargo=MEDICO",
    });
      if (medicos.length > 0) {
        setMedicos(medicos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchPacientes();
      fetchMedicos();
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <SeoConfig title="Cadastrar Exame" />
      <Header />
      <CadastrarExameForm pacientes={pacientes} medicos={medicos} />
    </div>
  );
};

export default CadastrarExame;
