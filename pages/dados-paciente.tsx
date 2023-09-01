import { useState } from "react";
import dynamic from "next/dynamic";
import fetcher from "@/api/fetcher";
import SeoConfig from "../components/SeoConfig/index";
import toast, { Toaster } from "react-hot-toast";
import DetalhesPaciente from "../components/DetalhesPaciente";

const DynamicTabComponent = dynamic(
  () => import("../components/TabDadosPaciente"),
  {
    ssr: false,
  },
);

const DadosPacientePage = ({ pacientes }: any) => {
  const [selectedPatient, setSelectedPatient] = useState<Paciente>({});
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
  const notify = () => toast("Here is your toast.", {});
  return (
    <>
      <SeoConfig title="Lista de pacientes" />
      <button onClick={notify}>Toggle notification</button>
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
    rota: "https://localhost:7091/Paciente/GetListPatients",
  });
  return {
    props: {
      pacientes,
    },
  };
}
