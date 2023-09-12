import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import fetcher from "@/api/fetcher";
import SeoConfig from "../../../components/SeoConfig/index";
import toast, { Toaster } from "react-hot-toast";
import DetalhesPaciente from "../../../components/DetalhesPaciente";
import exclamationImg from "../../../public/exclamation.svg";

const DynamicTabComponent = dynamic(
  () => import("../../../components/TabDadosPaciente"),
  {
    ssr: false,
  },
);

const DadosPacientePage = ({ pacientes }: any) => {
  const [selectedPatient, setSelectedPatient] = useState<Paciente>({});

  let router = useRouter();
  useEffect(() => {
    let pacienteAtivo =
      pacientes?.find((paciente: Paciente) => paciente.id == router.query.id) ||
      {};
    setSelectedPatient(pacienteAtivo);
  }, [router]);
  if (typeof window !== "undefined") {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      if (Notification.permission) {
        if (Notification.permission !== "granted") {
          Notification.requestPermission();
        }
        Notification.requestPermission();
        console.log(Notification.permission);
      }
    }
  }
  return (
    <>
      <SeoConfig title="Lista de pacientes" />
      <Toaster />
      <section className="flex min-h-full flex items-center">
        <div className="basis-2/5 mr-2">
          <DynamicTabComponent
            pacientes={pacientes || []}
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

export async function getStaticProps<GetStaticProps>() {
  const pacientes = await fetcher({
    metodo: "GET",
    rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatients",
  });
  return {
    props: {
      pacientes,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}
