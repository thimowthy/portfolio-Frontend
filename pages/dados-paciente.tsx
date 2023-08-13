import dynamic from "next/dynamic";
import DetalhesPaciente from "../components/DetalhesPaciente";
import { useState } from "react";
import SeoConfig from "../components/SeoConfig/index";

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
    cpf: "214.216.940-69",
    unidade: "Oncologia",
    cartaoSus: "4233/2",
    dataNascimento: "14/12/1989",
    leito: "3B",
    dataAdmissao: "14/05/2023 às 04:51",
    comorbidades: "Asma - Diabetes",
    neutrofilos: "< 500",
    prescricao: {
      data: "14/07/2023",
      medicamentos: [
        {
          medicacao: "Cefepime",
          periodo: "a cada 8 horas",
          dosagem: "1g",
        },
        {
          medicacao: "Meropenem",
          periodo: "a cada 12 horas",
          dosagem: "2g",
        },
      ],
    },
  },
  {
    name: "Paciente teste 2",
    prontuario: "498789",
    neutropenia: true,
    neutropeniaFebril: true,
    cpf: "539.957.590-68",
    unidade: "Oncologia",
    cartaoSus: "44234/2",
    dataNascimento: "14/12/1991",
    leito: "3B",
    dataAdmissao: "14/05/2023 às 04:51",
    comorbidades: "Hipertensão",
    neutrofilos: "< 500",
    prescricao: {
      data: "14/07/2023",
      medicamentos: [
        {
          medicacao: "Cefepime",
          periodo: "a cada 9 horas",
          dosagem: "1g",
        },
        {
          medicacao: "Meropenem",
          periodo: "a cada 12 horas",
          dosagem: "1g",
        },
      ],
    },
  },
  {
    name: "Paciente teste 3",
    prontuario: "2222",
    neutropenia: true,
    neutropeniaFebril: false,
    cpf: "973.823.830-75",
    unidade: "Oncologia",
    cartaoSus: "44223/2",
    dataNascimento: "14/12/1970",
    leito: "3B",
    dataAdmissao: "14/05/2023 às 04:51",
    comorbidades: "Diabetes - Hipertensão",
    neutrofilos: "< 500",
    prescricao: {
      data: "14/07/2023",
      medicamentos: [
        {
          medicacao: "Cefepime",
          periodo: "a cada 18 horas",
          dosagem: "3g",
        },
        {
          medicacao: "Meropenem",
          periodo: "a cada 12 horas",
          dosagem: "2g",
        },
      ],
    },
  },
  {
    name: "Paciente teste 4",
    prontuario: "23424",
    neutropenia: false,
    neutropeniaFebril: false,
    cpf: "369.532.570-40",
    unidade: "Oncologia",
    cartaoSus: "235677/2",
    dataNascimento: "14/12/1960",
    leito: "3C",
    dataAdmissao: "14/05/2023 às 04:51",
    comorbidades: "asma",
    neutrofilos: "< 500",
    prescricao: {
      data: "14/07/2023",
      medicamentos: [
        {
          medicacao: "Cefepime",
          periodo: "a cada 8 horas",
          dosagem: "1g",
        },
        {
          medicacao: "Meropenem",
          periodo: "a cada 12 horas",
          dosagem: "2g",
        },
      ],
    },
  },
  {
    name: "Paciente teste 5",
    prontuario: "34444",
    neutropenia: true,
    neutropeniaFebril: true,
    cpf: "519.146.480-05",
    unidade: "Oncologia",
    cartaoSus: "23331/2",
    dataNascimento: "14/12/1999",
    leito: "2B",
    dataAdmissao: "14/07/2023 às 04:51",
    comorbidades: "Diabetes",
    neutrofilos: "< 500",
    prescricao: {
      data: "14/06/2023",
      medicamentos: [
        {
          medicacao: "Cefepime",
          periodo: "a cada 6 horas",
          dosagem: "2g",
        },
        {
          medicacao: "Meropenem",
          periodo: "a cada 12 horas",
          dosagem: "1g",
        },
      ],
    },
  },
];

const DadosPacientePage = () => {
  const [selectedPatient, setSelectedPatient] = useState<Paciente>({});

  return (
    <>
      <SeoConfig title="Lista de pacientes" />
      <section className="flex min-h-full flex items-center">
        <div className="basis-2/5 mr-2">
          <DynamicTabComponent
            pacientes={mockedPatients}
            setSelectedPatient={setSelectedPatient}
          />
        </div>
        <div className="basis-3/5 ml-2">
          <DetalhesPaciente paciente={selectedPatient} />
        </div>
      </section>
    </>
  );
};

export default DadosPacientePage;
