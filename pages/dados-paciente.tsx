import dynamic from "next/dynamic";
import DetalhesPaciente from "../components/DetalhesPaciente";
import { useEffect, useState } from "react";
import SeoConfig from "../components/SeoConfig/index";
import fetcher from "@/api/fetcher";

const DynamicTabComponent = dynamic(
  () => import("../components/TabDadosPaciente"),
  {
    ssr: false,
  },
);
const mockedPatients = [
  {
    name: "Paciente teste 1",
    prontuario: "188182388",
    neutropenia: true,
    neutropeniaFebril: true,
  },
  {
    name: "Paciente teste 2",
    prontuario: "498789",
    neutropenia: true,
    neutropeniaFebril: true,
  },
  {
    name: "Paciente teste 3",
    prontuario: "2222",
    neutropenia: true,
    neutropeniaFebril: false,
  },
  {
    name: "Paciente teste 4",
    prontuario: "23424",
    neutropenia: false,
    neutropeniaFebril: false,
  },
  {
    name: "Paciente teste 5",
    prontuario: "34444",
    neutropenia: true,
    neutropeniaFebril: true,
  },
];

const DadosPacientePage = () => {
  const [selectedPatient, setSelectedPatient] = useState<Paciente>({});
  const [patients, setPatients] = useState<Paciente>();
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const result = await fetcher(
          "https://localhost:7091/Paciente/GetListPatients",
          "GET",
          "",
          "",
        );
        setPatients(result);
      } catch (error) {
        console.log(error);
        //TODO: adicionar lógica para o erro de acordo com o tipo de erro ou página
      }
    };
    fetchTest();
  }, []);
  return (
    <>
      <section className="flex min-h-full flex items-center">
        <div className="flex-1 mr-2">
          <DynamicTabComponent
            pacientes={patients || []}
            setSelectedPatient={setSelectedPatient}
          />
        </div>
        <div className="flex-1 ml-2">
          <DetalhesPaciente paciente={selectedPatient} />
        </div>
      </section>
    </>
  );
};

export default DadosPacientePage;
