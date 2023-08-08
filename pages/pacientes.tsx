import dynamic from "next/dynamic";

import DetalhesPaciente from "../components/DetalhesPaciente";
import Header from "@/components/Header";
import PatientList from "@/components/molecules/PatientList";

import { Patient } from "@/types/patient";
import { useState } from "react";

const DynamicTabComponent = dynamic(
  () => import("../components/TabDadosPaciente"),
  {
    ssr: false,
  },
);
const patients: Patient[] = [
  { id: 1, name: "John Doe", risk: "low", pending: true, diagnosed: false },
  { id: 2, name: "Jane Smith", risk: "medium", pending: true, diagnosed: true },
  {
    id: 3,
    name: "Michael Johnson",
    risk: "high",
    pending: false,
    diagnosed: true,
  },
  { id: 4, name: "Mary Johnson", risk: "low", pending: true, diagnosed: false },
  {
    id: 5,
    name: "Robert Williams",
    risk: "medium",
    pending: true,
    diagnosed: true,
  },
  {
    id: 6,
    name: "Jennifer Jones",
    risk: "high",
    pending: false,
    diagnosed: true,
  },
  {
    id: 7,
    name: "Michael Brown",
    risk: "low",
    pending: true,
    diagnosed: false,
  },
  { id: 8, name: "Lisa Davis", risk: "medium", pending: true, diagnosed: true },
  {
    id: 9,
    name: "William Miller",
    risk: "high",
    pending: false,
    diagnosed: true,
  },
  {
    id: 10,
    name: "Karen Martinez",
    risk: "low",
    pending: true,
    diagnosed: false,
  },
  {
    id: 11,
    name: "David Garcia",
    risk: "medium",
    pending: true,
    diagnosed: true,
  },
  {
    id: 12,
    name: "Patricia Rodriguez",
    risk: "high",
    pending: false,
    diagnosed: true,
  },
  { id: 13, name: "Richard Lee", risk: "low", pending: true, diagnosed: false },
  {
    id: 14,
    name: "Linda Wilson",
    risk: "medium",
    pending: true,
    diagnosed: true,
  },
  {
    id: 15,
    name: "Thomas Martinez",
    risk: "high",
    pending: false,
    diagnosed: true,
  },
  {
    id: 16,
    name: "Susan Anderson",
    risk: "low",
    pending: true,
    diagnosed: false,
  },
  {
    id: 17,
    name: "Charles Taylor",
    risk: "medium",
    pending: true,
    diagnosed: true,
  },
  {
    id: 18,
    name: "Nancy Thomas",
    risk: "high",
    pending: false,
    diagnosed: true,
  },
  {
    id: 19,
    name: "Joseph Hernandez",
    risk: "low",
    pending: true,
    diagnosed: false,
  },
  {
    id: 20,
    name: "Margaret Moore",
    risk: "medium",
    pending: true,
    diagnosed: true,
  },
];

const DadosPacientePage = () => {
  const [selectedPatient, setSelectedPatient] = useState<Paciente>({});

  return (
    <>
      <Header />
      <section className="flex min-h-full flex items-center">
        <PatientList patients={patients} />
        <div className="flex-1 ml-2">
          <DetalhesPaciente paciente={selectedPatient} />
        </div>
      </section>
    </>
  );
};

export default DadosPacientePage;
